Pointcut syntax
===============

In aspect oriented programming, a pointcut is a regular expression that matches join points. Advice is associated with
a pointcut expression and runs at any join point matched by the pointcut (for example, the execution of a method with
a certain name).

In simpler terms, pointcut answers on question **"what do you want to intercept?"**

Different frameworks support different pointcut expressions, while Java's AspectJ is considered as industry standard. Go!
AOP does not diverts from standards established by AspectJ, so any developer familiar with Java and AspectJ will find
itself within familiar grounds when working with Go! AOP.

However, there are certain differences, possibilities as well as limitations within PHP language itself. Go! AOP had to
take into consideration those differences when adopting AspectJ standard.


.. toctree::
   :maxdepth: 1

   pointcut_syntax/methods_and_constructors
   pointcut_syntax/property_access
   pointcut_syntax/initialization
   pointcut_syntax/function_execution
   pointcut_syntax/complex_expressions