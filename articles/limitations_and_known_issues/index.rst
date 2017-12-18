Limitations and known issues
============================

Limitations
~~~~~~~~~~~

.. _limitations-and-known-issues-aspect-kernel-is-singleton-implementation:

Aspect kernel is singleton implementation
-----------------------------------------

Aspect kernel is singleton_ implementation by design because there is no reason to run one single application with
two loaded aspect kernel with two different configurations. One class/function can be weaved only once and loaded into
execution memory.

However, if application has more than one front controller, and each controller has different requirements conflicting
with another, it is possible to setup different aspect kernels with different configurations for each of those front
controllers.

.. _singleton: https://en.wikipedia.org/wiki/Singleton_pattern

Serialization/deserialization and reflections are sensitive to weaving
----------------------------------------------------------------------

As have been mentioned several times, Go! AOP executes code weaving in runtime by introducing proxy class. Proxy class
adds additional level of inheritance of your class, and therefore, previous assumption on which
serialization/deserialization and reflective code is built upon becomes wrong.

This issue is elaborated in details here: :doc:`serialization-reflections-and-weaving` where you can find
guidelines how to prevent possible issues in your code.

 .. toctree::
    :hidden:
    :maxdepth: 1

    serialization-reflections-and-weaving

Class weaving constrained to PSR-0 and PSR-4 compatible classes only
--------------------------------------------------------------------

Go! AOP supports only weaving of classes which are compatible with PSR-0_ and PSR-4_ autoloading, which means that there
can be only one class per file.

.. _PSR-0: http://www.php-fig.org/psr/psr-0
.. _PSR-4: http://www.php-fig.org/psr/psr-4

Interception of system functions is sensitive to namespace prefixing
--------------------------------------------------------------------

Go! AOP supports interception and weaving of system functions, however, it is only possible if functions are referenced
without namespace prefix. That means that, per example, it is possible to intercept ``array_merge()`` function, if
function is used like stated above. However, if namespace prefix is used, per example ``\array_merge()``, interception
of same function is not possible.

However, developers almost never prefixes system functions with default namespace.

Known issues
~~~~~~~~~~~~

Weaving of native PHP classes
-----------------------------

It is not possible (yet) to weave native PHP classes and classes loaded via PHP extensions. Therefore, your point cut
should not target those classes. Reason for that is that those classes are not loaded via Composer into memory, and
therefore their loading process can not be intercepted by Go! AOP.

Weaving of classes/functions from PHAR archive
----------------------------------------------

Although this might be supported in future, for now, it is not possible. However, this is not in priority list, almost
every library that is available as PHAR archive is available via Composer as well. If you need weaving of those classes,
use Composer to acquire library source code, not PHAR archive.

Common occurrence of this limitation is when, per example, PHPUnit is being used as PHAR archive in project for unit
tests, and directory where test classes residue are not excluded from weaving. If you do not need weaving of your unit
tests, it is much wiser to exclude tests from weaving (see :ref:`installation_configuration_references`) rather than
include source code of above mentioned PHPUnit library.

.. _limitations-and-known-issues-weaving-of-doctrine-entities:

Weaving of Doctrine entities
----------------------------

Weaving of Doctrine entities is at the moment experimental, but unsupported due to difficulty of implementation of full
support. Namely, Go! AOP injects one level of inheritance level to entities trough proxy classes modifying mapping
metadata of entities. With proxy, mapped class properties are moved one level up to proxied classes.
Current efforts to support weaving of Doctrine entities is focused on modifying metadata by introducing
proxied classes as mapped superclasses. However, it is not stable yet and can not be used in production.

