import $ from '../../shared/ajax';


export default {
    searchPosts: (q, page) => $.get('/api/v1/search/posts', {q: q, page: page}),

    getPost: slug => $.get(
        '/api/v1/post/' + slug + '?fields=permissions,comments'),

    addComment: (slug, message) => $.post(
        '/api/v1/post/' + slug + '/comments', {message: message})
};
