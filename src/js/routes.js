import React from 'react';
import Reflux from 'reflux';
import {Switch, Route} from 'react-router-dom';
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
        const authenticated = !!user;
        let authInfo = null;
        if (this.props.location.pathname !== '/signin'
                && user !== undefined) {
            authInfo = (<AuthInfo user={user} />);
        }

        return (
            <Grid>
                <Header>
                    {authInfo}
                </Header>
                <Switch>
                    <Route exact path="/" render={props =>
                        <Posts {...props} authenticated={authenticated} />} />
                    <Route exact path="/posts" render={props =>
                        <Posts {...props} authenticated={authenticated} />} />
                    <Route exact path="/post/:slug" render={props =>
                        <Post {...props} authenticated={authenticated} />} />
                    <Route exact path="/post/:slug/moderation"
                        component={Moderation} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                </Switch>
                <hr/>
                <Footer/>
            </Grid>
        );
    }
}

export default (<Route path="/" component={App} />);
