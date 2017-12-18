Complex expressions
===================

With pointcut expressions you can specify which methods, properties, functions you would like to intercept.
Beside wildcards within pointcut expressions that are already mentioned, Go! AOP supports some basic lexical expressions,
as well as portion of Boolean algebra. That allows you to build quite complex and powerful expressions to mach desired
subjects of intercepting.

Supported wildcards
~~~~~~~~~~~~~~~~~~~

For sake of completeness, we are going to state all supported wildcards here which can be used (where applicable) to match
part of the name within pointcut expressions

- ``*`` (astrix, star) matches any character and digit in name part. Its regular expression equivalent is ``[^\\\\]+``
  which matches any character as many time as possible between namespace separators (``\`` - backslash).
- ``**`` (double astrix) matches any namespace. Its regular expression equivalent is ``.+`` which matches any character
  as many times as possible.
- ``?`` (question mark) matches any single character. Its regular expression equivalent is ``.`` (dot) sign.
- ``|`` (pipe), which is logical ``or`` operator in this context. Its regular expression equivalent is pipe as well.

Supported operators
~~~~~~~~~~~~~~~~~~~

Basic boolean operators are supported as well:

- ``!`` (exclamation mark) logical negation
- ``&&`` (double ampersand) logical conjunction
- ``||`` (double pipe) logical disjunction


Lexical pointcuts
~~~~~~~~~~~~~~~~~

Go! AOP supports only two lexical statements, ``within`` and ``@within``.

- ``within([CLASS_NAME_FILTER])`` - every property access, method execution, initialization within ``[CLASS_NAME_FILTER]`` class.
- ``@within([ANNOTATION_CLASS_NAME_FILTER])`` - every property access, method execution, initialization within class that
  has ``[ANNOTATION_CLASS_NAME_FILTER]`` annotation in the docBlock.

With ``within`` and/or ``@within`` statements, you may narrow down set of matching subjects to certain classes and/or
classes with stated annotation.

Examples
--------

- ``!execution(public **->*(*))`` - every execution of any method that is not public.
- ``execution(* Demo->*(*)) && execution(public **->*(*))`` - every execution of public method in the class ``Demo``.
- ``access(public Demo->foo) || access(public Another->bar)`` - every access to the properties ``foo`` of class ``Demo`` or
  property ``bar`` of class ``Another``.
- ``(access(* Demo->*) || access(* Another->*)) && access(public **->*)`` - every access to public property of class ``Demo``
  or class ``Another``. Note parentheses which can be used to establish order of operator precedence.
- ``execution(public **->*(*)) && @within(Demo\Cacheable)`` - every public method of class annotated with ``Demo\Cacheable``
  annotation.
