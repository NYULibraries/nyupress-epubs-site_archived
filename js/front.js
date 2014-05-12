YUI().use(
    'node'
  , 'event'
  , 'io'
  , 'node-scroll-info'
  , 'handlebars'
  , 'json-parse'
  , 'jsonp'
  , 'jsonp-url'  
  , 'gallery-idletimer'
  , function (Y) {

    'use strict'

    var datasourceURL = 'http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress/select?&wt=json&json.wrf=callback={callback}&hl=true&hl.fl=title,description,text&fl=title,description,author,identifier,coverHref'
      , body = Y.one('body')
      , container = Y.one('#a')
      , query = Y.one('.query')
      , searchString = '*:*'
      , transactions = []
      , href
      , pager = Y.one('ul.pure-paginator')
      , fold = 200
      , patt = /\/search\/(.*)/
      , match = location.pathname.match(patt)      
      , source   = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source)
      
      // Extract the template string and compile it into a reusable function.
      , source   = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source)

    function onFailure() {
        Y.io('../404.html', { on : { success : function(transactionid, response) { container.append(response.response) } } } )
    }
    
    function onTimeout() {
      onFailure()
    }

    function onStart(id, response) {
        body.addClass('io-loading')
    }
    
    function onEnd(id, response) {
        body.removeClass('io-loading')
    }
    
    function onClick(e) {
        e.preventDefault()
        onScroll()
    }
    
    function onPaginatorAvailable() {
        if (this.get('region').top - fold < body.get('winHeight')) onScroll()
    }

    function onSubmit(e) {
        
        e.preventDefault()
        
        var currentTarget = e.currentTarget
          , value = Y.one('.pure-input')
        
        location.href = currentTarget.get('action') + '/' + value.get('value')
    }    
    
    function onScroll(e) {
        
        var numfound = parseInt(container.getAttribute("data-numfound"), 10)
          , start = parseInt(container.getAttribute("data-start"), 10)
          , docslength = parseInt(container.getAttribute("data-docslength"), 10)

        if (
          start + docslength < numfound
        ) {
            
            href = datasourceURL + '&start=' + ( start + docslength )
            
	        if (Y.Array.indexOf(transactions, href) < 0 && !body.hasClass('io-loading')) {
                
                if (
                    body.scrollInfo.getScrollInfo().atBottom ||
                    (
                        Y.IdleTimer.isIdle() && pager.get('region').top - fold < body.get('winHeight')
                    )
                ) {

                  Y.jsonp(href, {
                    on: {
                      success: onSuccess,
                      failure: onFailure,
                      start: onStart,
                      end: onEnd,         
                      timeout: onTimeout
                    },
                    timeout: 3000
                  })

                }
            }

        }
    }

    function onSuccess(response) {

        try {
        
             // store called to avoid making the request multiple times
             transactions.push(href)

             container.setAttribute("data-numFound", response.response.numFound)

             container.setAttribute("data-start", response.response.start)

             container.setAttribute("data-docsLength", response.response.docs.length)
             
             // highlighting object in Solr is not part of the document; find the document
             // and add the highlight slash
             Y.each(response.response.docs, function(item, index) {
             
                 response.response.docs[index].slash = response.response.docs[index].description

             })
            
            // render HTML and append to container
            container.append(
              template({
                items: response.response.docs
              })
            )

        }
        catch (e) {
            Y.log('error')
        }
    }

    Y.IdleTimer.subscribe('idle', onScroll)

    // be opportunistic
    Y.IdleTimer.start(5000)

    // Plug ScrollInfo 
    body.plug(Y.Plugin.ScrollInfo, { scrollMargin: fold })

    body.scrollInfo.on({ scroll: onScroll })

    Y.on('available', onPaginatorAvailable, 'ul.pure-paginator')

    // Subscribe to "io:start".
    Y.on('io:start', onStart)

    // Subscribe to "io.success".
    Y.on('io:success', onSuccess)

    // Subscribe to "io.failure".
    Y.on('io:failure', onFailure)

    // Subscribe to "io.end".
    Y.on('io:end', onEnd)

    // set the request URL
    href = datasourceURL
     
    // make the first request
    Y.jsonp(href, {
        on: {
            success: onSuccess,
            failure: onFailure,
            start: onStart,
            end: onEnd,         
            timeout: onTimeout
        },
        timeout: 3000
    })
    
    body.delegate('submit', onSubmit, 'form')     

})