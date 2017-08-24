.. index::
   single: Motivation for aspect oriented development

Motivation for aspect oriented development
==========================================

In order to understand aspect oriented development, we will consider some usual, frequent problems that we stumble upon
on every day basis. We will try to solve them by employing standard, commonly used methods, well known to all developers.
We will emphasize issues with appliance of those methods, their flaws and drawbacks. On top of that, we will show how
aspect oriented programming can address those issues much better, removing all flows and drawbacks of other approaches
from the table.

Design patterns
---------------

According to some authors, aspect oriented programming is implementation of `Decorator`_, `Proxy`_ and `Adapter`_
`design pattern`_. While that is oversimplification of aspect oriented programming, it is a good start to show its
power and flexibility, since aspect oriented programming can be used to implement stated patterns much easier with
more elegance.

Design patterns are good starting point for demonstration of aspect oriented programing since design patterns are
familiar to vas majority of developers as well.

Decorator
~~~~~~~~~

Purpose of `Decorator`_ pattern (also known as Wrapper) is to enable to extend and/or to modify behaviour of some
class instance without actually modifying that class code. Decorator pattern enables us to adhere to the
`Single responsibility principle`_ throughout our project. Let's consider simple banking problem that we can have in
our project:

.. code-block:: php
   :caption: AccountTransferService.php
   :linenos:

   <?php

   /**
    * Service which handles account transactions
    */
   class AccountTransferService
   {
      /**
       * Transfer amount from one account to another.
       */
      public function transfer(Account $from, Account $to, float $amount)
      {
         $from->setBalance($from->getBalance() - $amount);
         $to->setBalance($to->getBalance() + $amount)
      }
   }

Class shown example is an example of appliance of single responsibility principle, it has one method and it does single,
fundamental operation. However such code is available only in examples, real life problems are much more complex.

In that matter, since this is a banking system and we are dealing with money, we need to log everything that happens with
accounts. We need to modify class to support logging as well:

.. code-block:: php
   :caption: AccountTransferService.php
   :linenos:

   <?php

   /**
   * Service which handles account transactions
   */
   class AccountTransferService
   {
      /**
       * @var Logger
       */
      private $logger;

      public function __construct(Logger $logger)
      {
         $this->logger = $logger;
      }

      /**
       * Transfer amount from one account to another.
       * Log transaction attempt and success.
       */
      public function transfer(Account $from, Account $to, float $amount)
      {
         $this->logger->log(sprintf('About to transfer amount "%s" from "%s" to "%s".', $amount, $from->getAccountNumber(), $to->getAccountNumber()));

         $from->setBalance($from->getBalance() - $amount);
         $to->setBalance($to->getBalance() + $amount)

         $this->logger->log(sprintf('Successfully transferred amount "%s" from "%s" to "%s".', $amount, $from->getAccountNumber(), $to->getAccountNumber()));
      }
   }

What happened here is that our class method got one more responsibility and in order to fulfill that task, one additional
dependency - ``Logger`` class.

Of course, all banking transactions have to satisfy `atomicity`_ of operations, so transfer of funds must be executed within
database transaction context. In that matter, we need to additionally modify our code to support such requirement:

.. code-block:: php
   :caption: AccountTransferService.php
   :linenos:

   <?php

   /**
   * Service which handles account transactions
   */
   class AccountTransferService
   {
      /**
       * @var Logger
       */
      private $logger;

      /**
       * @var Database
       */
      private $database;

      public function __construct(Logger $logger, Database $database)
      {
         $this->logger = $logger;
         $this->database = $database;
      }

      /**
       * Transfer amount from one account to another.
       * Log transaction attempt and success.
       */
      public function transfer(Account $from, Account $to, float $amount)
      {
         $this->database->beginTransaction();

         $this->logger->log(sprintf('About to transfer amount "%s" from "%s" to "%s".', $amount, $from->getAccountNumber(), $to->getAccountNumber()));

         try {
            $from->setBalance($from->getBalance() - $amount);
            $to->setBalance($to->getBalance() + $amount)
         } catch (\Exception $e) {
            $this->logger->log(sprintf('Unable to transfer amount "%s" from "%s" to "%s". Reason: "%s".', $amount, $from->getAccountNumber(), $to->getAccountNumber(), $e->getMessage()));
            throw $e;
         }

         $this->logger->log(sprintf('Successfully transferred amount "%s" from "%s" to "%s".', $amount, $from->getAccountNumber(), $to->getAccountNumber()));
      }
   }


.. _Decorator: https://en.wikipedia.org/wiki/Decorator_pattern
.. _Proxy: https://en.wikipedia.org/wiki/Proxy_pattern
.. _Adapter: https://en.wikipedia.org/wiki/Adapter_pattern
.. _design pattern: https://en.wikipedia.org/wiki/Design_Patterns
.. _Single responsibility principle: https://en.wikipedia.org/wiki/Single_responsibility_principle
.. _atomicity: https://en.wikipedia.org/wiki/Atomicity_(database_systems)
