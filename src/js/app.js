'use strict';

var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    Reflux = require('reflux');


var SignIn = require('./membership/components/signin'),
    SignUp = require('./membership/components/signup'),
    Posts = require('./posts/components/posts'),
    Post = require('./posts/components/post'),
    Moderation = require('./posts/components/moderation'),
    Header = require('./shared/components/header'),
    Footer = require('./shared/components/footer'),
    actions = require('./actions'),
    userStore = require('./membership/stores/user');


var Grid = ReactBootstrap.Grid,
    Route = Router.Route;


var App = React.createClass({
    mixins: [Reflux.connect(userStore)],

    getInitialState: function() {
        return {user: undefined};
    },

    render: function() {
        return (
            <Grid>
                <Header user={this.state.user} />
                <Router.RouteHandler user={this.state.user} />
                <hr/>
                <Footer/>
            </Grid>
        );
    }
});

// <Redirect from="/" to="posts" />
var routes = (
    <Route handler={App}>
        <Route path="/" handler={Posts} />
        <Route name="posts" path="posts" handler={Posts} />
        <Route name="post" path="post/:slug" handler={Post} />
        <Route name="moderation" path="post/:slug/moderation"
               handler={Moderation} />
        <Route name="signin" path="signin" handler={SignIn} />
        <Route name="signup" path="signup" handler={SignUp} />
    </Route>
);

actions.loadDailyQuote();
actions.searchPosts();
actions.user();

Router.run(routes, Router.HistoryLocation, function(Root) {
    React.render(<Root/>, document.body);
});
