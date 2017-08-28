Install Go! AOP on Symfony framework
====================================

Installation and configuration of Go! AOP on Symfony project is done trough Symfony bundle ``goaop/goaop-symfony-bundle``,
which you can install with composer:

 .. code-block:: console

    composer require goaop/goaop-symfony-bundle

You do not have to worry about framework installation, bundle will pull down all required dependencies.

Next, you have to load bundle into your Symfony application kernel:

 .. code-block:: php
    :caption: app/ApplicationAspectKernel.php
    :linenos:


    <?php

    use Symfony\Component\HttpKernel\Kernel;
    use Symfony\Component\Config\Loader\LoaderInterface;

    class AppKernel extends Kernel
    {
        public function registerBundles()
        {
            $bundles = [
                // Go! AOP bundle as first loaded bundle
                new Go\Symfony\GoAopBundle\GoAopBundle(),


                // ... any other bundle that is being used by project
            ];

            return $bundles;
        }
    }

**IMPORTANT NOTE**: Go! AOP bundle must be first item in bundle list. Failing to do so will cause an exception, since Go!
AOP framework requires it to be loaded first in order for engine to work correctly.

Configuring framework
~~~~~~~~~~~~~~~~~~~~~

Configuring Go! AOP framework uses Symfony configuration system, so you can configure it as any other Symfony bundle. In
code below is default bundle configuration with initial values sufficient enough to accommodate majority of Symfony projects.

 .. code-block:: yaml
    :caption: app/config/config.yml
    :linenos:


    go_aop:
        cache_warmer: true
        doctrine_support: false
        options:
            debug: '%kernel.debug%'
            app_dir: '%kernel.root_dir%/../src'
            cache_dir: '%kernel.cache_dir%/aspect'
            include_paths: []
            exclude_paths: []
            exclude_paths: []
            features: []


Note that in this example configuration parameters under ``options`` key are options related to Go! AOP framework, for
details see: :doc:`configuration-references`. While Go AOP! framework uses camel case (``camelCase``) notation for
configuration parameters, Symfony bundle uses Symfony's configuration notation, underscore, for same configuration keys.

However, ``cache_warmer`` and ``doctrine_support`` are configuration options available only for Symfony bundle, and therefore,
their details are provided bellow:

- ``cache_warmer``, boolean, default ``true``. Enables or disables an automatic AOP cache warming within the application.
  By default, cache warming is enabled (recommended). You may disable it only if you have serious issues with cache warming
  process.

- ``doctrine_support``, boolean, default ``false``. Experimental, alpha. Due to mapping issues caused by weaving of
  entities (as explained here: :ref:`limitations-and-known-issues-weaving-of-doctrine-entities`) it is not possible to
  weave Doctrine entities. This option will turn on basic support for weaving Doctrine entities, however, support is experimental,
  incomplete, and not ready for production.

XML configuration support
-------------------------

XML format is supported for configuration of this bundle as well. In order to validate your XML configuration, you may
use XML Schema file available on following url:
`https://github.com/goaop/goaop-symfony-bundle/blob/master/Resources/config/schema/configuration-1.0.0.xsd`_. This is more
convenient configuration method since it is possible, trough configuration of IDE, to get intelli sense and autocomplete
support.

Example of XML configuration is given bellow:

 .. code-block:: xml
    :caption: app/config/go-aop.xml
    :linenos:

    <?xml version="1.0" ?>
    <container
            xmlns="http://symfony.com/schema/dic/services"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:go-aop="http://go.aopphp.com/xsd-schema/go-aop-bundle"
            xsi:schemaLocation="http://symfony.com/schema/dic/services
                                http://symfony.com/schema/dic/services/services-1.0.xsd
                                http://go.aopphp.com/xsd-schema/go-aop-bundle
                                http://go.aopphp.com/xsd-schema/go-aop-bundle/configuration-1.0.0.xsd">
        <go-aop:config>

            <go-aop:cache-warmer>true</go-aop:cache-warmer>

            <go-aop:doctrine-support>false</go-aop:doctrine-support>

            <go-aop:options>

                <go-aop:debug>true</go-aop:debug>
                <go-aop:app-dir>%kernel.root_dir%/../src</go-aop:app-dir>
                <go-aop:cache-dir>%kernel.cache_dir%/aspect</go-aop:cache-dir>

                <go-aop:include-path>/path/to/include/directory</go-aop:include-path>
                <go-aop:include-path>/other/path/to/include/directory</go-aop:include-path>

                <go-aop:exclude-path>/path/to/directory/to/exclude</go-aop:exclude-path>
                <go-aop:exclude-path>/other/directory/path/to/exclude</go-aop:exclude-path>

                <go-aop:container-class>Container\Class</go-aop:container-class>

                <go-aop:feature>INTERCEPT_FUNCTIONS</go-aop:feature>
                <go-aop:feature>INTERCEPT_INCLUDES</go-aop:feature>
                <go-aop:feature>INTERCEPT_INITIALIZATIONS</go-aop:feature>

            </go-aop:options>

        </go-aop:config>

    </container>


Create and register aspect
~~~~~~~~~~~~~~~~~~~~~~~~~~

Aspects are services in the Symfony application and loaded into the aspect container with the help of compiler pass
that collects all services tagged with ``goaop.aspect`` tag.

Considering that you have, per example, following aspect:

 .. code-block:: php
    :caption: app/ApplicationAspectKernel.php
    :linenos:

    <?php

    namespace App\Aspect;

    use Go\Aop\Aspect;
    use Go\Aop\Intercept\MethodInvocation;
    use Go\Lang\Annotation as Pointcut;
    use Psr\Log\LoggerInterface;

    /**
     * Logs every successful method execution
     */
    class LoggingAspect extends AspectKernel
    {
        public function __construct(LoggerInterface $logger)
        {
            $this->logger = $logger;
        }

        /**
         * Method that will be invoked after targeted method is invoked.
         *
         * @param MethodInvocation $invocation Invocation
         * @Pointcut\After("execution(public **->*(*))")
         */
        protected function afterMethodExecution(MethodInvocation $invocation)
        {
            $object    = $invocation->getThis();      // You can access object on which method is invoked
            $arguments = $invocation->getArguments(); // You can access method invocation arguments
            $method    = $invocation->getMethod();    // Even method metadata, and much more...

            $this->logger->info('Successfully executed method {name} of class {class} with {count} arguments.', [
                '{name}'    => $method->getName(),
                '{class}'   => get_class($object),
                '{count}'   => count($arguments),
                'arguments' => $arguments,
            ]);
        }
    }

only thing required for aspect to be registered is to be registered as service in Symfony framework and tagged with
``goaop.aspect`` tag:

 .. code-block:: yaml
    :caption: app/config/config.yml
    :linenos:

    services:
        logging.aspect:
            class: App\Aspect\LoggingAspect
            arguments: ['@logger']
            public: false
            tags:
                - { name: goaop.aspect }

Note that aspects may be registered as ``private`` services, which can contribute to optimization of your service
container.


.. _`https://github.com/goaop/goaop-symfony-bundle/blob/master/Resources/config/schema/configuration-1.0.0.xsd`: https://github.com/goaop/goaop-symfony-bundle/blob/master/Resources/config/schema/configuration-1.0.0.xsd
