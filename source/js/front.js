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
  , 'escape'
  , 'dlts-util'
  , function ( Y ) {

    'use strict';
    
    var body = Y.one('body')
      , container = Y.one('.library-items')
      , query = Y.one('.query')
      , loadMoreButton = Y.one('.pure-button.loading')
      , collectionCode = body.getAttribute('data-collection-code')
      , datasourceURL = body.getAttribute('data-discovery') +
                        '/select?'                          +

                        'qt=dismax'                         +
                        '&'                                 +
                        'qf=collection_code'                +
                        '&'                                 +
                        'q=' + collectionCode               +

                        '&'                                 +
                        'wt=json'                           +
                        '&'                                 +
                        'json.wrf=callback={callback}'      +
                        '&'                                 +
                        'hl=true'                           +
                        '&'                                 +
                        'hl.fl=title,description,text'      +
                        '&'                                 +
                        'fl='                               +
                            'title,'                        +
                            'subtitle,'                     +
                            'description,'                  +
                            'author,'                       +
                            'identifier,'                   +
                            'coverHref,'                    +
                            'thumbHref'                     +

                        '&'                                 +
                        'sort=author_sort+asc,title_sort+asc'
      , searchString = '*:*'
      , transactions = []
      , pager = Y.one('ul.pure-paginator')
      , fold = 200
      , source = Y.one('#list-template').getHTML()
      , template = Y.Handlebars.compile(source);

    Y.Handlebars.registerHelper('truncate', Y.DltsUtil.truncate);
    if ( ! Y.DltsUtil.truncate_page_path ) {
      var body_data = body.getData()
          , root = body_data.app
          , page_path = root + '/details';

      Y.DltsUtil.truncate_page_path = page_path;
    }

    function onScroll() {

      var numfound = 0
        , start = 0
        , docslength = 0
        , next = 0
        , href;

      if ( body.hasClass('io-done') ) return ;

      numfound = parseInt(container.getAttribute("data-numfound"), 10);

      start = parseInt(container.getAttribute("data-start"), 10);

      docslength = parseInt(container.getAttribute("data-docslength"), 10);

      next = (start + docslength);

      if ( next <= numfound ) {

        href = datasourceURL + '&start=' + next;

        if ( Y.Array.indexOf(transactions, href) < 0 && !body.hasClass('io-loading')) {

          if ( body.scrollInfo.getScrollInfo().atBottom || ( Y.IdleTimer.isIdle() && pager.get('region').top - fold < body.get('winHeight') ) ) {

            body.addClass('io-loading');

            Y.jsonp( href, { on: { success: onSuccess, failure: onFailure, timeout: onTimeout }, timeout: 3000 } ) ;

          }
        }

      }

    }

    function onFailure() { }

    function onTimeout() { }

    function onClick( e ) {
      e.preventDefault();
      onScroll();
    }

    function onPaginatorAvailable() {
      if ( this.get('region').top - fold < body.get('winHeight') ) {
        onScroll();
      }
    }

    function onSubmit(e) {

      e.preventDefault();

      var currentTarget = e.currentTarget,
          value = Y.one('.pure-input');

      location.href = currentTarget.get('action') + '/' + value.get('value');
    }

    function onSuccess ( response ) {
    
      try {

      var numfound = parseInt(response.response.numFound, 10)
        , start = parseInt(response.response.start, 10)
        , docslength = parseInt(response.response.docs.length, 10)
        , docs = response.response.docs
        , href = Y.Node.create('<a href> ...</a>')
        , description
        , descriptionLength
        , node ;

      // store called to avoid making the request multiple times
      transactions.push(this.url);

      container.setAttribute("data-numFound", numfound) ;

      container.setAttribute("data-start", start) ;

      container.setAttribute("data-docsLength", docslength) ;
      
      // render HTML and append to container
      container.append ( template ( { items: response.response.docs } ) ) ;
    
      if ( start + docslength === numfound ) body.addClass('io-done') ;

      body.removeClass('io-loading');

      loadMoreButton.removeClass('pure-button-disabled');

      } catch (e) {
        Y.log('error'); // leave here for now
      }
    }

    Y.IdleTimer.subscribe('idle', onScroll);

    // be opportunistic
    Y.IdleTimer.start(5000);

    // Plug ScrollInfo 
    body.plug ( Y.Plugin.ScrollInfo, { scrollMargin: fold } ) ;

    body.scrollInfo.on( { scroll: onScroll } ) ;

    loadMoreButton.on('click', onClick);

    body.delegate('submit', onSubmit, 'form');

    pager.on('available', onPaginatorAvailable);
    
    // make the first request
    Y.jsonp ( datasourceURL, { on: { success: onSuccess, failure: onFailure, timeout: onTimeout }, timeout: 3000 } ) ;

} ) ;
