YUI().use(
    'node'
  , function (Y) {
  
    'use strict'  

    var body = Y.one('body')
      , topOffsetHeight = Y.one('.home-menu').get('offsetHeight')
      , iframe = Y.one('iframe')
      , match = location.pathname.match(/\/book\/(.*)/)
      , viewport = Y.DOM.viewportRegion()
      , src
    
    iframe.setStyles({
      top: topOffsetHeight,
      height: viewport.height - topOffsetHeight
    })

    if (
        match 
        && 
        match[1]
    ) {

        src = body.getAttribute('data-readium') + '/simpleviewer.html?epub=epub_content/' + encodeURIComponent(match[1]) + '&embedded=true'

    }
    else {
        src = body.getAttribute('data-app') + '/404.html'
    }
    
    iframe.set('src', src)

})