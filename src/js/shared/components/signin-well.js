import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';


const SignInWell = ({authenticated}) => {
    if (authenticated) {
        return null;
    }

    return (
        <Card bg="light" className="mb-3">
            <Card.Body>
                <Card.Title>Got account already?</Card.Title>
                <Card.Text>
                    <Link to="/signin">Sign in</Link>, please.
                    Your opinions and comments would be greatly
                    appreciated.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

SignInWell.propTypes = {
    authenticated: PropTypes.bool
};

export default SignInWell;
