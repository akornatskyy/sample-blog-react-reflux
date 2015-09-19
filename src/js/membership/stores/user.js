'use strict';

var Reflux = require('reflux');

var actions = require('../actions');


module.exports = Reflux.createStore({
    listenables: actions,

    onSignin: function() {
        this.trigger({pending: true});
    },

    onSigninCompleted: function(user) {
        this.trigger({errors: null, pending: false, user: user});
    },

    onSigninFailed: function(errors) {
        this.trigger({errors: errors, pending: false});
    },

    onSignup: function() {
        this.trigger({pending: true});
    },

    onSignupFailed: function(errors) {
        this.trigger({errors: errors, pending: false});
    },

    onSignout: function() {
        this.trigger({pending: true});
    },

    onSignoutCompleted: function() {
        this.trigger({errors: null, pending: false, user: null});
    },

    onUserCompleted: function(user) {
        this.trigger({user: user});
    },

    onUserFailed: function() {
        this.trigger({user: null});
    }
});
