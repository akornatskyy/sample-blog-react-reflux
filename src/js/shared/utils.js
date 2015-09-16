'use strict';

var React = require('react'),
    $ = require('jquery'),
    moment = require('moment');


module.exports = {
    formatDateOrTime: function(d) {
        d = moment(d, moment.ISO_8601, true);
        var t = moment.duration(d - moment());

        if (t.asDays() >= -3) {
            return t.humanize(true);
        }

        return d.utc().format('[on] MMMM DD, YYYY [at] hh:mm A');
    },

    pack: function(form) {
        var r = {};

        $(React.findDOMNode(form)).serializeArray().forEach(function(f) {
            var name = f.name,
                value = f.value.trim();

            if (r[name] !== undefined) {
                if (!r[name].push) {
                    r[name] = [r[name]];
                }
                r[name].push(value);
            } else {
                r[name] = value;
            }
        });

        return r;
    }
};
