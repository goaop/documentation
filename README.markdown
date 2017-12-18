Documentation for Go! Aspect-Oriented Framework and related projects
====================================================================

**\[WORK IN PROGRESS\]**

This repository contains documentation for Go! AOP framework and related
projects:

- Go! AOP framework: [https://github.com/goaop/framework](https://github.com/goaop/framework)
- Symfony Bundle: [https://github.com/goaop/goaop-symfony-bundle](https://github.com/goaop/goaop-symfony-bundle)
- Laravel bridge: [https://github.com/goaop/goaop-laravel-bridge](https://github.com/goaop/goaop-laravel-bridge)
- Zend 2 module: [https://github.com/goaop/goaop-zf2-module](https://github.com/goaop/goaop-zf2-module)
- IDEA plugin (PHPStorm, IntelliJ): [https://github.com/goaop/idea-plugin](https://github.com/goaop/idea-plugin)

To see current, development version of this documentation, go to
[http://go-aop-php.readthedocs.io/en/dev/](http://go-aop-php.readthedocs.io/en/dev/)
where this documentation is rendered online.

# Building documentation

This documentation is written using reStructuredText
(see [http://docutils.sourceforge.net/rst.html](http://docutils.sourceforge.net/rst.html)).

HTML files are generated with Sphinix Python documentation generator.
Assets are managed via Node.js and npm, compiled and published using Webpack.

## Requirements

- Sphinix Python documentation generator
[http://www.sphinx-doc.org/en/stable/install.html](http://www.sphinx-doc.org/en/stable/install.html)
(which includes installation of Python and other required libraries, which
depends on your operating system).
- Node.js and npm [https://nodejs.org](https://nodejs.org) to run Webpack
- Webpack [https://webpack.github.io](https://webpack.github.io) to compile
and deploy web assets (`.sass`, `.js`, `.css` files, images, etc.).
- Webpack Encore [https://github.com/symfony/webpack-encore](https://github.com/symfony/webpack-encore)
a wrapper for Webpack.

In general, you should install Sphinix and Node.js only. When you run
`npm install` from root directory of this project, all other dependencies
will be installed.

## Execute build

Documentation is built in three steps:

1. Clean up `_build/doctrees`, `_build/html` and `_static` directories from
previous build.
2. Compiling all the assets by running `./node_modules/.bin/encore production`.
Command will start Webpack, compile all assets (`.scss` and `.js` files and fonts)
and place them into `_static` directory.
3. Generating documentation by running `make html` command. Command will
convert all `.rst` files to `.html`, placing them into `_build` directory
accompanied with `_static` directory as well.


Of course, you can execute all of those commands by simply runing `sh build.sh`
script that will do all of those at once.
