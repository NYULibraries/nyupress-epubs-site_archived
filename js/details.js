YUI().use(
    'node', 'event', 'io', 'jsonp', 'jsonp-url', 'json-parse', 'handlebars', function(Y) {

        'use strict';

        var body = Y.one('body'),
            head = Y.one('head'),
            container = Y.one('.data-container'),
            datasourceURL = body.getAttribute('data-discovery') + '/select?&wt=json&json.wrf=callback={callback}&fl=*&fq=id:',
            match = location.pathname.match(/\/details\/(.*)/),
            meta = Y.one('#meta-tags').getHTML(),
            source = Y.one('#list-template').getHTML(),
            template = Y.Handlebars.compile(source),
            metaTemplate = Y.Handlebars.compile(meta);

        console.log(head, meta, container, source, template, metaTemplate);

        function onFailure() {
            Y.io(body.getAttribute('data-app') + '/404.html', {
                on: {
                    success: function(transactionid, response) {
                        container.append(response.response);
                    }
                }
            });
        }

        function onTimeout() {
            onFailure();
        }

        function onSubmit(e) {

            e.preventDefault();

            var currentTarget = e.currentTarget,
                value = Y.one('.pure-input');

            location.href = currentTarget.get('action') + '/' + value.get('value');
        }

        function onSuccess(response) {

            try {

                head.append(
                    metaTemplate({
                        items: response.response.docs 
                    })
                )

                container.append(
                    template({
                        items: response.response.docs
                    })
                );

                body.removeClass('io-loading');

            } catch (e) {
                onFailure();
            }
        }

        if (match && match[1]) {

            body.addClass('io-loading');

            Y.jsonp(datasourceURL + encodeURIComponent(match[1]), {
                on: {
                    success: onSuccess,
                    failure: onFailure,
                    timeout: onTimeout
                },
                timeout: 3000
            });
        } else {
            onFailure();
        }
        body.delegate('submit', onSubmit, 'form');

    });