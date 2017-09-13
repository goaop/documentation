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
take into consideration those differences when adopting AspectJ standard. Differences in implementation are noted in
pointcut syntax overview.

Methods and Constructors
~~~~~~~~~~~~~~~~~~~~~~~~

You may intercept every ``public`` and/or ``protected`` method of class, as well as constructor, which is also a class
method with specific properties, of course (it is invoked at class initialization and it does not returns value). Subject
of interception can be static class method as well.

Pointcut expression pattern is: ``execution([public|private] [CLASS_NAME_FILTER][::|->][METHOD_NAME_FILTER](*))``

- ``execution`` keyword denotes that class method is subject of interception.
- ``[public|private]`` denotes method visibility modifier. You may use any of those modifiers, or you may use
  logical "or" (``|``) operator to denote both.
- ``[CLASS_NAME_FILTER]`` allows you to specify regular expression which will be used to match full qualified class name
  which ought to be intercepted.





