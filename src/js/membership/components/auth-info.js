import React from 'react';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';
import {NavLink} from 'react-bootstrap';

import actions from '../actions';


const AuthInfo = ({user}) => {
    if (!user) {
        return (
            <LinkContainer to="/signin">
                <NavLink>Sign in</NavLink>
            </LinkContainer>
        );
    }

    return (
        <NavLink onClick={actions.signout}>Sign out</NavLink>
    );
};

AuthInfo.propTypes = {
    user: PropTypes.object
};

export default AuthInfo;
