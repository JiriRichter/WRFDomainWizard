const analyticsFile = 'analytics.txt';

const replacements = (baseUrl) => [{
  from: '{{timestamp}}',
  to: '<%= timestamp %>'
},
{
  from: '{{baseUrl}}',
  to: baseUrl
},
{
  from: '{{analytics}}',
  to: '<%= analytics %>'
},
{
  from: '{{dialog.message-box}}',
  to: '<%= dialogMessageBox() %>'
},
{
  from: '{{dialog.namelist-input}}',
  to: '<%= dialogNamelistInput() %>'
}];

module.exports = function(grunt) {

  grunt.initConfig({

    timestamp: new Date().getTime(),

    targetFolder: "build",

    analytics: grunt.file.exists(analyticsFile) ? grunt.file.read(analyticsFile) : '',
    dialogMessageBox: () => grunt.file.read('src/dialog.message-box.html'),
    dialogNamelistInput: () => grunt.file.read('src/dialog.namelist-input.html'),

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
      node_modules: {
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
          'leaflet-providers/leaflet-providers.js',

          // https://www.npmjs.com/package/html-to-image
          'html-to-image/dist/html-to-image.js',

          // https://github.com/makinacorpus/Leaflet.TextPath
          'leaflet-textpath/leaflet.textpath.js',

          // https://www.npmjs.com/package/moment
          'moment/min/moment.min.js',

          // https://www.npmjs.com/package/moment-timezone
          'moment-timezone/builds/moment-timezone-with-data.min.js'
        ],
        dest: '<%= targetFolder %>/lib',
      },
      lib: {
        expand: true,
        cwd: 'lib',
        flatten: true,
        filter: 'isFile',
        src: [
          // https://github.com/monim67/bootstrap-datetimepicker
          'bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
          'bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css'
        ],
        dest: '<%= targetFolder %>/lib',
      },
      leaflet_images: {
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
      bootstrap_datetimepicker_images: {
        expand: true,
        cwd: 'lib',
        flatten: true,
        filter: 'isFile',
        src: [
          // https://github.com/monim67/bootstrap-datetimepicker
          'bootstrap-datetimepicker/images/clock-bg-sm.png',
        ],
        dest: '<%= targetFolder %>/images',
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
        src: ['src/index.html', 'src/namelist.input.html'],
        // index.html must be placed to root folder for GitHub Pages to work
        dest: './',             
        replacements: replacements('build')
      },
      build: {
        src: ['src/index.html', 'src/namelist.input.html'],
        dest: 'build/',             
        replacements: replacements('')
      },
      test: {
        src: ['src/test.html'],
        dest: 'test/',             
        replacements: replacements('/build')
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