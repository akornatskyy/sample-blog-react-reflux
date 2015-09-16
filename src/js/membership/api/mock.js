'use strict';

var _ = require('../../shared/mock'),
    samples = require('./samples.json');


module.exports = {
    signin: function(credentials) {
        var errors;

        if (!credentials.username) {
            errors = {username: [samples.errors.required]};
        }

        if (!credentials.password) {
            errors = errors || {};
            errors.password = [samples.errors.required];
        }

        if (errors) {
            return _.reject(errors);
        }

        var u = _.first(samples.users, function(u) {
            return (u.username === credentials.username &&
                    u.password === credentials.password);
        });

        if (!u) {
            return _.reject({__ERROR__: [samples.errors.signin]});
        }

        return _.resolve({username: u.username});
    },

    signup: function() {
        return _.reject({__ERROR__: [samples.errors.unavailable]});
    },

    signout: function() {
        return _.resolve({code: 200});
    }
};
