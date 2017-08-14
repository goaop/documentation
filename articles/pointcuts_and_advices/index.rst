Pointcuts and advices
=====================

.. code-block:: php
   :caption: somecode.php
   :name: some-code
   :linenos:


    <?php

    /**
     * Method that should be called before real method
     *
     * @param MethodInvocation $invocation Invocation
     * @Before(pointcut="examplePublicMethods()")
     */
     public function beforeMethodExecution(MethodInvocation $invocation)
     {
         $obj = $invocation->getThis();
         echo 'Calling Before Interceptor for method: ',
         is_object($obj) ? get_class($obj) : $obj,
         $invocation->getMethod()->isStatic() ? '::' : '->',
         $invocation->getMethod()->getName(),
         '()',
         ' with arguments: ',
         json_encode($invocation->getArguments()),
         "<br>\n";
     }
