'use strict';

var Reflux = require('reflux');

var actions = require('../actions');


module.exports = Reflux.createStore({
    listenables: actions,

    init: function() {
        this.pending = false;
        this.q = '';
        this.posts = {};
    },

    getInitialState: function() {
        return {
            pending: this.pending,
            q: this.q,
            posts: this.posts
        };
    },

    onSearchPosts: function(q) {
        this.pending = true;
        this.q = q;
        this.trigger({pending: true, q: q});
    },

    onSearchPostsCompleted: function(posts) {
        this.pending = false;
        this.posts = posts;
        this.trigger({pending: false, posts: posts});
    }
});
