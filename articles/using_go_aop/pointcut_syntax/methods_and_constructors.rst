Methods and Constructors
========================

You may intercept every ``public`` and/or ``protected`` method of class, as well as constructor (which is also a class
method with specific properties - it is invoked at class initialization and it does not returns value). Subject
of interception can be final and/or static class method as well.

Pointcut expression pattern is: ``execution([VISIBILITY_MODIFIER] [CLASS_NAME_FILTER][TYPE_OF_INVOCATION][METHOD_NAME_FILTER](*))``

- ``execution`` keyword denotes that class method (class method or static class method) is subject of interception.
- With ``[VISIBILITY_MODIFIER]`` you may denote method visibility modifier. Go! AOP supports interceptions of ``public``
  and ``protected`` methods. If you want to intercept both ``public`` as well as ``protected`` methods, you may
  use "pipe" (``|``) operator to denote both, in example: ``public|protected``.
- ``[CLASS_NAME_FILTER]`` allows you to specify expression that will be used to match full qualified class name
  which ought to be intercepted. Expression wildcards which can be used for namespace matching are simplified and limited,
  however, sufficient enough for everyday usage:

     - ``*`` (astrix, star) matches any character and digit in namespace part. Its regular expression equivalent is ``[^\\\\]+``
       which matches any character as many time as possible between namespace separators (``\`` - backslash).
     - ``**`` (double astrix) matches any namespace. Its regular expression equivalent is ``.+`` which matches any character
       as many times as possible.
     - ``?`` (question mark) matches any single character. Its regular expression equivalent is ``.`` (dot) sign.
     - ``|`` (pipe), which is logical ``or`` operator in this context. Its regular expression equivalent is pipe as well.

- ``[TYPE_OF_INVOCATION]`` allows you to specify whether you are matching class method or static class method. It may
  be ``::`` (*Paamayim Nekudotayim*) or ``->`` (method invocation). It is not possible to match booth class method and
  static class method within the same expression.
- ``[METHOD_NAME_FILTER]`` allows you to specify method name. Wildcards that can be used in method name matching are
  ``*`` (astrix, star), ``?`` (question mark) and ``|`` (pipe) operator. They share same semantics with class name filter.
- ``(*)`` is constant, static part of the expression, which matches any number, name and type of method arguments. AspectJ,
  per example, supports matching based on method arguments as well. In Go! AOP, that is not possible.


Methods via annotations
~~~~~~~~~~~~~~~~~~~~~~~

Annotation matching are another way to intercept any protected and/or public class method, as well as static class method.
Pointcut expression pattern is: ``@execution([ANNOTATION_FULL_QUALIFIED_CLASS_NAME])``. Note that wildcards are not
supported. Only annotated public and protected methods can be matched.

- ``@execution`` keyword denotes that annotated class method (class method or static class method) is subject of interception.
- ``[ANNOTATION_FULL_QUALIFIED_CLASS_NAME]`` allows you to specify full qualified class name of your annotation which
  annotates method that ought to be intercepted

Examples
--------

- ``execution(public Example->method(*))`` - Every execution of public method with the name ``method`` in the class
  ``Example``
- ``execution(public Example->method1|method2(*))`` - Every execution of one of the public methods: ``method1`` or
  ``method2`` in the class ``Example``
- ``execution(public|protected Example\Aspect\*->method*(*))`` - Execution of public or protected methods that have
  ``method`` prefix in their names and that methods are also within ``Example\Aspect`` sub-namespace. Note that only one,
  single namespace part will be matched.
- ``execution(public **::staticMethod(*))`` - Every execution of any public static method ``staticMethod`` in every
  namespace (except global one).
- ``@execution(Demo\Annotation\Cacheable)`` - Every execution of any method that has ``Demo\Annotation\Cacheable``
  annotation in its docBlock.