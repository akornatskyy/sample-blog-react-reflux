'use strict';

var actions = require('../actions');

var api = require('./api');


actions.addPostComment.listenAndPromise(api.addPostComment);
actions.loadPost.listenAndPromise(api.loadPost);
actions.reloadPost.listenAndPromise(api.loadPost);
actions.searchPosts.listenAndPromise(api.searchPosts);

module.exports = actions;
