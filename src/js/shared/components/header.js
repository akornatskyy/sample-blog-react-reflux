import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


const Header = ({children}) => (
    <Navbar inverse fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Keep It Simple Blog</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavItem disabled>About</NavItem>
                <NavItem disabled>Contact</NavItem>
            </Nav>
            <Nav pullRight>
                {children}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

Header.propTypes = {
    children: PropTypes.node
};

export default Header;
