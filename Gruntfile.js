module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerRequirejs: {
        target: {
          rjsConfig: 'src/js/app.js',
          options: {
              exclude: ['requirejs']
          }
        }
    },
    requirejs: {
      compile: {
        options: {
          appDir: "src/js",
          baseUrl: ".",
          mainConfigFile: "src/js/app.js",
          modules: [
              {name: "app/main"}
          ],
          dir: "public/js",
          optimize: 'none',
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    },
    sass: {
        dist: {
          files: [{
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss'],
            dest: 'src/css',
            ext: '.css'
          }]
        }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },
    mustache_render: {
      all: {
        files: [
            {
                data: "src/data/keyboard.json",
                template: "src/templates/index.mustache",
                dest: "public/index.html"
            }
        ]
      }
    },
    watch: {
        css: {
			files: '**/*.scss',
			tasks: ['sass', 'cssmin']
		},
        js: {
            files: 'src/**/*.js',
			tasks: ['requirejs']
        },
        mustache: {
            files: '**/*.mustache',
			tasks: ['mustache_render']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-bower-requirejs');


  grunt.registerTask('default', ['bowerRequirejs','requirejs','sass', 'cssmin', 'mustache_render']);

};
