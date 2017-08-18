.. index::
   single: Glossary

Glossary
========

Aspect
------

A modularization of a concern that cuts across multiple objects. Logging, caching, transaction management are
good examples of a crosscutting concern in PHP applications. Go! defines aspects as regular classes implemented empty
Aspect interface and annotated with the @Aspect annotation.

Join point
----------

A point during the execution of a script, such as the execution of a method or property access.

Advice
------

Action taken by an aspect at a particular join point. There are different types of advice:
@Around, @Before and @After advice.

Pointcut
--------

A regular expression that matches join points. Advice is associated with a pointcut expression and runs at any join
point matched by the pointcut (for example, the execution of a method with a certain name).

Introduction (also known as an inter-type declaration)
------------------------------------------------------

Go! allows you to introduce new interfaces (and a corresponding implementation with trait) to any user-defined class.
For example, you could use an introduction to make all Data Transfer Objects implement an Serializable interface,
to simplify persistence.

Weaving
-------

Linking aspects with other application types or objects to create an advised object. This can be done at any time:
compile time, load time, or at runtime. Go! performs weaving at runtime and doesn’t require any additional steps
to transform the source code.