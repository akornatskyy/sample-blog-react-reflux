'use strict';

var actions = require('../actions');

var api = require('./api');


actions.loadDailyQuote.listenAndPromise(api.dailyquote);

module.exports = actions;
