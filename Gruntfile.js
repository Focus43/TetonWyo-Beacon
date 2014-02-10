/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    var _initConfigs = {
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.project %> - Build v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n',
        filename: '<%= pkg.name %>',
        concat: {
            mainjs: {
                files: {
                    'application/compiled/main.js' : ['application/dev/main.js']
                }
            }
        },
        uglify: {
            mainjs: {
                files: {
                    'application/compiled/main.js' : 'application/compiled/main.js'
                }
            }
        },
        jshint: {
            options: {
                browser: true,
                devel:   true,
                eqeqeq:  true,
                curly:   true,
                undef:   true
            },
            mainjs: ['application/dev/main.js']
        },
        watch: {
            all: {
                files: ['application/dev/*.js'],
                tasks: ['jshint', 'newer:concat']
            }
        }
    };

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-newer');

    // Pass final configs
    grunt.initConfig(_initConfigs);

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat']);
    grunt.registerTask('compile', ['jshint', 'concat', 'uglify']);

};