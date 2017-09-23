import api from 'api';

import actions from '../actions';


actions.addPostComment.listenAndPromise(api.addComment);
actions.getPost.listenAndPromise(api.getPost);
actions.searchPosts.listenAndPromise(api.searchPosts);

export default actions;
