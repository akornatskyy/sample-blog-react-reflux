import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {Link} from 'react-router-dom';
import {Card, FormGroup, FormControl, Button} from 'react-bootstrap';

import Errors from '../../shared/components/errors';
import Layout from '../../shared/components/layout';
import SignInWell from '../../shared/components/signin-well';
import AccessWarn from './access-warn';

import userStore from '../stores/user';
import actions from '../actions';


class SignUp extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = userStore;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        super.componentWillMount();
        actions.signout();
    }

    getChildContext() {
        return {errors: this.state.errors};
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.pending) {
            actions.signup({
                'email': this.email.value,
                'username': this.username.value,
                'password': this.password.value,
                'confirm_password': this.confirmPassword.value
            });
        }
    }

    render() {
        const {pending, errors} = this.state;

        return (
            <Layout sidebar={<SignInWell/>}>
                <h1>Sign Up</h1>
                <p>
                    Already got an account? <Link to="/signin">Sign in</Link>,
                    please.
                </p>
                <hr/>
                <Errors.Summary />
                <Card bg="light">
                    <Card.Body>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl
                                    ref={(e) => this.email = e}
                                    placeholder="Email" type="text"
                                    required
                                    isInvalid={!!errors.email} />
                                <Errors.Field name="email" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    ref={(e) => this.username = e}
                                    placeholder="Username" type="text"
                                    required
                                    isInvalid={!!errors.username} />
                                <Errors.Field name="username" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    ref={(e) => this.password = e}
                                    placeholder="Password" type="password"
                                    required
                                    isInvalid={!!errors.apssword} />
                                <Errors.Field name="password" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl
                                    ref={(e) => this.confirmPassword = e}
                                    placeholder="Confirm Password"
                                    type="confirm_password"
                                    required
                                    isInvalid={!!errors.confirm_password} />
                                <Errors.Field name="confirm_password" />
                            </FormGroup>
                            <Button disabled={pending} type="submit">
                                Sign Up
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
                <AccessWarn />
            </Layout>
        );
    }
}

SignUp.childContextTypes = {
    errors: PropTypes.object.isRequired
};

export default SignUp;
