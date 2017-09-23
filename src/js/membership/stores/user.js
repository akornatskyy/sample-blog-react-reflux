import Reflux from 'reflux';

import actions from '../actions';

class UserStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = actions;
        this.state = {errors: {}, pending: false, user: null};
    }

    onSignin() {
        this.setState({pending: true});
    }

    onSigninCompleted(user) {
        this.setState({errors: {}, pending: false, user: user});
    }

    onSigninFailed(errors) {
        this.setState({errors: errors, pending: false});
    }

    onSignup() {
        this.setState({pending: true});
    }

    onSignupFailed(errors) {
        this.setState({errors: errors, pending: false});
    }

    onSignout() {
        this.setState({pending: true});
    }

    onSignoutCompleted() {
        this.setState({errors: {}, pending: false, user: null});
    }

    onUserCompleted(user) {
        this.setState({user: user});
    }

    onUserFailed() {
        this.setState({user: null});
    }
}

export default Reflux.initStore(UserStore);
