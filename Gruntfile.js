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

  /** register Grunt tasks */
  grunt.registerTask( 'default' , tasks) ;

} ;
