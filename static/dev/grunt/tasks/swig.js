var config = require('../config');
var swig = require('swig');
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {

    swig.setFilter('contains', function (input, contains) {
        return input.indexOf(contains) > - 1;
    });

    swig.setFilter('typeof', function (input, type) {
        if (typeof type == 'undefined') return typeof input;
        return typeof input == type;
    });

    swig.setFilter('inArray', function (array, obj) {
        if (typeof array !== 'object') return false;
        return array.inArray(obj);
    });

    swig.setFilter('array_key_exists', function (array, key) {
        return key in array;
    });

    require('swig-highlight').apply(swig);

    grunt.config('swig', {
        options: {
            swig: {
                autoescape: true,
                loader: swig.loaders.fs(process.cwd()),
                cache: false,
                locals: {
                    now: function () {
                        return new Date();
                    }
                }
            }
        },
        index: {
            base: 'app/html',
            src: [ 'app/html/index.html' ],
            dest: '../' + config.dist + '/../'
        },
        dist: {
            base: 'app/html/themes',
            src: [ 'app/html/themes/' + config.theme + '/**/*.html', '!**/_*.html' ],
            dest: '../' + config.dist + '/'
        }
    });

    grunt.registerMultiTask('swig', 'Convert Swig templates to HTML', function (context) {
        var options = this.options(),
            data = this.data,
            globalVars = {};

        var async = this.async();

        if (options.swig !== 'undefined') {
            swig.setDefaults(options.swig);
        }

        try {
            globalVars = grunt.util._.extend(data, grunt.file.readJSON(path.join(process.cwd(), 'swig.json')));
        } catch (err) {
            globalVars = grunt.util._.clone(data);
        }

        this.filesSrc.forEach(function (file) {

            if (! grunt.file.exists(file)) {

                grunt.log.warn('Source file "' + file.src + '" not found.');

                return false;

            } else {

                var destPath = file.replace(data.base, ''),
                    outputFile = path.basename(file),
                    slug = path.basename(file, path.extname(file)),
                    htmlFile = path.join(data.dest, destPath),
                    tplVars = {},
                    contextVars = {};

                try {
                    tplVars = grunt.file.readJSON(path.join(path.dirname(file), outputFile + ".json"));
                } catch (err) {
                    tplVars = {};
                }

                if (typeof context !== 'undefined') {
                    try {
                        contextVars = grunt.file.readJSON(path.join(path.dirname(file), outputFile + "." + context + ".json"));
                    } catch (err) {
                        contextVars = {};
                    }
                }

                tplVars.context = context;
                tplVars.config = config;
                tplVars.page = {
                    path: destPath,
                    basename: outputFile,
                    slug: slug
                };
                tplVars.watch = global.isWatching;

                grunt.log.writeln('Writing HTML to ' + htmlFile);

                grunt.file.write(htmlFile, swig.renderFile(file, grunt.util._.extend(globalVars, tplVars, contextVars)));
            }
        });

        async();
    });
};