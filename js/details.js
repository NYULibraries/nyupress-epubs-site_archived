YUI().use(
    'node'
  , 'event'
  , 'io'
  , 'jsonp'
  , 'jsonp-url'  
  , 'json-parse'
  , 'handlebars'
  , function (Y) {
  
    'use strict'  
  
    var datasourceURL = 'http://localhost:3000/book/'
      , datasourceURL = 'http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress/select?&wt=json&json.wrf=callback={callback}&fl=*&fq=id:'
      , body = Y.one('body')
      , container = Y.one('.data-container')
      , match = location.pathname.match(/\/details\/(.*)/)      
      , source   = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source)

    function onFailure() {
        Y.io('../404.html', { on : { success : function(transactionid, response) { container.append(response.response) } } } )
    }
    
    function onTimeout() {
      onFailure()
    }    

    function onSuccess(response) {

        try {

            container.append(
              template({
                items: response.response.docs
              })
            )
            
            body.removeClass('io-loading')

        }
        catch (e) {
            onFailure()
        }
    }      

    if (match && match[1]) { 
        
        body.addClass('io-loading')
        
        Y.jsonp(datasourceURL + encodeURIComponent( match[1] ), {
            on: {
                success: onSuccess,
                failure: onFailure,
                timeout: onTimeout
             },
             timeout: 3000
         })    
     }
     else {
         onFailure()
     }

})