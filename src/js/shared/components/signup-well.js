import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card} from 'react-bootstrap';


const SignUpWell = ({authenticated}) => {
    if (authenticated) {
        return null;
    }

    return (
        <Card bg="light" className="mb-3">
            <Card.Body>
                <Card.Title>Need an account?</Card.Title>
                <Card.Text>
                    <Link to="/signup">Sign up</Link> free.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

SignUpWell.propTypes = {
    authenticated: PropTypes.bool
};

export default SignUpWell;
