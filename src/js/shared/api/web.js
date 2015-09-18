'use strict';

var $ = require('jquery');


module.exports = {
    dailyquote: function() {
        return $.ajax({
            url: '/api/v1/quote/daily'
        });
    }
};
