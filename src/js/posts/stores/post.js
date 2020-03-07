import Reflux from 'reflux';

import actions from '../actions';


class PostStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {pending: false, post: {author: {}}, errors: {}};
        this.listenables = actions;
    }

    onSigninCompleted() {
        const post = this.state.post;
        if (post) {
            actions.getPost(post.slug);
        }
    }

    onSignoutCompleted() {
        const post = this.state.post;
        if (post) {
            actions.getPost(post.slug);
        }
    }

    onGetPostCompleted(post) {
        this.setState({post: post});
    }

    onAddPostComment() {
        this.setState({pending: true, errors: {}});
    }

    onAddPostCommentCompleted() {
        this.setState({pending: false});
    }

    onAddPostCommentFailed(errors) {
        this.setState({pending: false, errors: errors});
    }
}

export default Reflux.initStore(PostStore);
