'use strict';

var Reflux = require('reflux');

var actions = require('../actions');


module.exports = Reflux.createStore({
    listenables: actions,

    init: function() {
        this.pending = false;
        this.post = null;
    },

    getInitialState: function() {
        return {pending: this.pending, post: this.post};
    },

    onSigninCompleted: function() {
        if (this.post) {
            actions.reloadPost(this.post.slug);
        }
    },

    onSignoutCompleted: function() {
        if (this.post) {
            actions.reloadPost(this.post.slug);
        }
    },

    onLoadPostCompleted: function(post) {
        this.post = post;
        this.trigger({post: post});
    },

    onReloadPostCompleted: function(post) {
        this.post = post;
        this.trigger({post: post});
    },

    onAddPostComment: function() {
        this.pending = true;
        this.trigger({pending: true});
    },

    onAddPostCommentCompleted: function() {
        this.pending = false;
    },

    onAddPostCommentFailed: function(errors) {
        this.pending = false;
        this.trigger({errors: errors, pending: false});
    }
});
