'use strict';

var React = require('react'),
    ReactRouter = require('react-router'),
    ReactBootstrap = require('react-bootstrap');


var Well = ReactBootstrap.Well,
    Link = ReactRouter.Link;


module.exports = React.createClass({
    render: function() {
        if (this.props.user) {
            return null;
        }

        return (
            <Well>
                <h4>Need an account?</h4>
                <p>
                    <Link to="signup">Sign up</Link> free.
                </p>
            </Well>
        );
    }
});
