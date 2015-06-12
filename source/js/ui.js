YUI().use('node', function(Y) {

  var body = Y.one('body');

  function onSubmit(e) {
  
    e.preventDefault() ;

    var currentTarget = e.currentTarget ;
    var value = Y.one('.pure-input') ;
    
    location.href = currentTarget.get('action') + '/' + value.get('value') ;
    
  }

  function onClick (e) {

    e.preventDefault() ;

    var node = Y.one('.searchform') ;

    var nodeToggle = Y.one('#search-toggle') ;

    var nodeInput = Y.one('.searchbox') ;
    
    var isHidden = node.getStyle('display') == 'none' ; // ?

    if ( isHidden ) {
      node.addClass('open') ;
      nodeToggle.addClass('open') ;
      nodeInput.focus() ;
    }
    else {
      node.removeClass('open') ;
      nodeToggle.removeClass('open') ;
    }
  }

  Y.one('#search-toggle').on('click', onClick) ;
  
  body.delegate('submit', onSubmit, 'form') ;

} ) ;