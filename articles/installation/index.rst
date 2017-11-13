.. index::
   single: Installation

Installation
============

In next chapter, you will find all necessary information in regards to successful installation and configuration
of Go! AOP framework into your project. Note that Go! AOP does not require any framework to be installed as well, it
can be used in any PHP project, however, class autoloading and package management must be done via Composer_.

Presuming that you are familiar with Composer, that Composer is globally available on your machine, first step to to
start with installation of Go! AOP is to execute following console command:

.. code-block:: console

   composer require goaop/framework

Of course, you can require ``goaop/framework`` directly in your ``composer.json``:

.. code-block:: javascript

   {
      "require": {
         "goaop/framework": "^2.1"
      }
   }

and then, update your dependencies:

.. code-block:: console

   composer update

Depending on your project, read about further steps in order to configure Go! AOP to suits your needs.

.. _Composer: https://getcomposer.org

.. toctree::
   :maxdepth: 1

   Setup Go! AOP on frameworkless PHP project <frameworkless>
   Configuring Symfony <symfony>
   Configuring Laravel <laravel>
   Configuring Zend <zend>
   Configuring Yii <yii>
   configuration-references
