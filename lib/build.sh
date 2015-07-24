#!/bin/bash

umask 002

# no trailing slash
#APP_URL="localhost/nyupress-epubs-site"
APP_URL="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site"
#APP_URL="http://openaccessbooks.nyupress.org"

#READIUM_URL="localhost/nyupress-epubs-site/NYUPressOA"
READIUM_URL="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site/NYUPressOA"
#READIUM_URL="http://openaccessbooks.nyupress.org/NYUPressOA"


#DISCOVERY_URL="http://dev-discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress"
DISCOVERY_URL="http://discovery.dlib.nyu.edu:8080/solr3_discovery/nyupress"

SEARCH_JS=`uglifyjs ../js/search.js`

FRONT_JS=`uglifyjs ../js/front.js`

BOOK_JS=`uglifyjs ../js/book.js`

DETAILS_JS=`uglifyjs ../js/details.js`

ABOUT_DATA=" { title : 'About', appUrl: '$APP_URL'  } "

RIGHTS_DATA=" { title : 'Rights', appUrl: '$APP_URL'} "

FRONT_DATA=" { title : 'Browse titles', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$FRONT_JS',  discovery: '$DISCOVERY_URL' } "

BOOK_DATA=" { title : 'Read online', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$BOOK_JS', discovery: '$DISCOVERY_URL' } "

DETAILS_DATA=" { title : 'Book details', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$DETAILS_JS',  discovery: '$DISCOVERY_URL' } "

SEARCH_DATA=" { title : 'Search', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$SEARCH_JS', discovery: '$DISCOVERY_URL' } "

echo $FRONT_DATA | mustache - front.mustache > ../index.html

echo $ABOUT_DATA | mustache - about.mustache > ../about/index.html

echo $RIGHTS_DATA | mustache - rights.mustache > ../rights/index.html

echo $BOOK_DATA | mustache - book.mustache > ../book/index.html

echo $DETAILS_DATA | mustache - details.mustache > ../details/index.html

echo $SEARCH_DATA | mustache - search.mustache > ../search/index.html