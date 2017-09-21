'use strict';

var $ = require('jquery');

var host = '';

module.exports = {
    get: function(path, data) {
        return $.ajax({
            url: host + path,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            xhrFields: {
                withCredentials: true
            }
        });
    },

    post: function(path, data) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                type: 'POST',
                url: host + path,
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                xhrFields: {
                    withCredentials: true
                }
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
