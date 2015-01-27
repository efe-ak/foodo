var config = require('../config');
var browserSync = require("browser-sync");

module.exports = function (grunt) {
    grunt.config('browserSyncInit', {
        dist: {
            options: {
                server: {
                    baseDir: '../',
                    routes: {
                        "/bower_components": "../bower_components"
                    }
                },
                startPath: config.dist + ( config.theme != 'choose' ? '/' + config.theme : '' ) + '/index.html'
            }
        },
        docs: {
            options: {
                server: {
                    baseDir: '../',
                    routes: {
                        "/bower_components": "../bower_components"
                    }
                },
                startPath: 'docs/index.html'
            }
        },
        options: {
            online: false,
            notify: false,
            minify: false
        }
    });

    /**
     * Init BrowserSync manually
     */
    grunt.registerMultiTask("browserSyncInit", "Keep your browsers in sync", function () {
        var done = this.async();
        browserSync.init([ '../' + config.dist + '/**/css/*.css', '../' + config.dist + '/**/js/*.js' ], this.options());
        done();
    });

    /**
     * Reload page
     */
    grunt.registerTask("browserSyncReload", function () {
        browserSync.reload([ 'app/html/**/*.html' ]);
    });
};