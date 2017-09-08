Configuration references
========================

- ``debug``: Optional, boolean. Denotes whether aspect kernel operates in debug mode. By default, this parameter is set
  to ``false``. It is advisable to set this parameter to ``true`` when developing application.
- ``appDir``: Optional, string. Absolute path to your application root directory. If not provided, kernel will try to
  guess your application directory based on location of ``vendor`` directory where framework is installed. It is advised
  to set this location manually. Files in this directory will be scanned and analyzed for weaving.
- ``cacheDir``: Required, string. Path to cache location where aspect kernel will store its output in order to optimize
  load time.
- ``cacheFileMode``: Optional, integer. Binary mask of permission bits that is set to cache files. By default, value is
  set to ``0770 & ~umask()``.
- ``annotationCache``: Optional, object. Implementation of ``Doctrine\Common\Cache\Cache`` interface which will be used
  as cache driver for Doctrine's annotation reader. If not provided, ``Doctrine\Common\Cache\FilesystemCache`` is used
  with cache location defined within your ``cacheDir`` configuration, inside ``_annotations`` directory.
- ``includePaths``: Optional, array of strings. Beside application directory (``appDir`` configuration parameter), you
  may state additional directories for scanning and analysis by aspect kernel for weaving.
- ``excludePaths``: Optional, array of strings. You may provide a list of directories which you would like to be omitted
  from weaving.
- ``containerClass``: Optional, string. Full qualified class name of aspect container implementation, that is,
  implementation of ``Go\Core\Container``. If not provided, ``Go\Core\GoAspectContainer`` is used by default. Its
  intention is to allow you to provide your own implementation of aspect container, or modified version of default one.

Annotation cache
----------------

Go! AOP uses Doctrine's annotation reader for reading and analyzing class annotations. By default, annotation cache is
stored on local filesystem, since ``Doctrine\Common\Cache\FilesystemCache`` is used. This is a reasonable setting for
most of the use case scenarios.

However, there are use cases where default implementation could not be used, or it is not appropriate to use it:

- **Testing environment**: For your unit tests or functional tests, it is advisable to use instance of
  ``Doctrine\Common\Cache\ArrayCache`` since it does not leave any footprint on your filesystem and memory.
- **Read-only filesystems**: If you are deploying your application to read-only filesystem (like PHAR archive or similar)
  filesystem based cache is not option. In that case you may use any other implementation, such as APCu, Redis, Memcache
  or similar. If nothing of available does not works for you, you can always sacrifice some performances and fallback to
  ``Doctrine\Common\Cache\ArrayCache``

