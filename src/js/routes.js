import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {Route} from 'react-router';
import {Grid} from 'react-bootstrap';

import SignIn from './membership/components/signin';
import SignUp from './membership/components/signup';
import AuthInfo from './membership/components/auth-info';

import Posts from './posts/components/posts';
import Post from './posts/components/post';
import Moderation from './posts/components/moderation';

import Header from './shared/components/header';
import Footer from './shared/components/footer';

import userStore from './membership/stores/user';


class App extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = userStore;
    }

    render() {
        const user = this.state.user;
        const authInfo = this.props.location.pathname !== '/signin'
            ? (<AuthInfo user={user} />) : null;
        return (
            <Grid>
                <Header>
                    {authInfo}
                </Header>
                {React.cloneElement(this.props.children, {user: user})}
                <hr/>
                <Footer/>
            </Grid>
        );
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default (
    <Route component={App}>
        <Route path="/" component={Posts} />
        <Route path="posts" component={Posts} />
        <Route path="post/:slug" component={Post} />
        <Route path="post/:slug/moderation" component={Moderation} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
    </Route>
);
