YUI.add('util', function (Y) {
    Y.Util = {
        truncate: function ( node, len ) {

            var description = ( node.description ) ? node.description : '' ;

            var description_length = description.length ;

            if ( description_length > len && description_length > 0 ) {

                var new_str = description + " ";
                new_str = description.substr (0, len);
                new_str = description.substr (0, new_str.lastIndexOf(" "));
                new_str = (new_str.length > 0) ? new_str : description.substr (0, len);

                return new_str + ' <a href="' + page_path + '/' + node.identifier + '">...</a>' ;

            }

            return description ;

        }
    };
});