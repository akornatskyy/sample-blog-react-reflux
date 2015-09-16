'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux');

var _ = require('../../shared/utils'),
    FormErrors = require('../../shared/components/form-errors'),
    Layout = require('../../shared/components/layout'),
    SignInWell = require('../../shared/components/signin-well');

var actions = require('../actions'),
    userStore = require('../stores/user'),
    AccessWarn = require('./access-warn');


var Well = ReactBootstrap.Well,
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button,
    Link = ReactRouter.Link;


module.exports = React.createClass({
    mixins: [
        Reflux.connect(userStore),
    ],

    handleSubmit: function(e) {
        e.preventDefault();
        actions.signup(_.pack(this.refs.form));
    },

    render: function() {
        var disabled = this.state.pending;

        return (
            <Layout sidebar={<SignInWell/>}>
                <h1>Sign Up</h1>
                <p>
                    Already got an account? <Link to="signin">Sign in</Link>,
                    please.
                </p>
                <hr />
                <FormErrors errors={this.state.errors}>
                    <Well>
                        <form ref="form" autoComplete="off"
                              onSubmit={!disabled && this.handleSubmit}>
                            <Input name="email" placeholder="Email"
                                   type="text" />
                            <Input name="username" placeholder="Username"
                                   type="text" />
                            <Input name="password" placeholder="Password"
                                   type="password" />
                            <Input name="confirm_password"
                                   placeholder="Confirm Password"
                                   type="password" />
                            <Button disabled={disabled} bsStyle="primary"
                                    type="submit">
                                Sign Up
                            </Button>
                        </form>
                    </Well>
                </FormErrors>
                <AccessWarn/>
            </Layout>
        );
    }
});
