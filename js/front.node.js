YUI().use(
    'node'
  , 'event'
  , 'node-scroll-info'
  , 'io-queue'
  , 'handlebars'
  , 'json-parse'
  , 'gallery-idletimer'
  , function (Y) {

    'use strict'

    var datasourceURL = 'http://localhost:3000?page='
      , body = Y.one('body')
      , container = Y.one('#a')
      , form = Y.one('pure-form')
      , transactions = []
      , href = datasourceURL + '1'
      , pager = Y.one('ul.pure-paginator')
      , fold = 200

      
      // Extract the template string and compile it into a reusable function.
      , source   = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source)

    function onStart(id, response) {
        body.addClass('io-loading')
    }
    
    function onEnd(id, response) {
        body.removeClass('io-loading')
    }
    
    function onSubmit(e) {
        
        e.preventDefault()
        
        var currentTarget = e.currentTarget
          , value = Y.one('.pure-input')
        
        location.href = currentTarget.get('action') + '/' + value.get('value')
    }
    
    function onClick(e) {
        e.preventDefault()
        onScroll()
    }
    
    function onPaginatorAvailable() {
        if (this.get('region').top - fold < body.get('winHeight')) onScroll()
    }

    function onScroll(e) {
        
        var page = container.getAttribute("data-page")
          , pages = container.getAttribute("data-pages")
          , next = (page <= pages) ? (page + 1) : 0
          
          
        href = datasourceURL + page

        if (next) {
	  
	        if (Y.Array.indexOf(transactions, href) < 0 && !body.hasClass('io-loading')) {
                if (
                    body.scrollInfo.getScrollInfo().atBottom ||
                    (
                        Y.IdleTimer.isIdle() && pager.get('region').top - fold < body.get('winHeight')
                    )
                ) {
                    Y.io.queue(href)
                }
            }

        }
    }

    function onSuccess(transactionid, response) {

        var parsedResponse

        // store called to avoid making the request multiple times
        transactions.push(href)     

        try {

            parsedResponse = Y.JSON.parse(response.responseText)

            container.setAttribute("data-pages", parsedResponse.pages)

            container.setAttribute("data-page", parsedResponse.page + 1)

            container.append(
              template({ 
                items: parsedResponse.articles
              })
            )

        }
        catch (e) {
          
        }
    }

    function onFailure() {
        
        Y.io('./404.html', { on : { success : function(transactionid, response) { container.append(response.response) } } } )
        
    }

    Y.IdleTimer.subscribe('idle', onScroll)

    // be opportunistic
    Y.IdleTimer.start(5000)

    // Plug ScrollInfo 
    body.plug(Y.Plugin.ScrollInfo, { scrollMargin: fold })

    body.scrollInfo.on({ scroll: onScroll })

    Y.on('available', onPaginatorAvailable, 'ul.pure-paginator')

    // Subscribe to "io:start".
    Y.on('io:start', onStart, Y, transactions)

    // Subscribe to "io.success".
    Y.on('io:success', onSuccess, Y, transactions)

    // Subscribe to "io.failure".
    Y.on('io:failure', onFailure, Y, transactions)

    // Subscribe to "io.end".
    Y.on('io:end', onEnd, Y, transactions)

    body.delegate('click', onClick, '.pager-next a')
    
    body.delegate('submit', onSubmit, 'form')    

})