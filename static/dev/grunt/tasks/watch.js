var config = require('../config');

module.exports = function (grunt) {
    grunt.config('watch', {
        less_theme: {
            files: [ 'app/less/themes/' + config.theme + '/**/*.less', 'app/less/common/**/*.less', 'app/less/vendor/**/*.less', 'app/vendor/**/*.less', '!module-*.less' ],
            tasks: [ 'less:theme', 'autoprefixer:theme', 'cssmin:theme', 'browserSyncReload' ]
        },
        less_modules: {
            files: [ 'app/less/themes/' + config.theme + '/**/*.less', 'app/less/common/**/*.less', 'app/less/vendor/**/*.less', 'app/vendor/**/*.less' ],
            tasks: [ 'less:modules', 'autoprefixer:modules', 'cssmin:modules', 'browserSyncReload' ]
        },
        less_skins: {
            files: 'app/less/skins/' + config.theme + '/**/*.less',
            tasks: [ 'less:skins', 'autoprefixer:skins', 'cssmin:skins', 'browserSyncReload' ]
        },
        sass_theme: {
            files: [ 'app/scss/themes/' + config.theme + '/**/*.scss', 'app/scss/common/**/*.scss', 'app/scss/vendor/**/*.scss', 'app/vendor/**/*.scss', '!module-*.scss' ],
            tasks: [ 'sass:theme', 'autoprefixer:theme', 'cssmin:theme', 'browserSyncReload' ]
        },
        sass_modules: {
            files: [ 'app/scss/themes/' + config.theme + '/**/*.scss', 'app/scss/common/**/*.scss', 'app/scss/vendor/**/*.scss', 'app/vendor/**/*.scss' ],
            tasks: [ 'sass:modules', 'autoprefixer:modules', 'cssmin:modules', 'browserSyncReload' ]
        },
        sass_skins: {
            files: 'app/scss/skins/' + config.theme + '/**/*.scss',
            tasks: [ 'sass:skins', 'autoprefixer', 'cssmin', 'browserSyncReload' ]
        },
        js: {
            files: [ 'app/js/**/*', 'app/vendor/**/*.js' ],
            tasks: [ 'jshint', 'browserify', 'uglify:main' ]
        },
        app: {
            files: [ 'app/html/**/*.html', 'app/vendor/**/*.html' ],
            tasks: [ 'clean:html', 'swig:dist', 'copy:demo', 'browserSyncReload', 'rename' ],
            options: {
                spawn: false
            }
        },

        // This watcher can achieve much faster syncs than vagrant rsync-auto when using vagrant with rsync synced folders,
        // By using shell:vagrant_rsync task, However it's not recommended unless you know what you're doing.
        vagrant_rsync: {
            files: [ "app/html/**/*.html", "app/less/**/*.less", "app/js/**/*.js" ],
            tasks: [ 'shell:vagrant_rsync' ],
            options: {
                spawn: false
            }
        }
    });

    grunt.registerTask('setWatch', function () {
        global.isWatching = true;
    });

    grunt.registerTask('watch-less', [ 'setWatch', 'browserSyncInit:dist', 'switchwatch:less_theme:js:app' ]);

    grunt.registerTask('watch-sass', [ 'setWatch', 'browserSyncInit:dist', 'switchwatch:sass_theme:js:app' ]);

    // Run with: grunt switchwatch:target1:target2 to only watch those targets
    grunt.registerTask('switchwatch', function () {
        var targets = Array.prototype.slice.call(arguments, 0);
        Object.keys(grunt.config('watch')).filter(function (target) {
            return ! (grunt.util._.indexOf(targets, target) !== - 1);
        }).forEach(function (target) {
            grunt.log.writeln('Ignoring ' + target + '...');
            grunt.config([ 'watch', target ], { files: [] });
        });
        grunt.task.run('watch');
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};