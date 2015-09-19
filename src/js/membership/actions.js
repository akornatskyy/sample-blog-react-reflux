'use strict';

var actions = require('../actions');

var api = require('./api');


actions.signin.listenAndPromise(api.signin);
actions.signout.listenAndPromise(api.signout);
actions.signup.listenAndPromise(api.signup);
actions.user.listenAndPromise(api.user);

module.exports = actions;
