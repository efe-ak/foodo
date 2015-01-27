var config = require('../config');

module.exports = function (grunt) {

    grunt.config([ 'less', 'theme' ], {
        expand: true,
        cwd: 'app/less/themes/' + config.theme + '/',
        src: [ '*.less', '!_*.less', '!module-*.less' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.css'
    });
    grunt.config([ 'less', 'modules' ], {
        expand: true,
        cwd: 'app/less/themes/' + config.theme + '/',
        src: [ 'module-*.less' ],
        dest: '../' + config.dist + '/' + config.theme + '/css/',
        ext: '.css'
    });
    grunt.config([ 'less', 'skins' ], {
        expand: true, // set to true to enable options following options:
        cwd: 'app/less/skins/' + config.theme + '/', // all sources relative to this path
        src: '*.less', // source folder patterns to match, relative to cwd
        dest: '../' + config.dist + '/' + config.theme + '/css/', // destination folder path prefix
        ext: '.css' // replace any existing extension with this value in dest folder
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};