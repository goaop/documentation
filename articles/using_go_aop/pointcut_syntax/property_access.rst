Property access
===============

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

Property access via annotations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Annotation matching is supported for class properties as well. Pointcut expression pattern is:
``@access([ANNOTATION_FULL_QUALIFIED_CLASS_NAME])``. Wildcards are not supported. Only annotated public and protected
properties can be matched.

- ``@access`` keyword denotes that annotated class property is subject of interception.
- ``[ANNOTATION_FULL_QUALIFIED_CLASS_NAME]`` allows you to specify full qualified class name of your annotation which
  annotates property that ought to be intercepted


Examples
--------

- ``access(public Example\Demo->test)`` - Every access (read and write) to the public property ``test`` in the class
  ``Example\Demo``.
- ``access(public|protected Example\Aspect\*->fieldName)`` - Every access (read and write) to a public or protected
  property ``fieldName`` which belongs to a classes inside ``Example\Aspect`` sub-namespace.
- ``access(protected **->someProtected*Property)`` - Every access to the protected properties with names that match
  ``someProtected*Property`` pattern in every class.
- ``@access(Demo\Annotation\Cacheable)`` - Every access to the property (read and write) that has
  ``Demo\Annotation\Cacheable`` annotation in the docBlock.
