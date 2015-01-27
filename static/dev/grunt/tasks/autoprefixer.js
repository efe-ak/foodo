var config = require('../config');

module.exports = function (grunt) {
    grunt.config('autoprefixer', {
        options: {
            browsers: [ 'last 4 versions' ],
            map: true
        }
    });

    grunt.config([ 'autoprefixer', 'theme' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'theme-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/'
    });

    grunt.config([ 'autoprefixer', 'modules' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'module-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/'
    });

    grunt.config([ 'autoprefixer', 'skins' ], {
        expand: true,
        cwd: '../' + config.dist + '/' + config.theme + '/css/',
        src: [ 'skin-*.css', '!*.min.css' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/'
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};