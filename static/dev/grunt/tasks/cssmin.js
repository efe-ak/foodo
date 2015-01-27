var config = require('../config');

module.exports = function (grunt) {
    grunt.config([ 'cssmin', 'default' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ '*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.min.css'
    });

    grunt.config([ 'cssmin', 'vendor' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'vendor.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.min.css'
    });

    grunt.config([ 'cssmin', 'theme' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'theme-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.min.css'
    });

    grunt.config([ 'cssmin', 'modules' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'module-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.min.css'
    });

    grunt.config([ 'cssmin', 'skins' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'skin-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.min.css'
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};