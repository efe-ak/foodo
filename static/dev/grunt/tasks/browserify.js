var config = require('../config');
var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/browserifyBundleLogger');
var source = require('vinyl-source-stream');
var fs = require('vinyl-fs');
var path = require('path');

module.exports = function (grunt) {

    var options = {
        bundles: []
    };

    options.bundles.push({
        src: './app/js/themes/' + config.theme + '/main.js',
        dest: '../' + config.dist + '/' + config.theme + '/js',
        bundleName: 'module-bundle-main.js'
    });

    if (grunt.file.exists('./app/js/themes/' + config.theme + '/theme-core.js')) {
        options.bundles.push({
            src: './app/js/themes/' + config.theme + '/theme-core.js',
            dest: '../' + config.dist + '/' + config.theme + '/js',
            bundleName: 'theme-core.js'
        });
    }

    if (config.browserify.length && grunt.cli.tasks.inArray(["build:modules", "build:dm", "build:dms"]) ) {
        config.browserify.forEach(function (task) {
            if ((typeof task.themes == 'undefined' || task.themes.indexOf(config.theme) !== - 1) && (typeof task.exclude == 'undefined' || task.exclude.indexOf(config.theme) === - 1)) {
                var dest = '../' + config.dist + '/' + config.theme + '/js',
                    src = task.cwd + task.src;

                options.bundles.push({
                    src: src,
                    dest: dest,
                    bundleName: task.build
                });
            }
        });
    }

    grunt.config('browserify', {options: options});

    grunt.registerTask('browserify', 'Browserify lets you require("modules") in the browser by bundling up all of your dependencies.', function () {

        var options = this.options();

        var bundleQueue = options.bundles.length;

        var async = this.async();

        var browserifyThis = function (bundleConfig) {

            var bundler = browserify({
                // Required watchify args
                cache: {}, packageCache: {}, fullPaths: true,
                // Specify the entry point of your app
                entries: bundleConfig.src,
                // Enable source maps!
                debug: config.debug
            });

            var reportFinished = function () {
                // Log when bundling completes
                bundleLogger.end(path.join(bundleConfig.dest, bundleConfig.bundleName));

                if (bundleQueue) {
                    bundleQueue --;
                    if (bundleQueue === 0) {
                        async();
                    }
                }
                else {
                    async();
                }
            };

            var bundle = function () {
                // Log when bundling starts
                bundleLogger.start(path.join(bundleConfig.dest, bundleConfig.bundleName));

                return bundler
                    .bundle()
                    // Report compile errors
                    // .on('error', handleErrors)
                    .pipe(source(bundleConfig.bundleName))
                    // Specify the output destination
                    .pipe(fs.dest(bundleConfig.dest))
                    //.pipe(complete())
                    .on('end', reportFinished);
            };

            if (global.isWatching) {
                // Wrap with watchify and rebundle on changes
                bundler = watchify(bundler);
                // Rebundle on update
                bundler.on('update', bundle);
            }

            return bundle();
        };

        // Start bundling with Browserify for each bundle specified
        options.bundles.some(function (config) {
            browserifyThis(config);
        });
    });
};