YUI().use(
    'node'
  , 'event'
  , 'io'
  , 'json-parse'
  , 'handlebars'
  , function (Y) {
  
    var datasourceURL = 'http://localhost:3000/book/'
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

    function onStart(id, response) {
        body.addClass('io-loading')
    }
    
    function onEnd(id, response) {
        body.removeClass('io-loading')
    }

    function onSuccess(transactionid, response) {

        var parsedResponse

        try {

            parsedResponse = Y.JSON.parse(response.responseText)
            
            container.append(
              template({
                items: parsedResponse.article
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
        Y.io(datasourceURL + encodeURIComponent( match[1] ) )
     }
     else {
         onFailure()
     }

})