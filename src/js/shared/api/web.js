'use strict';

var $ = require('../../shared/ajax');


module.exports = {
    dailyquote: function() {
        return $.get('/api/v1/quote/daily');
    }
};
