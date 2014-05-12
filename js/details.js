YUI().use(
    'node'
  , 'event'
  , 'io'
  , 'jsonp'
  , 'jsonp-url'  
  , 'json-parse'
  , 'handlebars'
  , function (Y) {
  
    var datasourceURL = 'http://localhost:3000/book/'
      , datasourceURL = 'http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress/select?&wt=json&json.wrf=callback={callback}&fl=*&fq=id:'
      , body = Y.one('body')
      , container = Y.one('.data-container')
      , transactions = []
      , patt = /\/details\/(.*)/
      , match = location.pathname.match(patt)      
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

    function onSuccess(response) {

        try {
            
            container.append(
              template({
                items: response.response.docs
              })
            )

        }
        catch (e) {

        }
    }      

    // Subscribe to "io:start".
    Y.on('io:start', onStart)

    // Subscribe to "io.success".
    Y.on('io:success', onSuccess)

    // Subscribe to "io.failure".
    Y.on('io:failure', onFailure)

    // Subscribe to "io.end".
    Y.on('io:end', onEnd)
    
    if (match && match[1]) { 
        Y.jsonp(datasourceURL + encodeURIComponent( match[1] ), {
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
     else {
         onFailure()
     }

})