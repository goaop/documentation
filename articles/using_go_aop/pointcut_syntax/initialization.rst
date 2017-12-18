Initialization
==============

With Go! AOP, you may intercept object initialization. Pointcut expression pattern is
``initialization([FULL_QUALIFIED_CLASS_NAME_FILTER])``. All before mentioned wildcards are supported.

- ``initialization`` keyword denotes that object initialization will be intercepted.
- ``[FULL_QUALIFIED_CLASS_NAME_FILTER]`` allows you to specify expression that will be used to match name of class which
  initialization ought to be intercepted.

Have in mind that interceptions of class initialization can have noticeable impact on weaving performance since it requires
scanning and analysing source code of every class which is within configured source/include directory. Therefore, this feature is
disabled by default. You have to configure your aspect kernel to include this feature. For details see:
:ref:`installation_configuration_references`.

Static initialization
~~~~~~~~~~~~~~~~~~~~~

Static initialization allows you to execute arbitrary code when some class or classes are about to be loaded for
the first time in application execution life cycle, that is, when autoloader loads those classes into memory.
Pointcut expression pattern is ``staticinitialization([FULL_QUALIFIED_CLASS_NAME_FILTER])``. All before mentioned wildcards
are supported.

- ``staticinitialization`` keyword denotes that first time class loading into memory is intercepted.
- ``[FULL_QUALIFIED_CLASS_NAME_FILTER]`` allows you to specify expression that will be used to match name of class which
  static initialization ought to be intercepted.

Examples
--------

- ``initialization(Demo\Example)`` - Every initialization of class instance of ``Demo\Example``, that is, when
  ``new Demo\Example()`` is invoked.
- ``initialization(Demo\**)`` - Every initialization of any class instance within ``Demo`` sub-namespaces.
- ``staticinitialization(Demo\Example)`` - First time when the class ``Demo\Example`` is loaded into the memory of
  application execution context.
- ``staticinitialization(Demo\**)`` - First time of loading of any class within ``Demo`` sub-namespace into the memory
  application execution context.