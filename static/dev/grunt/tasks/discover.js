var config = require('../config');
var wiredep = require('wiredep');

module.exports = function (grunt) {
    grunt.registerTask('discover', 'Discover Bower Dependencies and generate a vendor bundle', function () {

        var bower = wiredep({
            exclude: config.discover.exclude
        });

        grunt.config([ 'concat', 'vendor_scripts' ], {
            src: bower.js,
            dest: '../' + config.dist + '/' + config.theme + '/js/vendor.js'
        });

        grunt.task.run([ 'concat:vendor_scripts' ]);
    });
};