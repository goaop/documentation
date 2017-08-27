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
use Composer to acquire library code, not PHAR archive.

