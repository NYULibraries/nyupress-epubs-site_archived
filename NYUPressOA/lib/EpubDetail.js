define(['jquery', 'bootstrap', 'storage/StorageManager', 'EpubLibraryManager', 'i18n/Strings', 'hgn!templates/library-navbar.html',
        'hgn!templates/library-body.html', 'hgn!templates/library-item.html', 'hgn!templates/details-dialog.html', 'hgn!templates/details-item.html',
        'hgn!templates/details-body.html',
        'hgn!templates/add-epub-dialog.html', 'ReaderSettingsDialog', 'Dialogs', 'workers/Messages'
    ],
    function($, bootstrap, StorageManager, libraryManager, Strings, LibraryNavbar, LibraryBody, LibraryItem, DetailsDialog, DetailsItem, DetailsBody,
        AddEpubDialog, SettingsDialog, Dialogs, Messages) {

        ////
        ////
        var heightRule,
            transformRule,
            maxHeightRule,
            detailsDialogStr = DetailsDialog({
                strings: Strings
            });

        var findHeightRule = function() {

            var styleSheet = document.styleSheets[0];
            var ii = 0;
            var cssRule;
            do {
                if (styleSheet.cssRules) {
                    cssRule = styleSheet.cssRules[ii];
                } else {
                    cssRule = styleSheet.rules[ii];
                }
                if (cssRule) {
                    if (cssRule.selectorText.toLowerCase() == '.library-item') {
                        heightRule = cssRule;
                    } else if (cssRule.selectorText.toLowerCase() == '.library-item img') {
                        maxHeightRule = cssRule;
                    } else if (cssRule.selectorText.toLowerCase() == '.library-item .no-cover') {
                        transformRule = cssRule;
                    }

                }
                ii++;
            } while (cssRule);
        };


        var setItemHeight = function() {
            var medWidth = 2,
                smWidth = 3,
                xsWidth = 4,
                rowHeight = 0,
                imgWidth = 0,
                scale = 1;

            var winWidth = window.innerWidth;

            if (winWidth >= 992) {
                imgWidth = winWidth * (medWidth / 12) - 30;
                rowHeight = 1.33 * imgWidth + 105;
            } else if (winWidth >= 768) {
                imgWidth = winWidth * (smWidth / 12) - 30;
                rowHeight = 1.33 * imgWidth + 105;
            } else {
                imgWidth = winWidth * (xsWidth / 12) - 30;
                rowHeight = 1.33 * imgWidth + 20;
            }
            heightRule.style.height = rowHeight + 'px';
            scale = imgWidth / 300;

            var styleRule = 'translate(-' + ((1 - scale) * 300) / 2 + 'px, -' + ((1 - scale) * 400) / 2 + 'px) ' + 'scale(' + scale + ',' + scale + ')';
            transformRule.style.webkitTransform = styleRule;
            transformRule.style.transform = styleRule;
            transformRule.style.msTransform = styleRule;
            maxHeightRule.style.maxHeight = 1.33 * imgWidth + 'px';
        };

        ////
        ///

        var detailsDialogStr = DetailsDialog({
            strings: Strings
        });
        var showDetailsBody = function(details) {
            var bodyStr = DetailsItem({
                data: details,
                strings: Strings
            });

            $('#app-container').html(bodyStr);
            $('.page-title').html('<a href="index.html">Browse The Titles</a> > View Book Details');


        };

        var showError = function(errorCode) {
            Dialogs.showError(errorCode);
        };

        var lookupIndividualItem = function(epubs) {
            whichone = getDetailQueryParam();
            var obj = libraryManager.retrieveFullEpubDetailsFromJSON(epubs, whichone);
            showDetailsBody(obj);
            // console.log("At this point,  a node can also be accessed " + libraryManager.libraryData[2].description);
        };
        var getDetailQueryParam = function() {
            var query = window.location.search;
            if (query && query.length) {
                query = query.substring(1);
            }
            if (query.length) {
                var keyParams = query.split('&');
                for (var x = 0; x < keyParams.length; x++) {
                    var keyVal = keyParams[x].split('=');
                    if (keyVal[0] == 'detail' && keyVal.length == 2) {
                        // console.log("querystring says: " + keyVal[1]);
                        return keyVal[1];
                    }
                }

            }
            return null;
        };
        var loadDetailUI = function(data) {
            $('nav').empty();
            $('nav').append(LibraryNavbar({}));

            var $appContainer = $('#app-container');
            $appContainer.empty();
            $('#app-container').append(DetailsBody({}));

            StorageManager.initStorage(function() {
                libraryManager.retrieveAvailableEpubs(lookupIndividualItem);
            }, showError);
            findHeightRule();
            setItemHeight();

            $(window).on('resize', setItemHeight);

            var setAppSize = function() {
                // LMH leave room for a footer
                var appHeight = $(document.body).outerHeight() - $('#app-container')[0].offsetTop - $('footer').outerHeight(true);
                $('#app-container').height(appHeight);
            };
            $(window).on('resize', setAppSize);
            $('#app-container').css('overflowY', 'auto');
            $('#app-container').css('-webkit-overflow-scrolling', 'touch');
            setAppSize();

        };

        return {
            loadUI: loadDetailUI,
        };
    });