var config = require('../config');

module.exports = function (grunt) {
    grunt.config('clean', {
        options: {
            force: true
        },
        html: {
            src: [ '../' + config.dist + '/' + config.theme + '/**/*.html' ]
        },
        dist: {
            src: [ '../' + config.dist + '/' + config.theme + '/**/*' ]
        },
        modules: {
            src: [ '../' + config.dist + '/' + config.theme + '/css/module-*.css' ]
        },
        skins: {
            src: [ '../' + config.dist + '/' + config.theme + '/css/skin-*.css' ]
        },
        sass: {
            src: 'app/scss/**/*'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};