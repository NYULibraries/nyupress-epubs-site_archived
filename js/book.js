YUI().use(
    'node'
  , 'event'
  , function (Y) {

    var body = Y.one('body')
      , iframe = Y.one('iframe')
      , transactions = []
      , patt = /\/book\/(.*)/
      , match = location.pathname.match(patt)
      , viewport = Y.DOM.viewportRegion()
      , bookURL
    
    if (match && match[1]) {

        bookURL = 'http://localhost:8080/?epub=epub_content/' + encodeURIComponent(match[1]) + '&embedded=true'

        iframe.set('src', bookURL)

        iframe.setStyles({
            top: Y.one('.home-menu').get('offsetHeight'),
            position: "fixed",
            border: "none",      
            height: viewport.height - Y.one('.home-menu').get('offsetHeight')
        })

    }
    else {
        Y.io('../404.html', { on : { success : function(transactionid, response) { container.append(response.response) } } } )
    }

})