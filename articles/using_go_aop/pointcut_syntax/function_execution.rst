Function execution
==================

Go! AOP supports interception of system functions. Syntax is similar to class method interception, which means that you
can use same wildcards (``*``, ``**``, ``?``, ``|``) for matching as well. Note that this feature is not common among
other programming languages with support for aspect oriented programming.

Pointcut expression pattern is ``execution([NAMESPACE_FILTER]\[FUNCTION_NAME_FILTER](*))``

- ``execution`` keyword denotes that function execution will be intercepted.
- ``[NAMESPACE_FILTER]`` allows you to specify expression that will be used to match namespace in which system function will be intercepted.
- ``[FUNCTION_NAME_FILTER]`` allows you to specify expression that will be used to match system function name which will be intercepted.
- ``(*)`` is constant, static part of the expression, which matches any number, name and type of method arguments.

Examples
--------

- ``execution(**\file_get_contents())`` - Every execution of system function “file_get_contents” within all namespaces
- ``execution(Example\Aspect\array_*(*))`` - Every execution of any system function “array_*” within “Example\Aspect” namespace