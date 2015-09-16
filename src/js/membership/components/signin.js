'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux');

var _ = require('../../shared/utils'),
    FormErrors = require('../../shared/components/form-errors'),
    Layout = require('../../shared/components/layout'),
    SignUpWell = require('../../shared/components/signup-well');

var actions = require('../actions'),
    userStore = require('../stores/user'),
    AccessWarn = require('./access-warn');


var Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input,
    Link = ReactRouter.Link,
    Well = ReactBootstrap.Well,
    Navigation = ReactRouter.Navigation,
    ListenerMixin = Reflux.ListenerMixin;


module.exports = React.createClass({
    mixins: [
        Reflux.connect(userStore),
        ListenerMixin,
        Navigation
    ],

    componentDidMount: function() {
        this.listenTo(actions.signin.completed, this.goBack);
    },

    handleSubmit: function(e) {
        e.preventDefault();
        actions.signin(_.pack(this.refs.form));
    },

    render: function() {
        var disabled = this.state.pending;

        return (
            <Layout sidebar={<SignUpWell/>}>
                <h1>Sign In</h1>
                <p>
                    Need an account? <Link to="signup">Sign up</Link> free.
                    Your opinions and comments would be greatly
                    appreciated.
                </p>
                <hr/>
                <FormErrors errors={this.state.errors}>
                    <Well>
                        <form ref="form" autoComplete="off"
                              onSubmit={!disabled && this.handleSubmit}>
                            <Input name="username" placeholder="Username"
                                   type="text" />
                            <Input name="password" placeholder="Password"
                                   type="password" />
                            <Button disabled={disabled} bsStyle="primary"
                                    type="submit">
                                Sign In
                            </Button>
                        </form>
                    </Well>
                </FormErrors>
                <AccessWarn/>
            </Layout>
        );
    }
});
