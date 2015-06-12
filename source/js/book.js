YUI().use( 
    'node'
  , function ( Y ) {
  
  'use strict' ;

  var body = Y.one('body') ;
  
  var topOffsetHeight = Y.one('.header').get('offsetHeight') ;
  
  var footerHeight = ( Y.one('footer').get('offsetHeight') + 5 ) ;
  
  var iframe = Y.one('iframe') ;
  
  var match = location.pathname.match(/\/book\/(.*)/) ;
  
  var viewport = Y.DOM.viewportRegion() ;

  var src ;

  iframe.setStyles( {
    top: topOffsetHeight,
    height: viewport.height - topOffsetHeight - footerHeight
  } ) ;

  if ( match && match[1] ) {

    src = body.getAttribute('data-readium') + '/simpleviewer.html?epub=epub_content/' + encodeURIComponent(match[1]) + '&embedded=true';

  } 
  else {
    src = body.getAttribute('data-app') + '/404.html';
  }

  iframe.set('src', src);

} ) ;
