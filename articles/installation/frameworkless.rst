Install Go! AOP framework on any PHP project
============================================

Considering that you have already installed ``goaop/framework`` by executing console command:

.. code-block:: console

   composer require goaop/framework

next thing required from you is to create application aspect kernel. That means that you have to create your own aspect
kernel class, per example ``ApplicationAspectKernel``, which must extends ``Go\Core\AspectKernel``. This class will
manage all aspects of your application in one place.


.. code-block:: php
   :caption: app/ApplicationAspectKernel.php
   :linenos:


    <?php

    use Go\Core\AspectKernel;
    use Go\Core\AspectContainer;

    /**
     * Application Aspect Kernel
     */
    class ApplicationAspectKernel extends AspectKernel
    {

        /**
         * Configure an AspectContainer with advisors, aspects and pointcuts
         *
         * @param AspectContainer $container
         *
         * @return void
         */
        protected function configureAop(AspectContainer $container)
        {
        }
    }

Configuring framework
~~~~~~~~~~~~~~~~~~~~~

When you created your aspect kernel, you have to configure it and initialize it into your front controller.

.. code-block:: php
   :caption: web/index.php
   :linenos:

    <?php

    // First, include Composer's autoload script from your vendor directory
    include __DIR__ . '/../vendor/autoload.php';

    // Configure Go! AOP - see configuration references for more details and options
    $aopConfig = [
        'debug'     => true,
        'cacheDir'  => __DIR__ . '/../var/cache/aop',
        'appDir' => __DIR__ . '/../src/'
    ];

    // Create application aspect kernel
    $applicationAspectKernel = ApplicationAspectKernel::getInstance();

    // Initialize it with your configuration
    $applicationAspectKernel->init($aopConfig);

    // Rest of your front controller code goes here...

You will notice that it is required to load Composer first, then Go! AOP aspect kernel and then you can load your code.
This is requirement of the Go! AOP framework since weaving is executed in runtime (read more about interception and weaving
process here: TODO). You probably noticed that Go! AOP implements ``AspectKernel`` as singleton_ as well, which is done by design
(see: :ref:`limitations-and-known-issues-aspect-kernel-is-singleton-implementation` for more details).

Note that not this example contains only minimum required configuration for Go! AOP to work, for all other options and
details see: :doc:`configuration-references`.

Create and register aspect
~~~~~~~~~~~~~~~~~~~~~~~~~~

Aspect oriented development is based on aspects and pointcuts, so in code bellow is given an example of simple aspect:


.. code-block:: php
   :caption: src/Aspect/MyFirstAspect.php
   :linenos:

    <?php

    namespace Aspect;

    use Go\Aop\Aspect;
    use Go\Aop\Intercept\MethodInvocation;
    use Go\Lang\Annotation as Pointcut;

    /**
     * My first aspect
     */
    class MyFirstAspect implements Aspect
    {

        /**
         * Method that will be invoked before targeted method is invoked.
         *
         * @param MethodInvocation $invocation Invocation
         * @Pointcut\Before("execution(public Example->*(*))")
         */
        protected function beforeMethodExecution(MethodInvocation $invocation)
        {
            $object    = $invocation->getThis();      // You can access object on which method is invoked
            $arguments = $invocation->getArguments(); // You can access method invocation arguments
            $method    = $invocation->getMethod();    // Even method metadata, and much more...

            // And, of course, you can execute your application logic
            echo sprintf('Class "%s" method "%s" has just been invoked with %s arguments', get_class($object), $method->getName(), count($arguments));
        }
    }

In order for weaving and interception to occur and method ``beforeMethodExecution()`` of your aspect ``Aspect\MyFirstAspect``
to be executed, you have to register it in your previously created aspect kernel:

.. code-block:: php
   :caption: app/ApplicationAspectKernel.php
   :linenos:


    <?php

    use Go\Core\AspectKernel;
    use Go\Core\AspectContainer;
    use Aspect\MyFirstAspect;

    /**
     * Application Aspect Kernel
     */
    class ApplicationAspectKernel extends AspectKernel
    {

        /**
         * Configure an AspectContainer with advisors, aspects and pointcuts
         *
         * @param AspectContainer $container
         *
         * @return void
         */
        protected function configureAop(AspectContainer $container)
        {
            $container->registerAspect(new MyFirstAspect());
        }
    }


.. _singleton: https://en.wikipedia.org/wiki/Singleton_pattern