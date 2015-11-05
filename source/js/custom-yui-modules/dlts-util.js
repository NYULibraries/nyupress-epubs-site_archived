YUI.add('dlts-util', function (Y) {
    Y.DltsUtil = {
        truncate: function ( node, len ) {

            var description = ( node.description ) ? node.description : '' ;

            var description_length = description.length ;

            if ( description_length > len && description_length > 0 ) {

                var new_str = description + " ";
                new_str = description.substr (0, len);
                new_str = description.substr (0, new_str.lastIndexOf(" "));
                new_str = (new_str.length > 0) ? new_str : description.substr (0, len);

                // Y.DltsUtil.truncate_page_path is set by any code that uses this
                // module.
                return new_str + ' <a href="' + Y.DltsUtil.truncate_page_path + '/' + node.identifier + '">...</a>' ;

            }

            return description ;

        },

        truncate_page_path: ''
    };
});