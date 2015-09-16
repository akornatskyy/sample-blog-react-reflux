'use strict';

var _ = require('../mock'),
    samples = require('./samples.json');


module.exports = {
    dailyquote: function() {
        return _.resolve(samples.quote);
    }
};
