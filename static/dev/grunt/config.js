var grunt = require('grunt');
var path = require('path');

Array.prototype.inArray = function(obj){

    if (typeof obj == 'object') {
        var a = obj.length;
        while (a --) {
            if (this.inArray(obj[ a ])) return true;
        }
        return false;
    }

    var i = this.length;
    while (i --) {
        if (this[ i ] === obj) {
            return true;
        }
    }
    return false;
};

/** @return: String */
String.prototype.ReplaceSpecialPaths = function (config) {
    return this
        .replace('$THEME_DIR', '../' + config.dist + '/' + config.theme)
        .replace('$DIST_DIR', '../' + config.dist);
};

module.exports = function (grunt) {

    // main _config
    var _skins = grunt.file.readJSON('_skins.json');

    // Dist Package Options
    var theme = grunt.option('theme');
    var themes = [];
    var dist = grunt.option('dist') || 'dist/themes';
    var config = grunt.file.readJSON('_grunt.config.json');

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * <%= pkg.description %> <%= pkg.version %>\n' +
        ' * Author: <%= pkg.author%>\n' +
        ' * Licence: <%= pkg.license.url %>\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>\n' +
        ' */\n'
    });

    if (!theme) {
        console.log(theme);
        grunt.fail.fatal('You must specify a theme by using the --theme [theme_name] option.');
    }

    if (theme == 'all') {
        themes = grunt.file.expand({filter: "isDirectory"}, "app/html/themes/*").map(function(value){
            return value.split(path.sep).pop()
        });
    }

    if (typeof config.dist !== 'undefined' && typeof config.dist[theme] !== 'undefined') {
        dist = config.dist[theme];
    }

    return {
        theme: theme,
        themes: themes,
        dist: dist,
        skins: _skins,
        vendor_css: config.vendor_css || [],
        discover: config.discover || {},
        concat: config.concat || [],
        rename: config.rename || [],
        browserify: config.browserify || [],
        copy: config.copy || [],
        debug: config.debug
    }

}(grunt);