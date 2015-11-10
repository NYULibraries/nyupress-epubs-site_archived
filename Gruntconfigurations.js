'use strict' ;

var grunt = require('grunt') ;

function project () {

  var projectConfiguration ;
  
  var projectConfigurationFile = __dirname + '/source/json/conf.json' ;
  
  if ( grunt.file.isFile ( projectConfigurationFile ) ) {
    projectConfiguration = grunt.file.readJSON ( projectConfigurationFile ) ;
  }
  
  return projectConfiguration ;

}

function gitclone () {

  var projectConfiguration = project () ;	
  
  var readiumDirectory =  ( projectConfiguration.readiumDirectory !== '' ) ? projectConfiguration.readiumDirectory : __dirname + '/build' ;

  return { 
    clone : {
      options : {
        repository : projectConfiguration.readiumRepositoryURL,
        branch : projectConfiguration.readiumRepositoryBranch,
        directory: readiumDirectory ,
        directoryName: projectConfiguration.readiumDirectoryName,
        booksDirectory: projectConfiguration.readiumBooksDirectory,
        clone : projectConfiguration.readiumCloneFromSource
      }
    }
  }
  
}

/** merge with compass */
function sass () {
  
  var sass_conf;
  
  if ( grunt.file.isFile( __dirname + '/source/json/sass.json' ) ) {
    sass_conf = grunt.file.readJSON( __dirname + '/source/json/sass.json' ) ;  
  }
  
  else {
	// default SASS configuration
    sass_conf = {
      sass : {
        build : "external", // options: inline,  external
	    // build : "external", // options: inline,  external
	    // for options; see: https://github.com/gruntjs/grunt-contrib-sass
	    options : {
          style : "expanded", // options: nested, compact, compressed, expanded
          debugInfo : false,
          lineNumbers : true,
          trace: false
        }
      }
    };  
  }
  
  return {
    dist: {
      options: sass_conf.sass.options,
      files: { 'build/css/style.css': __dirname + '/source/sass/style.scss' },
      build : sass_conf.sass.build
    }
  } ;

}

function js () {

  var js_conf;

  if ( grunt.file.isFile( __dirname + '/source/json/js.json' ) ) {
	js_conf = grunt.file.readJSON( __dirname + '/source/json/js.json' ) ;
  }
	  
  else {
    // default JS configuration
    js_conf = {
      js : {
        build : "external", // options: inline,  external
        style : "expanded" // options: compressed, expanded
	  }
    };  
  }
  
  return js_conf ;

}

function copy () {
  return {
    main: {
      files: [
        { expand: true, cwd: 'source/images', src: '**/*', dest: 'build/images' },
        { expand: true, cwd: 'source/css', src: '**/*', dest: 'build/css' }        
      ]
    }
  } ;
}

function clean () {
  return [ 
    __dirname + '/build'
  ] ;
}

function uglify () {
  function targetsCallback() {
    var targets = {};
    grunt.file.recurse(__dirname + '/source/js/', function callback (abspath, rootdir, subdir, filename) {
      if ( filename.match('.js') ) {
        targets['build/js/' + filename] = abspath ;
      }
    });
    return targets ;
  }
  return {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      compress: {}, // https://github.com/gruntjs/grunt-contrib-uglify/issues/298#issuecomment-74161370
      preserveComments: false
    },
    my_target: {
      files: targetsCallback()
    }
  };
}

function htmlminify () {

  var htmlminifyConfiguration = {} ;
		  
  var htmlminifyConfigurationFile = __dirname + '/source/json/htmlminify.json' ;
		  
  if ( grunt.file.isFile ( htmlminifyConfigurationFile ) ) {

    htmlminifyConfiguration = grunt.file.readJSON ( htmlminifyConfigurationFile ) ;
	    
    htmlminifyConfiguration = htmlminifyConfiguration.htmlminify
	    
  }
		  
  return htmlminifyConfiguration ;

}

exports.copy = copy ;
exports.clean = clean ;
exports.uglify = uglify ;
exports.js = js ;
exports.project = project ;
exports.sass = sass ;
exports.htmlminify = htmlminify ;
exports.gitclone = gitclone ;
