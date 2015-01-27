var config = require('../config');

module.exports = function (grunt) {
    grunt.config('jekyll', {
        dist: {
            options: {
                config: '_skins.yml,_config.yml',
                raw: 'docs_path: ../' + config.dist + '/1\n'
            }
        },
        watch: {
            options: {
                config: '_skins.yml,_config.yml',
                raw: 'docs_path: ../' + config.dist + '/1\n' +
                     'isWatching: true\n'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jekyll');
};