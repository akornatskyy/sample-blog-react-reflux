'use strict';

var Reflux = require('reflux');

var _ = {sync: true, children: ['completed', 'failed']};


module.exports = Reflux.createActions({
    // region: membership
    signin: _,
    signout: _,
    signup: _,

    // region: posts
    addPostComment: _,
    loadPost: _,
    reloadPost: _,
    searchPosts: _,

    // region: shared
    loadDailyQuote: _
});
