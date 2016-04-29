/* jshint laxcomma: true, laxbreak: true, unused: false */
module.exports = function ( grunt ) {

  'use strict' ;

  var _ = require('underscore') ;

  var pkg = grunt.file.readJSON('package.json') ;
  
  var configuration = require('./Gruntconfigurations') ;

  var taskConfiguration = { pkg : pkg } ;

  // TODO: Need to get cloneReadium working again
  /** task to run */
  var tasks = [ 'clean', 'copy', 'uglify', 'writehtml'] ;

  _.each ( tasks , function ( task ) {

    var gruntTask = 'grunt-contrib-' + task ;

    /** configure task */
    if ( _.isFunction ( configuration[task] ) ) {
      taskConfiguration[task] = configuration[task]() ;
     
    }

    /** load modules and task */
    grunt.loadNpmTasks ( gruntTask ) ;

  } ) ;


  /** init Grunt */
  grunt.initConfig ( taskConfiguration ) ;

  // DISABLED
  // This repo is retired!
  // See:
  //     https://jira.nyu.edu/browse/NYUP-144
  //     "Set up new oa-books repo to take over gruntTaskToBuild branch of nyupress-epubs-site and archive nyupress-epubs-site"
  /** register Grunt tasks */
  // grunt.registerTask( 'default' , tasks) ;

  function disabled() {
    console.error(
        'This repo has been retired and replaced by '               +
        'https://github.com/NYULibraries/dlts-open-access-books.\n' +
        'See README.md for details.'
    );
  }

  grunt.registerTask( 'default' , disabled) ;

} ;
