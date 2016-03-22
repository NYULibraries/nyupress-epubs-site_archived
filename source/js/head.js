YUI().use('node', function(Y) {

  'use strict' ;
  
  function onSubmit ( e ) {

    e.preventDefault();

    var currentTarget = e.currentTarget,
        value = Y.one('.pure-input');
        
    location.href = currentTarget.get('action') + '/' + value.get('value') ;
    
  }

  function onClick ( e ) {

    e.preventDefault();

        var node = Y.one('.searchform'),
            nodeToggle = Y.one('#search-toggle'),
            nodeInput = Y.one('.searchbox'),
            isHidden = node.getStyle('display') == 'none';

        if (isHidden) {

            node.addClass('open');
            nodeToggle.addClass('open');
            nodeInput.focus();
        } else {
            node.removeClass('open');
            nodeToggle.removeClass('open');

        }
    };

    Y.one('#search-toggle').on('click', onClick) ;
    
    Y.one('body').delegate('submit', onSubmit, 'form') ;
    
} ) ;
