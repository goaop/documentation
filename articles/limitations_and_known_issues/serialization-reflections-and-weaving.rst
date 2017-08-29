Serialization/deserialization and reflections are sensitive to weaving
======================================================================

In order to explain issues in regards to serialization/deserialization and reflections that can be caused by weaving with
Go! AOP framework, we will consider a simple example which we are serializing/deserializing and introspecting with
reflections:

 .. code-block:: php
    :caption: Person.php
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

