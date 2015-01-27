var config = require('../config');

module.exports = function (grunt) {

    grunt.config([ 'uglify', 'all' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/js/',
        src: [ '*.js', '!*.min.js' ],
        dest: '../' + config.dist + '/' + config.theme + '/js/',
        ext: '.min.js'
    });

    grunt.config([ 'uglify', 'theme' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/js/',
        src: [ '*.js', '!*.min.js', '!module-*.js' ],
        dest: '../' + config.dist + '/' + config.theme + '/js/',
        ext: '.min.js'
    });

    grunt.config([ 'uglify', 'modules' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/js/',
        src: [ 'module-*.js', '!*.min.js', '!vendor*.js' ],
        dest: '../' + config.dist + '/' + config.theme + '/js/',
        ext: '.min.js'
    });

    grunt.config([ 'uglify', 'main' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/js/',
        src: [ 'module-bundle-main.js' ],
        dest: '../' + config.dist + '/' + config.theme + '/js/',
        ext: '.min.js'
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};