YUI().use(
    'node', function(Y) {
        'use strict';

        var body = Y.one('body'),
            topOffsetHeight = Y.one('.header').get('offsetHeight'),
            footerHeight = (Y.one('footer').get('offsetHeight') + 5),
            iframe = Y.one('iframe'),
            match = location.pathname.match(/\/book\/(.*)/),
            viewport = Y.DOM.viewportRegion(),
            src;

        iframe.setStyles({
            top: topOffsetHeight,
            height: viewport.height - topOffsetHeight - footerHeight

        });
        console.log("footer height " + footerHeight);
        if (match && match[1]) {

            src = body.getAttribute('data-readium') + '/simpleviewer.html?epub=epub_content/' + encodeURIComponent(match[1]) + '&embedded=true';

        } else {
            src = body.getAttribute('data-app') + '/404.html';
        }

        iframe.set('src', src);
    }
);