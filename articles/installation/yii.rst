Install Go! AOP Yii framework
=============================

Considering that you have already installed ``goaop/framework`` by executing console command:

.. code-block:: console

   composer require goaop/framework

for versions prior to 2.1 it is required to modify ``composer.json`` file:

.. code-block:: javascript

   {
      "name": "yii/project",
         "require": {
            "yiisoft/yii2": "^2.0",
            "goaop/framework": "^2.1"
         },
         "autoload": {
            "psr-4": {
                "api\\": "api",
                "common\\": "common",
                "console\\": "console"
            }
         }
      }
   }


Don't forget to dump autoload every time when you modify ``composer.json`` file:

.. code-block:: console

   composer dumpautoload

Create your aspect kernel class (make sure it can be autoloaded via Composer) and your aspects:

.. code-block:: php
   :caption: YiiAspectKernel.php
   :linenos:

   <?php

   use Go\Core\AspectContainer;
   use Go\Core\AspectKernel;

    class YiiAspectKernel extends AspectKernel
    {

       protected function configureAop(AspectContainer $container)
       {
          $container->registerAspect(new MyAspect());
       }
    }

And finally, you will have to modify your ``{app}/web/index.php`` file:


.. code-block:: php
   :caption: YiiAspectKernel.php
   :linenos:


    <?php

    use YiiAspectKernel;
    use common\config\ConfigLoader;
    use yii\web\Application;

    require __DIR__ . '/../../vendor/autoload.php';

    defined('YII_DEBUG') or define('YII_DEBUG', in_array(getenv('YII_DEBUG'), ['true', '1']));
    defined('YII_ENV') or define('YII_ENV', getenv('YII_ENV'));

    // Initialize an application aspect container
    ApiAspectKernel::getInstance()->init([
        'debug'    => YII_DEBUG,
        'appDir'   => __DIR__ . '/../../',
        'cacheDir' => __DIR__ . '/../runtime/aspect',
        'excludePaths' => [
            __DIR__ . '/../runtime/aspect',
            __DIR__ . '/../../vendor',
        ],
    ]);

    require __DIR__ . '/../../vendor/yiisoft/yii2/Yii.php';
    spl_autoload_unregister(['Yii', 'autoload']);
    require __DIR__ . '/../../common/config/bootstrap.php';
    require __DIR__ . '/../config/bootstrap.php';

    $config = ConfigLoader::load('api');

    $application = new Application($config);
    $application->run();

Most important thing in code here which you should notice is ``spl_autoload_unregister(['Yii', 'autoload'])`` which
will disable Yii's autoloader and use Composer's one instead, which enables to Go! AOP to intercept code class loading
and execute weaving.

