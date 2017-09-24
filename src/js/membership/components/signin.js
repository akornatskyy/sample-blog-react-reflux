import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {Link} from 'react-router-dom';
import {Well, FormGroup, FormControl, Button} from 'react-bootstrap';

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
        actions.signin({
            username: this.username.value,
            password: this.password.value
        });
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
                <Well>
                    <form autoComplete="off"
                        onSubmit={!pending && this.handleSubmit}>
                        <FormGroup validationState={errors.username && 'error'}>
                            <FormControl
                                inputRef={ref => {
                                    this.username = ref;
                                }}
                                placeholder="Username" type="text" />
                            <FormControl.Feedback />
                            <Errors.Field name="username" />
                        </FormGroup>
                        <FormGroup validationState={errors.password && 'error'}>
                            <FormControl
                                inputRef={ref => {
                                    this.password = ref;
                                }}
                                placeholder="Password" type="password" />
                            <FormControl.Feedback />
                            <Errors.Field name="password" />
                        </FormGroup>
                        <Button disabled={pending} bsStyle="primary"
                            type="submit">
                            Sign In
                        </Button>
                    </form>
                </Well>
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
