<!doctype html>
<html>
<head>
  <title>NYU Press: Browse titles</title>
<!-- head -->
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7436432/628284/css/fonts.css" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta property="og:type" content="book">
<meta property="og:url" content="<?php echo $url ?>">
<meta property="og:title" content="<?php echo $bookData["title"] ?>">
<meta property="og:description" content="<?php echo $bookData["description"] ?>">
<meta property="og:image" content="<?php echo "http://openaccessbooks.nyupress.org/NYUPressOA/" . $bookData["thumbHref"] ?>">
<meta property="og:image:width" content="200">

<link rel="stylesheet" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/css/bootstrap.css"> 
<link rel="stylesheet" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/css/dlts.css">
<script src="http://yui.yahooapis.com/3.15.0/build/yui/yui-min.js"></script>
<script>
YUI().use('node', function(Y) {
    body = Y.one('body');

    function onSubmit(e) {
        e.preventDefault();

        var currentTarget = e.currentTarget,
            value = Y.one('.pure-input');
        location.href = currentTarget.get('action') + '/' + value.get('value');
    }

    var onClick = function(e) {
        e.preventDefault();

        var node = Y.one('.searchform'),
            nodeToggle = Y.one('#search-toggle'),
            nodeInput = Y.one('.searchbox'),
            isHidden = node.getStyle('display') == 'none';

        if (isHidden) {

            node.addClass('open');
            nodeToggle.addClass('open');
            nodeInput.focus();
        } else {
            node.removeClass('open');
            nodeToggle.removeClass('open');

        }
    };

    Y.one('#search-toggle').on('click', onClick);
    body.delegate('submit', onSubmit, 'form');
});
</script>
  <script id="list-template" type="text/x-handlebars-template">
  {{#items}}
      <div itemscope itemtype="http://schema.org/Book" class="library-item">
          <div class="img_hold">
          <a class="item-link" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/details/{{identifier}}"><img itemprop="image" class="img-responsive" src="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/NYUPressOA/{{thumbHref}}" alt="" title="{{title}}"/></a>
          </div>
        <div class="book-info">
          <h4 itemprop="name" class="book-title"><a class="item-link" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/details/{{identifier}}">{{title}}</a></h4>
          <div class="author">by <span itemprop="author">{{author}}</span></div>
          <div itemprop="description" class="description">{{description}}</div>
          <div class="buttons">
            <a class="btn btn-default" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/book/{{identifier}}">Read</a>
            <a class="btn btn-default" href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/details/{{identifier}}">View Details</a>
          </div>
       </div>
      </div>
    {{/items}}
  </script>  

  <!-- Google Analytics -->
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
  { (i[r].q=i[r].q||[]).push(arguments)}
  ,i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-51495518-1', 'nyupress.org');
  ga('send', 'pageview');
  </script></head>
<body class="home list-view" data-app="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site" data-discovery="http://discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress">
  <div class="header">
    <nav class="navbar" role="navigation" id="navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <header role="banner">
            <h2 id="logo-replace"><a href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site" class="brand">NYU Press</a></h2>
            <h1 id="site-title"><a href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site">Open Access Books</a></h1>
            <div class="n-utils">
              <button id="search-toggle" style="display:none">X</button>
              <form role="search" class="pure-form searchform" value="" method="get" action="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/search" name="searchform" >
                <input class="searchbox pure-input" name="searchbox" id="searchbox"  type="text" placeholder="Search for books..." value="" size="30" maxlength="300">
                  <!-- <button type="submit" class="pure-button">Search</button> -->
              </form>
            </div>
          </header>
        </div>
      </div>
    </nav>
  </div>  <div class="content-wrapper">
      <div class="data-container" role="main">
        <div class="intro">
        <p>NYU Press is pleased to offer these books in an open access platform for reading on desktop and mobile devices. We will continue to contribute new titles each year. <a href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/about">Read more...</a></p>
        <p>This site is in beta release. As of June 2014, it is best viewed using the Chrome or Safari browsers. We are at work optimizing it for other browsers and developing more features. </p></div>
        <h2 class="page-title">Browse all titles</h2>
        <div id="a" class="library-items" data-page="1" data-pages="1"></div>
      </div>
      <ul class="pure-paginator"></ul>
      

  <div class="pure-g container more-books">
    <div class="pure-u-1">
      <a href="#" class="pure-button loading">More books</a>
    </div>
  </div>

        <footer id ="pagefooter">
          <div class="footer-inner">
            <ul>
              <li><span><a href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/about">About</a></span></li>
              <li><span><a href="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/rights">Rights Information</a></span></li>
              <li id="nyup-link"><span><a href="http://nyupress.org/" target="_blank">NYU Press</a></span></li>
              <li id="dlts-link"><span>Powered by <a href="http://dlib.nyu.edu/dlts/"  target="_blank">NYU DLTS</a></span></li>
            </ul>
          </div>
        </footer>  </div>
  <script>YUI().use("node","event","io","node-scroll-info","handlebars","json-parse","jsonp","jsonp-url","gallery-idletimer",function(Y){"use strict";var body=Y.one("body"),container=Y.one("#a"),query=Y.one(".query"),loadMoreButton=Y.one(".pure-button.loading"),datasourceURL=body.getAttribute("data-discovery")+"/select?&wt=json&json.wrf=callback={callback}&hl=true&hl.fl=title,description,text&fl=title,description,author,identifier,coverHref,thumbHref",searchString="*:*",transactions=[],pager=Y.one("ul.pure-paginator"),fold=200,source=Y.one("#list-template").getHTML(),template=Y.Handlebars.compile(source);function onFailure(){Y.log("onFailure")}function onTimeout(){onFailure()}function onClick(e){e.preventDefault();onScroll()}function onPaginatorAvailable(){if(this.get("region").top-fold<body.get("winHeight")){onScroll()}}function onSubmit(e){e.preventDefault();var currentTarget=e.currentTarget,value=Y.one(".pure-input");location.href=currentTarget.get("action")+"/"+value.get("value")}function onScroll(){var numfound=0,start=0,docslength=0,next=0,href;if(body.hasClass("io-done"))return;numfound=parseInt(container.getAttribute("data-numfound"),10);start=parseInt(container.getAttribute("data-start"),10);docslength=parseInt(container.getAttribute("data-docslength"),10);next=start+docslength;if(next<=numfound){href=datasourceURL+"&start="+next;if(Y.Array.indexOf(transactions,href)<0&&!body.hasClass("io-loading")){if(body.scrollInfo.getScrollInfo().atBottom||Y.IdleTimer.isIdle()&&pager.get("region").top-fold<body.get("winHeight")){body.addClass("io-loading");Y.jsonp(href,{on:{success:onSuccess,failure:onFailure,timeout:onTimeout},timeout:3e3})}}}}function onSuccess(response){try{var numfound=parseInt(response.response.numFound,10),start=parseInt(response.response.start,10),docslength=parseInt(response.response.docs.length,10);transactions.push(this.url);container.setAttribute("data-numFound",numfound);container.setAttribute("data-start",start);container.setAttribute("data-docsLength",docslength);container.append(template({items:response.response.docs}));if(start+docslength===numfound)body.addClass("io-done");body.removeClass("io-loading");loadMoreButton.removeClass("pure-button-disabled")}catch(e){Y.log("error")}}Y.IdleTimer.subscribe("idle",onScroll);Y.IdleTimer.start(5e3);body.plug(Y.Plugin.ScrollInfo,{scrollMargin:fold});body.scrollInfo.on({scroll:onScroll});Y.jsonp(datasourceURL,{on:{success:onSuccess,failure:onFailure,timeout:onTimeout},timeout:3e3});loadMoreButton.on("click",onClick);body.delegate("submit",onSubmit,"form");pager.on("available",onPaginatorAvailable)});</script>
</body>
</html>
