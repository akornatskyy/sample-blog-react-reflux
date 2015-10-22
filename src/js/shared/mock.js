'use strict';


module.exports = {
    trancateWords: function(s, count) {
        s = s.split(/\s|\\n/).slice(0, count);
        if (s.length === count) {
            s.push('...');
        }

        return s.join(' ');
    },

    pager: function(items, page, size, f) {
        var start = page * size,
            end = start + size,
            paging = {},
            r = [];

        if (page > 0) {
            paging.before = page - 1;
        }

        if (end < items.length) {
            paging.after = page + 1;
        } else {
            end = items.length;
        }

        for (var i = start; i < end; i++) {
            r.push(f(items[i]));
        }

        return {paging: paging, items: r};
    },

    first: function(items, predicate) {
        for (var i = 0; i < items.length; i++) {
            var d = items[i];

            if (predicate(d)) {
                return d;
            }
        }

        return null;
    },

    nfilter: function(items, n, predicate) {
        var r = [];

        for (var i = 0; i < items.length; i++) {
            var d = items[i];

            if (predicate(d)) {
                r.push(d);
                n -= 1;
            }

            if (!n) {
                break;
            }
        }

        return r;
    },

    resolve: function(r, timeout) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(r);
            }, timeout || 100);
        });
    },

    reject: function(r, timeout) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject(r);
            }, timeout || 100);
        });
    }
};
