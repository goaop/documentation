Welcome to Go! AOP documentation
================================

Go! AOP is framework written in PHP which enables support for aspect oriented programming (AOP) in your PHP project. As you
may already know, PHP does not supports AOP natively, and starting from PHP 5.5, AOP is not even available trough
PHP extension.

In that matter, purpose of this library is to provide PHP developers with powerful development tool in form of aspect
oriented programing trough userland library that can be used in almost every environment, regardless of the fact whether
some framework is used in project or not.

Go! AOP is tightly coupled with Composer_, so that is important library requirement: autoloading of PHP classes must be
done trough Composer.

.. _Composer: https://getcomposer.org

.. toctree::
   :caption: Table of Contents
   :name: mastertoc
   :maxdepth: 1

   articles/about_aop/introduction_to_aop
   articles/installation/index
   articles/pointcuts_and_advices/index
   articles/internals/index
   articles/limitations_and_known_issues/index
   articles/references_and_resources/index

:ref:`genindex`
