module.exports = function (grunt) {
    grunt.config('build', {
        dist: {
            tasks: [
                'clean:dist',
                'swig:dist',
                'prettify:theme',
                'jshint',
                'browserify',
                'less:theme',
                'concat',
                'autoprefixer:theme',
                'cssmin:vendor',
                'cssmin:theme',
                'uglify:theme',
                'uglify:main',
                'copy-build'
            ]
        },
        dist_sass: {
            tasks: [
                'clean:dist',
                'swig:dist',
                'prettify:theme',
                'jshint',
                'browserify',
                'sass:theme',
                'concat',
                'autoprefixer:theme',
                'cssmin:vendor',
                'cssmin:theme',
                'uglify:theme',
                'uglify:main',
                'copy-build'
            ]
        },
        modules: {
            tasks: [
                'clean:modules',
                'less:modules',
                'jshint',
                'browserify',
                'concat-modules',
                'autoprefixer:modules',
                'cssmin:modules',
                'uglify:modules'
            ]
        },
        skins: {
            tasks: [
                'clean:skins',
                'less:skins',
                'autoprefixer:skins',
                'cssmin:skins'
            ]
        },
        d: {
            tasks: [
                'setWatch',
                'build:dist'
            ]
        },
        dm: {
            tasks: [
                'clean:dist',
                'clean:modules',
                'swig:dist',
                'prettify:theme',
                'jshint',
                'browserify',
                'less:theme',
                'less:modules',
                'concat',
                'concat-modules',
                'autoprefixer:theme',
                'autoprefixer:modules',
                'cssmin:vendor',
                'cssmin:modules',
                'cssmin:theme',
                'uglify:theme',
                'uglify:main',
                'uglify:modules',
                'copy-build'
            ]
        },
        dms: {
            tasks: [
                'build:dm',
                'build:skins'
            ]
        },
        choose: {
            tasks: [
                'build:d',
                'rename'
            ]
        }
    });

    grunt.registerMultiTask('build', function () {
        var async = this.async();
        grunt.task.run(this.data.tasks);
        async();
    });
};