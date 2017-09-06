Serialization/deserialization and reflections are sensitive to weaving
======================================================================

In order to explain issues in regards to serialization/deserialization and reflections that can be caused by weaving with
Go! AOP framework, we will consider a simple example where we have a `Person` class:

.. code-block:: php
   :caption: src/Application/Model/Person.php
   :linenos:

    <?php

    namespace Application\Model;

    class Person
    {
        const MALE = 'male';
        const FEMALE = 'female';
        const UNDEFINED = 'undefined';

        private $id;

        private $gender;

        private $firstName;

        private $lastName;

        public function __construct($id, $gender, $firstName, $lastName)
        {
            $this->id        = $id;
            $this->gender    = $gender;
            $this->firstName = $firstName;
            $this->lastName  = $lastName;
        }

        public function getFullName()
        {
            return $this->firstName.' '.$this->lastName;
        }
    }

Now, let's say that we have in our code introspection of class above with reflections, as well as we are serializing and
deserializing instances of it:

.. code-block:: php
   :caption: src/application.php
   :linenos:

    <?php

    use \Application\Model\Person;

    $person             = new Person(1, Person::UNDEFINED, 'John', 'Doe');
    $reflectionProperty = new \ReflectionProperty(Person::class, 'firstName');

    $reflectionProperty->setAccessible(true);
    $reflectionProperty->setValue($person, 'Bob');

    file_put_contents(__DIR__.'/../var/data/person.dat', serialize($person));

    // ... more code here....

    $person = deserialize(file_get_contents(__DIR__.'/../var/data/person.dat'));

If we introduce new aspect that will intercept execution of, per example, `Person::getFullName()` method:

.. code-block:: php
   :caption: src/Aspect/PersonAspect.php
   :linenos:

    <?php

    namespace Aspect;

    use Go\Aop\Aspect;
    use Go\Aop\Intercept\MethodInvocation;
    use Go\Lang\Annotation as Pointcut;

    /**
     * Person aspect
     */
    class PersonAspect implements Aspect
    {

        /**
         * Add title to full name.
         *
         * @param MethodInvocation $invocation Invocation
         * @Pointcut\After("execution(public Application\Model\Person->getFullName(*))")
         */
        protected function afterGetFullName(MethodInvocation $invocation)
        {
            $object    = $invocation->getThis();
            $method    = $invocation->getMethod();
            $arguments = $invocation->getArguments();

            // And, of course, you can execute your application logic
            echo sprintf('Class "%s" method "%s" has just been invoked with %s arguments', get_class($object), $method->getName(), count($arguments));
        }
    }

instead of original class, after weaving process, we will get two classes instead that will be loaded and used in our
application, a proxied class:

.. code-block:: php
   :caption: var/cache/aop/Application/Model/Person.php
   :linenos:

    <?php

    namespace Application\Model;

    class Person__AopProxied
    {
        const MALE = 'male';
        const FEMALE = 'female';
        const UNDEFINED = 'undefined';

        private $id;

        private $gender;

        private $firstName;

        private $lastName;

        public function __construct($id, $gender, $firstName, $lastName)
        {
            $this->id        = $id;
            $this->gender    = $gender;
            $this->firstName = $firstName;
            $this->lastName  = $lastName;
        }

        public function getFullName()
        {
            return $this->firstName.' '.$this->lastName;
        }
    }

    include_once AOP_CACHE_DIR . '/_proxies/Application/Model/Person.php';

and, of course, a proxy class:

.. code-block:: php
   :caption: var/cache/aop/_proxies/Application/Model/Person.php
   :linenos:

    <?php

    namespace Application\Model;

    class Person extends Person__AopProxied implements \Go\Aop\Proxy
    {

        /**
         * Property was created automatically, do not change it manually
         */
        private static $__joinPoints = [
            'method' => [
                'getFullName' => [
                    'advisor.Aspect\\PersonAspect->afterGetFullName'
                ]
            ]
        ];


        public function getFullName()
        {
            return self::$__joinPoints['method:getFullName']->__invoke($this);
        }

    }
    \Go\Proxy\ClassProxy::injectJoinPoints(Person::class);

When we go to our previous code that uses reflections to introspect ``Person`` class, knowing what is the end result
of weaving, it is quite understandable why it does not work as it used to do:

.. code-block:: php
   :linenos:

    <?php

    $reflectionProperty = new \ReflectionProperty(Person::class, 'firstName');

    $reflectionProperty->setAccessible(true);
    $reflectionProperty->setValue($person, 'Bob');

Class ``Person`` **does not define** ``firstName`` property anymore, that is defined in ``Person__AopProxied`` class. Same
goes to serialization/deserialization, every instance serialized *before* weaving can not be deserialized *after* waeving
anymore because ``Person`` class before weaving is not the same class after weaving.

How to handle serialization/deserialization of weaved classes?
--------------------------------------------------------------

First of all, it is not recommended to use default PHP serialization/deserialization for durable persistence of
objects/entities in your application. Developers tend to use it, per example, when they need some schema-less
persistence of object but they use relational database as storage, so they serialize object and store it in one
table field.

Much better solution, if such serialization is required, is to take over control from default
PHP serialization/deserialization and provide your own implementation, per example:

.. code-block:: php
   :caption: src/Application/Model/Person.php
   :linenos:

    <?php

    namespace Application\Model;

    class Person
    {
        const MALE = 'male';
        const FEMALE = 'female';
        const UNDEFINED = 'undefined';

        private $id;

        private $gender;

        private $firstName;

        private $lastName;

        public function __construct($id, $gender, $firstName, $lastName)
        {
            $this->id        = $id;
            $this->gender    = $gender;
            $this->firstName = $firstName;
            $this->lastName  = $lastName;
        }

        public function getFullName()
        {
            return $this->firstName.' '.$this->lastName;
        }

        /**
         * Serializes object values to JSON
         */
        public function toJson()
        {
            $data = [
                'id'        => $this->id,
                'gender'    => $this->gender,
                'firstName' => $this->firstName,
                'lastName'  => $this->lastName,
            ];

            return json_encode($data);
        }

        /**
         * Restore object values from JSON
         */
        public function fromJson($json)
        {
            $data = json_decode($json);

            $this->id        = $data['id'];
            $this->gender    = $data['gender'];
            $this->firstName = $data['firstName'];
            $this->lastName  = $data['lastName'];
        }
    }

Of course, there are much better ways and libraries which can help you to provide custom serialization/deserialization
of objects. However, the general idea is that you have full control over that process. That control is required
in order to have possibility to adapt/modify code to support deserialization of previously serialized object - even
after weaving.


How to handle reflections of weaved classes?
--------------------------------------------

As shown in previous section, general idea is in taking control in your hands, so when the weaving kicks in, you can
easily modify code to support new class hierarchy.

Same goes to reflections, instead of using PHP system classes, use your own implementation as proxy to default one:

.. code-block:: php
   :caption: src/Application/System/ReflectionClass.php
   :linenos:

   <?php

   namespace Application\System;

   class ReflectionClass extends \ReflectionClass
   {
   }

By using your own modified classes for reflections, you are able to modify its code and move the introspection one level
up to proxied classes when introspecting weaved classes.
