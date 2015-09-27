'use strict';

var _ = require('../../shared/mock'),
    samples = require('./samples.json'),
    msamples = require('../../membership/api/samples.json');


function findUserById(id) {
    return _.first(msamples.users, function(u) {
        return u.id === id;
    });
}

module.exports = {
    searchPosts: function(q, page) {
        page = page || 0;
        var posts = samples.posts;

        if (q) {
            q = q.toLowerCase();
            posts = _.nfilter(posts, (page + 1) * 2 + 1, function(p) {
                return p.title.toLowerCase().indexOf(q) > -1;
            });
        }

        return _.resolve(_.pager(posts, page, 2, function(p) {
            var a = findUserById(p.author_id);

            return {
                slug: p.slug,
                title: p.title,
                author: {
                    first_name: a.first_name, last_name: a.last_name
                },
                created_on: p.created_on,
                message: _.trancateWords(p.message, 40)
            };
        }));
    },

    loadPost: function(slug) {
        var p = _.first(samples.posts, function(p) {
            return p.slug === slug;
        });

        if (!p) {
            return _.reject();
        }

        var a = findUserById(p.author_id);

        return _.resolve({
            slug: p.slug,
            title: p.title,
            created_on: p.created_on,
            author: {
                first_name: a.first_name, last_name: a.last_name
            },
            message: p.message,
            permissions: {
                create_comment: p.permissions && p.permissions.create_comment
            },
            comments: samples.comments.filter(function(c) {
                return c.post_id === p.id;
            }).map(function(c) {
                var a = findUserById(c.author_id);

                return {
                    author: {
                        first_name: a.first_name,
                        last_name: a.last_name,
                        gravatar_hash: a.gravatar_hash
                    },
                    created_on: c.created_on,
                    message: c.message,
                    moderated: c.moderated
                };
            })
        });
    },

    addPostComment: function() {
        return _.resolve({code: 201});
    }
};

/*
 eslint camelcase:0
*/
