YUI().use(
    'node'
  , 'event-base'
  , 'event'
  , 'io'
  , 'node-scroll-info'
  , 'handlebars'
  , 'json-parse'
  , 'jsonp'
  , 'jsonp-url'
  , 'gallery-idletimer'
  , function ( Y ) {

    'use strict';

    var body = Y.one('body') ;
    
    var container = Y.one('#a') ;
    
    var query = Y.one('.query') ;
    
    var loadMoreButton = Y.one('.pure-button.loading') ;
    
    var datasourceURL = body.getAttribute('data-discovery') + '/select?&wt=json&json.wrf=callback={callback}&hl=true&hl.fl=title,description,text&fl=title,description,author,identifier,coverHref,thumbHref' ;
    
    var searchString = '*:*' ;
    
    var transactions = [] ;
    
    var pager = Y.one('ul.pure-paginator') ;
    
    var fold = 200 ;
    
    var source = Y.one('#list-template').getHTML() ;
    
    var template = Y.Handlebars.compile(source) ;

    function onFailure() { }

    function onTimeout() {
      onFailure() ;
    }

    function onClick ( e ) {
      e.preventDefault() ;
      onScroll() ;
    }

    var onPaginatorAvailable = function ( ) {
      
      var fold = 200 ;

      if ( Y.one('ul.pure-paginator').get('region').top - fold < Y.one('body').get('winHeight') ) {    	  
        onScroll() ;
      }

    }

    function onSubmit(e) {

      e.preventDefault();

      var currentTarget = e.currentTarget ;
      
      var value = Y.one('.pure-input') ;

      location.href = currentTarget.get('action') + '/' + value.get('value') ;

    }

    function onScroll() {

            var numfound = 0,
                start = 0,
                docslength = 0,
                next = 0,
                href;

            if (body.hasClass('io-done')) return;

            numfound = parseInt(container.getAttribute("data-numfound"), 10);

            start = parseInt(container.getAttribute("data-start"), 10);

            docslength = parseInt(container.getAttribute("data-docslength"), 10);

            next = (start + docslength);

            if (
                next <= numfound
            ) {

                href = datasourceURL + '&start=' + next;

                if (Y.Array.indexOf(transactions, href) < 0 && !body.hasClass('io-loading')) {

                    if (
                        body.scrollInfo.getScrollInfo().atBottom ||
                        (
                            Y.IdleTimer.isIdle() && pager.get('region').top - fold < body.get('winHeight')
                        )
                    ) {

                        body.addClass('io-loading');

                        Y.jsonp(href, {
                            on: {
                                success: onSuccess,
                                failure: onFailure,
                                timeout: onTimeout
                            },
                            timeout: 3000
                        });

                    }
                }

            }

        }

        function onSuccess ( response ) {

            try {

                var numfound = parseInt(response.response.numFound, 10) ;
                
                var start = parseInt(response.response.start, 10) ;
                
                var docslength = parseInt(response.response.docs.length, 10) ;

                // store called to avoid making the request multiple times
                transactions.push(this.url) ;

                container.setAttribute("data-numFound", numfound) ;

                container.setAttribute("data-start", start) ;

                container.setAttribute("data-docsLength", docslength) ;
                
                console.log ( response.response.docs ) ;

                // render HTML and append to container
                container.append (
                    template( {
                        items: response.response.docs
                    } )
                ) ;

                if (start + docslength === numfound) body.addClass('io-done');

                body.removeClass('io-loading');

                loadMoreButton.removeClass('pure-button-disabled');

            } 
            catch (e) {
                Y.log('error'); // leave here for now
            }
        }

        Y.IdleTimer.subscribe('idle', onScroll);

        // be opportunistic
        Y.IdleTimer.start(5000);

        // Plug ScrollInfo 
        body.plug(Y.Plugin.ScrollInfo, {
            scrollMargin: fold
        });

        body.scrollInfo.on({
            scroll: onScroll
        });

        // make the first request
        Y.jsonp(datasourceURL, {
            on: {
                success: onSuccess,
                failure: onFailure,
                timeout: onTimeout
            },
            timeout: 3000
        });

        loadMoreButton.on('click', onClick);

        body.delegate('submit', onSubmit, 'form');

        Y.on('domready', onPaginatorAvailable ) ;

} ) ;