import * as _ from '../../shared/mock';
import samples from './samples.json';
import msamples from '../../membership/api/samples.json';


const findUserById = id => _.first(msamples.users, u => u.id === id);

export default {
    searchPosts: (q = null, page = 0) => {
        let posts = samples.posts;

        if (q) {
            q = q.toLowerCase();
            posts = _.nfilter(
                posts,
                (page + 1) * 2 + 1,
                p => p.title.toLowerCase().indexOf(q) > -1);
        }

        return _.resolve(_.pager(posts, page, 2, p => {
            const a = findUserById(p.author_id);

            return {
                'slug': p.slug,
                'title': p.title,
                'author': {
                    'first_name': a.first_name,
                    'last_name': a.last_name
                },
                'created_on': p.created_on,
                'message': _.trancateWords(p.message, 40)
            };
        }));
    },

    getPost: slug => {
        const p = _.first(samples.posts, p => p.slug === slug);

        if (!p) {
            return _.reject();
        }

        const a = findUserById(p.author_id);

        return _.resolve({
            'slug': p.slug,
            'title': p.title,
            'created_on': p.created_on,
            'author': {
                'first_name': a.first_name,
                'last_name': a.last_name
            },
            'message': p.message,
            'permissions': {
                'create_comment': p.permissions && p.permissions.create_comment
            },
            'comments': samples.comments.filter(c => c.post_id === p.id).map(
                c => {
                    const ca = findUserById(c.author_id);

                    return {
                        'author': {
                            'first_name': ca.first_name,
                            'last_name': ca.last_name,
                            'gravatar_hash': ca.gravatar_hash
                        },
                        'created_on': c.created_on,
                        'message': c.message,
                        'moderated': c.moderated
                    };
                })
        });
    },

    addComment: function() {
        return _.resolve();
    }
};
