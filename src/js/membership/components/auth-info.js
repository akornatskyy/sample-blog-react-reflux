import React from 'react';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';
import {NavItem} from 'react-bootstrap';

import actions from '../actions';


const AuthInfo = ({user}) => {
    if (!user) {
        return (
            <LinkContainer to="/signin">
                <NavItem>Sign in</NavItem>
            </LinkContainer>
        );
    }

    return (
        <NavItem onClick={actions.signout}>Sign out</NavItem>
    );
};

AuthInfo.propTypes = {
    user: PropTypes.object
};

export default AuthInfo;
