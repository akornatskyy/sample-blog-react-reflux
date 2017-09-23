import Reflux from 'reflux';
import refluxPromise from 'reflux-promise';

Reflux.use(refluxPromise(window.Promise));

const _ = {sync: true, children: ['completed', 'failed']};

export default Reflux.createActions({
    // region: membership
    signin: _,
    signout: _,
    signup: _,
    user: _,

    // region: posts
    addPostComment: _,
    getPost: _,
    searchPosts: _,

    // region: shared
    getDailyQuote: _
});
