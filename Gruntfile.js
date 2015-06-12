/* jshint laxcomma: true, laxbreak: true, unused: false */
module.exports = function ( grunt ) {

  var _ = require('underscore') ;
  
  var pkg = grunt.file.readJSON('package.json') ;
  
  var configuration = require('./Gruntconfigurations') ;

  var taskConfiguration = { pkg : pkg } ;
  
  /** task to run */
  // var tasks = [ 'clean', 'copy', 'gitclone', 'uglify', 'writeHTML' ] ;
  
  var tasks = [ 'clean', 'copy', 'uglify', 'writeHTML' ] ;
  
  _.each ( tasks , function ( task ) {
	  
	var gruntTask = '' ;

    var gruntTaskPrefix = 'grunt-contrib-' ;

    /** configure task */    
    if ( _.isFunction ( configuration[task] ) ) {
      taskConfiguration[task] = configuration[task]() ;
    }
    
    /** because some people just don't follow conventions */
    if ( task === 'gitclone' ) gruntTask = 'grunt-git' ;
    
    else gruntTask = gruntTaskPrefix + task ;
    
    /** load modules and task */
    grunt.loadNpmTasks( gruntTask ) ;
  
  } ) ;
  
  /** init Grunt */
  grunt.initConfig ( taskConfiguration ) ;
  
  /** register Grunt tasks */
  grunt.registerTask('default', tasks) ;
  
} ;
