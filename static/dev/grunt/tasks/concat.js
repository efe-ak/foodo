var config = require('../config');
var path = require('path');

module.exports = function (grunt) {
    grunt.config('concat', {
        options: {
            banner: '<%= banner %>\n<%= jqueryCheck %>',
            stripBanners: false
        }
    });

    grunt.config([ 'concat', 'vendor_css' ], {
        src: [ config.vendor_css ],
        dest: '../' + config.dist + '/' + config.theme + '/css/vendor.css'
    });

    /*
    grunt.config([ 'concat', 'app_css_default_theme' ], {
        src: [ '../' + config.dist + '/' + config.theme + '/css/vendor.css', '../' + config.dist + '/' + config.theme + '/css/theme.bundle.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/theme.bundle.css'
    });
    */

    if (config.concat.length) {
        config.concat.forEach(function (task) {
            if ((typeof task.themes == 'undefined' || task.themes.indexOf(config.theme) !== - 1) && (typeof task.exclude == 'undefined' || task.exclude.indexOf(config.theme) === - 1)) {

                // ignore modules
                if ( task.build.indexOf("module-") !== -1) return true;

                var files = [];
                task.files.forEach(function (file) {
                    var cwd = task.cwd.ReplaceSpecialPaths(config);
                    files.push(path.join(cwd, file));
                });
                grunt.config([ 'concat', task.build ], {
                    src: [ files ],
                    dest: '../' + config.dist + '/' + config.theme + '/js/' + task.build
                });
            }
        });
    }

    grunt.registerTask('concat-modules', function(){
        if (config.concat.length) {
            config.concat.forEach(function (task) {
                if ((typeof task.themes == 'undefined' || task.themes.indexOf(config.theme) !== - 1) && (typeof task.exclude == 'undefined' || task.exclude.indexOf(config.theme) === - 1)) {

                    // ignore anything other than modules
                    if ( task.build.indexOf("module-") === -1) return true;

                    var files = [];
                    task.files.forEach(function (file) {
                        var cwd = task.cwd.ReplaceSpecialPaths(config);
                        files.push(path.join(cwd, file));
                    });
                    grunt.config([ 'concat', task.build ], {
                        src: [ files ],
                        dest: '../' + config.dist + '/' + config.theme + '/js/' + task.build
                    });

                    grunt.task.run('concat:' + task.build);
                }
            });
        }
    });

    /*
    grunt.registerTask('concat_css_skins', function () {
        var concat = grunt.config.get('concat') || {};

        for (var skin in config.skins[ config.theme ]) {
            if (skin == 'default') break;
            concat[ 'app_css_skin_' + skin ] = {
                src: [
                    '../' + config.dist + '/' + config.theme + '/css/vendor.css',
                    '../' + config.dist + '/' + config.theme + '/css/skin-' + skin + '.css'
                ],
                dest: '../' + config.dist + '/' + config.theme + '/css/skin-' + skin + '.css'
            };
            grunt.config.set('concat', concat);
            grunt.task.run('concat:app_css_skin_' + skin);
        }
    });
    */

    grunt.loadNpmTasks('grunt-contrib-concat');
};