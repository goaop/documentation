const Encore = require('@symfony/webpack-encore');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

Encore
    .setOutputPath('_static/')
    .setPublicPath('/_static')
    .cleanupOutputBeforeBuild()
    .addEntry('js/theme', './assets/js/main.js')
    .addStyleEntry('css/theme', './assets/sass/theme.sass')
    .addStyleEntry('css/badge_only', './assets/sass/badge_only.sass')
    .enableSassLoader()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction());

var config = Encore.getWebpackConfig();

config.plugins = [].concat(config.plugins, [
    new ModernizrWebpackPlugin({
        'feature-detects': [
            'applicationcache',
            'audio',
            'canvas',
            'canvastext',
            'geolocation',
            'hashchange',
            'history',
            'indexeddb',
            'input',
            'inputtypes',
            'postmessage',
            'svg',
            'video',
            'webgl',
            'css/animations',
            'css/backgroundsize',
            'css/borderimage',
            'css/borderradius',
            'css/boxshadow',
            'css/columns',
            'css/flexbox',
            'css/fontface',
            'css/generatedcontent',
            'css/gradients',
            'css/hsla',
            'css/multiplebgs',
            'css/opacity',
            'css/reflections',
            'css/rgba',
            'css/textshadow',
            'css/transforms',
            'css/transforms3d',
            'css/transitions'
        ],
        minify: {
            output: {
                comments: true,
                beautify: true
            }
        }
    })
]);

module.exports = config;