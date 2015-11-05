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
  , 'dlts-util'
  , function ( Y ) {

    'use strict';

    var body = Y.one('body')
      , container = Y.one('.library-items')
      , query = Y.one('.query')
      , loadMoreButton = Y.one('.pure-button.loading')
      , totalFound = Y.one('.total-found')
      , itemsFoundText = Y.one('.items-found')
      , datasourceURL = body.getAttribute('data-discovery') + '/select?&wt=json&json.wrf=callback={callback}&hl=true&hl.fl=title,description,text&fl=title,description,author,identifier,coverHref,thumbHref&q='
      , searchString = '*:*'
      , transactions = []
      , href, pager = Y.one('ul.pure-paginator')
      , fold = 200
      , match = location.pathname.match(/\/search\/(.*)/)
      , source = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source);

    Y.Handlebars.registerHelper('truncate', Y.DltsUtil.truncate);
    if ( ! Y.DltsUtil.truncate_page_path ) {
        var body_data = body.getData()
            , root = body_data.app
            , page_path = root + '/details';

        Y.DltsUtil.truncate_page_path = page_path;
    }

    function onSubmit(e) {

        e.preventDefault();

        var currentTarget = e.currentTarget,
        value = Y.one('.pure-input');

        location.href = currentTarget.get('action') + '/' + value.get('value');
    }

    function onFailure() {}

    function onTimeout() {}

    function onClick(e) {
        e.preventDefault();
        onScroll();
    }

    function onPaginatorAvailable() {
        if (this.get('region').top - fold < body.get('winHeight')) {
        onScroll();
        }
    }

    function onScroll(e) {

        if (body.hasClass('io-done')) return;

        var numfound = parseInt(container.getAttribute("data-numfound"), 10),
        start = parseInt(container.getAttribute("data-start"), 10),
        docslength = parseInt(container.getAttribute("data-docslength"), 10);

        if (
        start + docslength <= numfound
        ) {

        href = datasourceURL + searchString + '&start=' + (start + docslength);

        if (Y.Array.indexOf(transactions, href) < 0 && !body.hasClass('io-loading')) {

            if (
            body.scrollInfo.getScrollInfo().atBottom ||
            (
                Y.IdleTimer.isIdle() && pager.get('region').top - fold < body.get('winHeight')
            )
            ) {

            body.addClass('io-loading');

            loadMoreButton.addClass('pure-button-disabled');

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

    function onSuccess(response) {
        try {

        var numfound = parseInt(response.response.numFound, 10),
            start = parseInt(response.response.start, 10),
            docslength = parseInt(response.response.docs.length, 10);

        // store response url to avoid making multiple request to the same source
        transactions.push(this.url);

        container.setAttribute("data-numFound", numfound);

        container.setAttribute("data-start", start);

        container.setAttribute("data-docsLength", docslength);

        // set the number of items found
        totalFound.set('text', numfound);
        // plural or singular book
        itemsFoundText.set('text', ((numfound == "1" ? 'book' : 'books')));
        // show the number of items found
        totalFound.removeClass('hidden');

        // highlighting object in Solr is not part of the document; find the document
        // and add the highlight slash
        Y.each(response.response.docs, function(item, index) {

            if (response.highlighting && response.highlighting[item.identifier].description) {
            response.response.docs[index].slash = response.highlighting[item.identifier].description[0];
            } else {
            response.response.docs[index].slash = response.response.docs[index].description;
            }

        });

        // render HTML and append to container
        container.append(
            template({
            items: response.response.docs
            })
        );

        if (start + docslength === numfound) body.addClass('io-done');

        body.removeClass('io-loading');

        loadMoreButton.removeClass('pure-button-disabled');

        } catch (e) {
        Y.log('error');
        }
    }

    Y.IdleTimer.subscribe('idle', onScroll);

    // be opportunistic
    Y.IdleTimer.start(5000);

    // Plug ScrollInfo 
    body.plug(Y.Plugin.ScrollInfo, { scrollMargin: fold });

    body.scrollInfo.on({ scroll: onScroll });

    // test for query string
    if (match && match[1]) {

        // query string found
        searchString = decodeURIComponent(match[1].toLowerCase());

        // update the title of the page
        query.set('text', searchString);
    } else {
        // update the title of the page
        query.set('text', 'All titles');
    }

    // make the first request
    Y.jsonp(datasourceURL + searchString, { on: { success: onSuccess, failure: onFailure, timeout: onTimeout }, timeout: 3000 } ) ;

    loadMoreButton.on('click', onClick);
    
    body.delegate('submit', onSubmit, 'form');
    
    pager.on('available', onPaginatorAvailable);

} ) ;
