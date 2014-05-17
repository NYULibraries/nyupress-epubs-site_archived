#!/bin/bash

umask 002

APP_URL="http://dev-dl-pa.home.nyu.edu/nyupress-epubs-site"

READIUM_URL="http://dev-dl-pa.home.nyu.edu/NYUPressOA"

CSS=`cssmin ../css/style.css`

SEARCH_JS=`uglifyjs ../js/search.js`

FRONT_JS=`uglifyjs ../js/front.js`

BOOK_JS=`uglifyjs ../js/book.js`

DETAILS_JS=`uglifyjs ../js/details.js`

ABOUT_DATA="--- { title : 'About', appUrl: '$APP_URL', css: '$CSS' } ---"

FRONT_DATA="--- { title : 'Browse titles', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$FRONT_JS', css: '$CSS' } ---"

BOOK_DATA="--- { title : 'Book', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$BOOK_JS', css: '$CSS' } ---"

DETAILS_DATA="--- { title : 'Book details', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$DETAILS_JS', css: '$CSS' } ---"

SEARCH_DATA="--- { title : 'Search', appUrl: '$APP_URL', readiumUrl: '$READIUM_URL', js: '$SEARCH_JS', css: '$CSS' } ---"

echo $FRONT_DATA | mustache - front.mustache > ../index.html

echo $ABOUT_DATA | mustache - about.mustache > ../about/index.html

echo $BOOK_DATA | mustache - book.mustache > ../book/index.html

echo $DETAILS_DATA | mustache - details.mustache > ../details/index.html

echo $SEARCH_DATA | mustache - search.mustache > ../search/index.html