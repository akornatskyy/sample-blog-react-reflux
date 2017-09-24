import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Well} from 'react-bootstrap';


const SignInWell = ({authenticated}) => {
    if (authenticated) {
        return null;
    }

    return (
        <Well>
            <h4>Got account already?</h4>
            <p>
                <Link to="/signin">Sign in</Link>, please.
                Your opinions and comments would be greatly
                appreciated.
            </p>
        </Well>
    );
};

SignInWell.propTypes = {
    authenticated: PropTypes.bool
};

export default SignInWell;
