var config = require('../config');

module.exports = function (grunt) {
    grunt.config('copy', {
        fontawesome: {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: '*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        pictoicons_font: {
            expand: true,
            cwd: 'app/icons/pictoicons/fonts',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        google_material_font: {
            expand: true,
            cwd: 'bower_components/material-design-iconic-font/fonts/',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts'
        },
        glyphicons: {
            expand: true,
            cwd: 'bower_components/bootstrap/fonts/',
            src: '*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        images_common: {
            expand: true,
            cwd: 'app/images/common/',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/images'
        },
        images_theme: {
            expand: true,
            cwd: 'app/images/themes/' + config.theme + '/',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/images'
        },
        sass: {
            expand: true,
            cwd: 'tmp/converter-sass/app',
            src: '**/*',
            dest: 'app/'
        },
        demo: {
            expand: true,
            cwd: 'app/_site/',
            src: '*.html',
            dest: '../' + config.dist + '/../'
        }
    });

    grunt.registerTask('copy-build', function () {
        var async = this.async();
        var tasks = [ 'copy:fontawesome', 'copy:google_material_font', 'copy:pictoicons_font', 'copy:glyphicons', 'copy:images_common', 'copy:images_theme', 'copy:demo' ];

        if (config.copy.length) {
            config.copy.forEach(function (task) {
                if (typeof task.themes == 'undefined' || task.themes.indexOf(config.theme) !== - 1) {
                    grunt.config([ 'copy', task.task ], {
                        expand: true,
                        cwd: task.cwd,
                        src: task.src,
                        dest: '../' + config.dist + '/' + config.theme + '/' + task.dest
                    });
                    tasks.push('copy:' + task.task);
                }
            });
        }

        tasks.forEach(function (task) {
            grunt.task.run(task);
        });
        async();
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};