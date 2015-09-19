'use strict';

var $ = require('../../shared/ajax');


module.exports = {
    signin: function(d) {
        return $.post('/api/v1/signin', d);
    },

    signup: function(d) {
        return $.post('/api/v1/signup', d);
    },

    signout: function() {
        return $.get('/api/v1/signout');
    },

    user: function() {
        return $.get('/api/v1/user');
    }
};
