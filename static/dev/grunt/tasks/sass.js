var config = require('../config');

module.exports = function (grunt) {
    grunt.config('sass', {
        theme: {
            expand: true,
            cwd: 'app/scss/themes/' + config.theme + '/',
            src: [ '*.scss', '!_*.scss', '!module-*.scss' ],
            dest: '../' + config.dist + '/' + config.theme + '/css/',
            ext: '.css'
        },
        skins: {
            expand: true,
            cwd: 'app/scss/skins/' + config.theme + '/',
            src: '*.scss',
            dest: '../' + config.dist + '/' + config.theme + '/css/',
            ext: '.css'
        }
    });

    grunt.registerTask('convert_sass', ['shell:convert_less_to_sass', 'clean:sass', 'copy:sass']);

    grunt.loadNpmTasks('grunt-contrib-sass');
};