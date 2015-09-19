'use strict';

var React = require('react'),
    Router = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouterBootstrap = require('react-router-bootstrap');

var actions = require('../actions');


var Navbar = ReactBootstrap.Navbar,
    CollapsibleNav = ReactBootstrap.CollapsibleNav,
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    NavItemLink = ReactRouterBootstrap.NavItemLink;


module.exports = React.createClass({
    mixins: [Router.State],

    render: function() {
        var auth = this.props.user;

        if (auth !== undefined) {
            if (auth) {
                auth = <NavItem onClick={actions.signout}>Sign out</NavItem>;
            } else if (!this.isActive('signin')) {
                auth = <NavItemLink to="signin">Sign in</NavItemLink>;
            }
        }

        // <Navbar brand={<a href="/">Keep It Simple Blog</a>}
        // <Navbar brand={<Link to="posts">Keep It Simple Blog</Link>}
        return (
            <Navbar brand={<a href="/">Keep It Simple Blog</a>}
                    inverse fixedTop toggleNavKey={0}>
                <CollapsibleNav eventKey={0}>
                    <Nav navbar>
                        <NavItem disabled>About</NavItem>
                        <NavItem disabled>Contact</NavItem>
                    </Nav>
                    <Nav navbar right>
                        {auth}
                    </Nav>
                </CollapsibleNav>
            </Navbar>
        );
    }
});
