<?php 
$service = "http://discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress/select?&wt=json&fl=*&fq=id:";
$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$id = preg_replace( '%^(.+)/%', '', $url );
$json = file_get_contents( $service . $id );
$data = json_decode( $json, true );
$bookData = $data["response"]["docs"][0];
?>
<!doctype html>
<html>
<head>
  <title>NYU Press: Read online</title>
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
	 
	 <link rel="stylesheet" href="http://f660849f.ngrok.io/nyupress-epubs-site/css/bootstrap.css"> 
	 <link rel="stylesheet" href="http://f660849f.ngrok.io/nyupress-epubs-site/css/dlts.css">
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
</head>
<body class="page book" data-app="http://f660849f.ngrok.io/nyupress-epubs-site" data-readium="http://f660849f.ngrok.io/nyupress-epubs-site/NYUPressOA">
  <div class="header"><div class="header">
  <nav class="navbar" role="navigation" id="navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container">
        <header role="banner">
          <h2 id="logo-replace"><a href="http://f660849f.ngrok.io/nyupress-epubs-site" class="brand">NYU Press</a></h2>
          <h1 id="site-title"><a href="http://f660849f.ngrok.io/nyupress-epubs-site">Open Access Books</a></h1>
          <div class="social">
            <span class='st_facebook_large' st_url="http://f660849f.ngrok.io/nyupress-epubs-site/details/{{identifier}}" st_image="http://f660849f.ngrok.io/nyupress-epubs-site/NYUPressOA/{{thumbHref}}" st_summary="{{description}}" st_title="{{title}}" displayText='Facebook'></span>
            <span class='st_twitter_large' st_url="http://f660849f.ngrok.io/nyupress-epubs-site/details/{{identifier}}" st_image="http://f660849f.ngrok.io/nyupress-epubs-site/NYUPressOA/{{thumbHref}}" st_summary="{{description}}" st_title="{{title}}" st_via="" displayText='Tweet'></span>
            <span class='st_linkedin_large' st_url="http://f660849f.ngrok.io/nyupress-epubs-site/details/{{identifier}}" st_image="http://f660849f.ngrok.io/nyupress-epubs-site/NYUPressOA/{{thumbHref}}" st_summary="{{description}}" st_title="{{title}}" displayText='LinkedIn'></span>
            <span class='st_googleplus_large' st_url="http://f660849f.ngrok.io/nyupress-epubs-site/details/{{identifier}}" st_image="http://f660849f.ngrok.io/nyupress-epubs-site/NYUPressOA/{{thumbHref}}" st_summary="{{description}}" st_title="{{title}}" displayText='Google+ Share'></span>
          </div>
          <div class="n-utils">
            <button id="search-toggle" style="display:none">X</button>
            <form role="search" class="pure-form searchform" value="" method="get" action="http://f660849f.ngrok.io/nyupress-epubs-site/search" name="searchform" >
              <input class="searchbox pure-input" name="searchbox" id="searchbox"  type="text" placeholder="Search for books..." value="" size="30" maxlength="300">
                <!-- <button type="submit" class="pure-button">Search</button> -->
            </form>
          </div>
        </header>
      </div>
    </div>
  </nav>
</div></div>
  <iframe style="width:100%" allowfullscreen mozallowfullscreen webkitallowfullscreen seamless="seamless" frameBorder="0"></iframe>
    <footer id ="pagefooter">
      <div class="footer-inner">
        <ul>
          <li><span><a href="http://f660849f.ngrok.io/nyupress-epubs-site/about">About</a></span></li>
          <li><span><a href="http://f660849f.ngrok.io/nyupress-epubs-site/rights">Rights Information</a></span></li>
          <li id="nyup-link"><span><a href="http://nyupress.org/" target="_blank">NYU Press</a></span></li>
          <li id="dlts-link"><span>Powered by <a href="http://dlib.nyu.edu/dlts/"  target="_blank">NYU DLTS</a></span></li>
        </ul>
      </div>
    </footer>  <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
  <script type="text/javascript">stLight.options({publisher: "9f7e1ebf-93de-45e6-b1d3-6f81661f02ba", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
 <script src="http://f660849f.ngrok.io/nyupress-epubs-site/js/book.js"></script>
</body>
</html>
