import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Well} from 'react-bootstrap';


const SignUpWell = ({authenticated}) => {
    if (authenticated) {
        return null;
    }

    return (
        <Well>
            <h4>Need an account?</h4>
            <p>
                <Link to="/signup">Sign up</Link> free.
            </p>
        </Well>
    );
};

SignUpWell.propTypes = {
    authenticated: PropTypes.bool
};

export default SignUpWell;
