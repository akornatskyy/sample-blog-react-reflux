import React from 'react';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, NavbarBrand, Nav} from 'react-bootstrap';


const Header = ({children}) => (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <LinkContainer to="/">
            <NavbarBrand>
                Keep It Simple Blog
            </NavbarBrand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mr-auto">
                <Nav.Link>About</Nav.Link>
                <Nav.Link disabled>Contact</Nav.Link>
            </Nav>
            <Nav>
                {children}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

Header.propTypes = {
    children: PropTypes.node
};

export default Header;
