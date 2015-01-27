module.exports = function (grunt) {
    grunt.config('jshint', {
        all: ['Gruntfile.js', 'app/js/**/*.js', 'app/vendor/**/*.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};