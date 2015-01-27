var config = require('../config');

module.exports = function (grunt) {
    grunt.config('prettify', {
        options: {
            indent: 4,
            indent_inner_html: false,
            preserve_newlines: true,
            max_preserve_newlines: 1,
            brace_style: "condense",
            unformatted: [ "a", "span", "i", "pre", "code" ]
        },
        all: {
            expand: true,
            cwd: '../' + config.dist + '/',
            ext: '.html',
            src: ['**/*.html'],
            dest: '../' + config.dist + '/'
        },
        docs: {
            expand: true,
            cwd: '../docs/',
            ext: '.html',
            src: ['**/*.html'],
            dest: '../docs/'
        },
        theme: {
            expand: true,
            cwd: '../' + config.dist + '/' + config.theme + '/',
            ext: '.html',
            src: ['**/*.html'],
            dest: '../' + config.dist + '/' + config.theme + '/'
        }
    });

    grunt.loadNpmTasks('grunt-prettify');
};