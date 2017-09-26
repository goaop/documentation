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


Methods and Constructors
~~~~~~~~~~~~~~~~~~~~~~~~

You may intercept every ``public`` and/or ``protected`` method of class, as well as constructor (which is also a class
method with specific properties - it is invoked at class initialization and it does not returns value). Subject
of interception can be static class method as well.

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


Methods via annotations
~~~~~~~~~~~~~~~~~~~~~~~

Annotation matching are another way to intercept any protected and/or public class method, as well as static class method.
Pointcut expression pattern is: ``@execution([ANNOTATION_FULL_QUALIFIED_CLASS_NAME])``. Note that wildcards are not
supported. Only annotated public and protected methods can be matched.

Examples
--------

- ``@execution(Demo\Annotation\Cacheable)`` - Every execution of any method that has ``Demo\Annotation\Cacheable``
  annotation in its docBlock.


Property access
~~~~~~~~~~~~~~~

Access to public and protected class properties may be intercepted as well. Note that interception of static class
properties is not supported.

Pointcut expression pattern is: ``access([VISIBILITY_MODIFIER] [CLASS_NAME_FILTER]->[PROPERTY_NAME_FILTER])``

- ``access`` keyword denotes that class property is subject of interception.
- ``[VISIBILITY_MODIFIER]`` denotes property visibility modifier. Go! AOP supports interceptions of ``public``
  and ``protected`` properties. Interception of both ``public`` and ``protected`` properties is possible with "pipe"
  (``|``) operator.
- ``[CLASS_NAME_FILTER]`` allows you to specify expression that will be used to match full qualified class name which
  ought to be intercepted. It has same syntax as method interception, which means that you can use same wildcards
  (``*``, ``**``, ``?``, ``|``) in your expressions.
- ``[PROPERTY_NAME_FILTER]`` allows you to specify property name. You may use ``*``, ``?`` and ``|`` wildcards for
  property matching.


Examples
--------

- ``access(public Example\Demo->test)`` - Every access (read and write) to the public property ``test`` in the class
  ``Example\Demo``.
- ``access(public|protected Example\Aspect\*->fieldName)`` - Every access (read and write) to a public or protected
  property ``fieldName`` which belongs to a classes inside ``Example\Aspect`` sub-namespace.
- ``access(protected **->someProtected*Property)`` - Every access to the protected properties with names that match
  ``someProtected*Property`` pattern in every class.


Property access via annotations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Annotation matching is supported for class properties as well. Pointcut expression pattern is:
``@access([ANNOTATION_FULL_QUALIFIED_CLASS_NAME])``. Wildcards are not supported. Only annotated public and protected
properties can be matched.

Examples
--------

- ``@access(Demo\Annotation\Cacheable)`` - Every access to the property (read and write) that has
  ``Demo\Annotation\Cacheable`` annotation in the docBlock.

Function execution
~~~~~~~~~~~~~~~~~~

Go! AOP supports interception of system functions. Syntax is similar to class method interception, which means that you
can use same wildcards (``*``, ``**``, ``?``, ``|``) for matching as well. Note that this feature is not common among
other programming languages with support for aspect oriented programming.

Pointcut expression pattern is ``execution([NAMESPACE_FILTER]\[FUNCTION_NAME_FILTER](*))``

- ``execution`` keyword denotes that function execution will be intercepted.
- ``[NAMESPACE_FILTER]`` allows you to specify expression that will be used to match namespace in which system function
  will be intercepted.
- ``[FUNCTION_NAME_FILTER]`` allows you to specify expression that will be used to match system function name which
will be intercepted.
- ``(*)`` is constant, static part of the expression, which matches any number, name and type of method arguments.

Examples
--------

- ``execution(**\file_get_contents(*))`` - Every execution of system function ``file_get_contents`` within all namespaces.
- ``execution(Example\Aspect\array_*(*))`` - Every execution of any system function “array_*” within ``Example\Aspect``
  namespace

Initialization
~~~~~~~~~~~~~~

With Go! AOP, you may intercept object initialization. Pointcut expression pattern is
``initialization([FULL_QUALIFIED_CLASS_NAME_FILTER])``. All before mentioned wildcards are supported.

- ``initialization`` keyword denotes that object initialization will be intercepted.
- ``[FULL_QUALIFIED_CLASS_NAME_FILTER]`` allows you to specify expression that will be used to match name of class which
  initialization ought to be intercepted.

Examples
--------

- ``initialization(Demo\Example)`` - Every initialization of class instance of ``Demo\Example``, that is, when
  ``new Demo\Example()`` is invoked.
- ``initialization(Demo\**)`` - Every initialization of any class instance within ``Demo`` sub-namespaces.


Static initialization
~~~~~~~~~~~~~~~~~~~~~

Static initialization allows you to execute arbitrary code when some class or classes are about to be initialized for
the first time in application execution life cycle, that is, when autoloader loaded those classes into memory.
Pointcut expression pattern is ``staticinitialization([FULL_QUALIFIED_CLASS_NAME_FILTER])``. All before mentioned wildcards
are supported.

Examples
--------

- ``staticinitialization(Demo\Example)`` - First time when the class ``Demo\Example`` is loaded into the memory of
  application execution context.
- ``staticinitialization(Demo\**)`` - First time of loading of any class within ``Demo`` sub-namespace into the memory
  application execution context.



Expressions and their logical combination
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

