'use strict';

var $ = require('../../shared/ajax');


module.exports = {
    searchPosts: function(q, page) {
        return $.get('/api/v1/search/posts', {q: q, page: page});
    },

    loadPost: function(slug) {
        return $.get('/api/v1/post/' + slug);
    },

    addPostComment: function() {
    }
};
