'use strict';

var $ = require('jquery');


module.exports = {
    get: function(url, data) {
        return $.ajax({
            url: url,
            data: data
        });
    },

    post: function(url, data) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            })
            .done(resolve)
            .fail(function(x) {
                if (x.status !== 400) {
                    return;
                }
                reject(x.responseJSON);
            });
        });
    }
};
