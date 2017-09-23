import Reflux from 'reflux';

import actions from '../actions';


class PostsStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {pending: false, q: '', posts: {items: []}};
        this.listenables = actions;
    }

    onSearchPosts(q) {
        this.setState({pending: true, q: q});
    }

    onSearchPostsCompleted(posts) {
        this.setState({pending: false, posts: posts});
    }
}

export default Reflux.initStore(PostsStore);
