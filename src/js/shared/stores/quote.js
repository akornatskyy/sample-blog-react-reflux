'use strict';

var Reflux = require('reflux');

var actions = require('../actions');


module.exports = Reflux.createStore({
    listenables: actions,

    init: function() {
        this.quote = null;
    },

    getInitialState: function() {
        return this.quote;
    },

    onLoadDailyQuoteCompleted: function(quote) {
        this.quote = quote;
        this.trigger(quote);
    }
});
