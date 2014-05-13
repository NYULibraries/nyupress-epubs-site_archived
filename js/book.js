YUI().use(
    'node'
  , function (Y) {
  
    'use strict'  

    var topOffsetHeight = Y.one('.home-menu').get('offsetHeight')
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

        src = 'http://dev-dl-pa.home.nyu.edu/NYUPressOA/simpleviewer.html?epub=epub_content/' + encodeURIComponent(match[1]) + '&embedded=true'

    }
    else {
        src = '../404.html'
    }
    
    iframe.set('src', src)

})