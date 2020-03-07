import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {Link} from 'react-router-dom';
import {Card, FormGroup, FormControl, Button} from 'react-bootstrap';

import Errors from '../../shared/components/errors';
import Layout from '../../shared/components/layout';
import SignUpWell from '../../shared/components/signup-well';
import AccessWarn from './access-warn';

import userStore from '../stores/user';
import actions from '../actions';


class SignIn extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = userStore;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        super.componentWillMount();
        actions.signout();
        this.unsubscribe = actions.signin.completed.listen(
            this.props.history.goBack);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unsubscribe();
    }

    getChildContext() {
        return {errors: this.state.errors};
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.pending) {
            actions.signin({
                username: this.username.value,
                password: this.password.value
            });
        }
    }

    render() {
        const {pending, errors} = this.state;

        return (
            <Layout sidebar={<SignUpWell />}>
                <h1>Sign In</h1>
                <p>
                    Need an account? <Link to="/signup">Sign up</Link> free.
                    Your opinions and comments would be greatly
                    appreciated.
                </p>
                <hr/>
                <Errors.Summary />
                <Card bg="light">
                    <Card.Body>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl ref={(e) => this.username = e}
                                    placeholder="Username" type="text"
                                    required
                                    isInvalid={!!errors.username} />
                                <Errors.Field name="username" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl ref={(e) => this.password = e}
                                    placeholder="Password" type="password"
                                    required
                                    isInvalid={!!errors.password} />
                                <Errors.Field name="password" />
                            </FormGroup>
                            <Button disabled={pending} type="submit">
                                Sign In
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
                <AccessWarn />
            </Layout>
        );
    }
}

SignIn.childContextTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }),
    errors: PropTypes.object.isRequired
};

export default SignIn;
