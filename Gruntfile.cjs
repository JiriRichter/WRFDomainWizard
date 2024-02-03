module.exports = function(grunt) {

  grunt.initConfig({

    timestamp: new Date().getTime(),

    targetFolder: "build",

    clean: [
      '<%= targetFolder %>'
    ],

    copy: {
      build: {
        expand: true,
        cwd: 'src',
        src: [
          'img/**',
          'json/**'
        ],
        dest: '<%= targetFolder %>/',
      },
      lib: {
        expand: true,
        cwd: 'node_modules',
        flatten: true,
        filter: 'isFile',
        src: [
          // https://www.npmjs.com/package/jquery
          'jquery/dist/jquery.min.js',
          
          // https://www.npmjs.com/package/bootstrap
          'bootstrap/dist/js/bootstrap.bundle.min.js',
          'bootstrap/dist/css/bootstrap.min.css',
          
          // https://www.npmjs.com/package/spin.js
          'spin.js/spin.js',
          
          // https://www.npmjs.com/package/immediate
          'immediate/dist/immediate.min.js',
          
          // https://www.npmjs.com/package/proj4
          'proj4/dist/proj4.js',
          
          // https://www.npmjs.com/package/leaflet
          'leaflet/dist/leaflet.js',
          'leaflet/dist/leaflet.css',
          'leaflet/dist/images/*.png',
          
          // https://www.npmjs.com/package/leaflet-spin
          'leaflet-spin/leaflet.spin.min.js',
          
          // https://www.npmjs.com/package/leaflet-sidebar-v2
          'leaflet-sidebar-v2/js/leaflet-sidebar.min.js',
          'leaflet-sidebar-v2/css/leaflet-sidebar.min.css',
          
          // https://www.npmjs.com/package/blob-polyfill
          'blob-polyfill/Blob.js',

          // https://www.npmjs.com/package/file-saver
          'file-saver/dist/FileSaver.min.js',

          // https://www.npmjs.com/package/font-awesome
          '@fortawesome/fontawesome-free/css/all.min.css',

          // https://www.npmjs.com/package/leaflet-providers
          'leaflet-providers/leaflet-providers.js'
        ],
        dest: '<%= targetFolder %>/lib',
      },
      images: {
        expand: true,
        cwd: 'node_modules',
        flatten: true,
        filter: 'isFile',
        src: [
          // https://www.npmjs.com/package/leaflet
          'leaflet/dist/images/*.png',
        ],
        dest: '<%= targetFolder %>/lib/images',
      },
      webfonts: {
        expand: true,
        cwd: 'node_modules',
        flatten: true,
        filter: 'isFile',
        src: [
          '@fortawesome/fontawesome-free/webfonts/*.*',
        ],
        dest: '<%= targetFolder %>/webfonts',
      },
      samples: {
        expand: true,
        src: [
          'samples/**/*.wps',
          'samples/**/*.json'
        ],
        dest: '<%= targetFolder %>/',
      }
    },

    replace: {
      github: {
        src: ['src/index.html'],
        // index.html must be placed to root folder for GitHub Pages to work
        dest: './index.html',             
        replacements: [{
          from: '{{timestamp}}',
          to: '<%= timestamp %>'
        },
        {
          from: '{{baseUrl}}',
          to: 'build'
        }]
      },
      build: {
        src: ['src/index.html'],
        // index.html must be placed to root folder for GitHub Pages to work
        dest: 'build/index.html',             
        replacements: [{
          from: '{{timestamp}}',
          to: '<%= timestamp %>'
        },
        {
          from: '{{baseUrl}}',
          to: ''
        }]
      }

    },

    less: {
      development: {
        options: {
        },
        files: {
          "<%= targetFolder %>/css/wrf-domain-wizard.css": "src/less/wrf-domain-wizard.less"
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= targetFolder %>/css',
          src: ['wrf-domain-wizard.css'],
          dest: '<%= targetFolder %>/css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      less: {
        files: ['src/less/**/*.less'], 
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      html: {
        files: ['src/*.html'], 
        tasks: ['replace'],
        options: {
          nospawn: true
        }
      }
    }
    
  });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['less', 'cssmin', 'replace', 'copy' ]);
};