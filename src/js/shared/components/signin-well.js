'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router');


var Well = ReactBootstrap.Well,
    Link = ReactRouter.Link;


module.exports = React.createClass({
    render: function() {
        if (this.props.user) {
            return null;
        }

        return (
            <Well>
                <h4>Got account already?</h4>
                <p>
                    <Link to="signin">Sign in</Link>, please.
                    Your opinions and comments would be greatly
                    appreciated.
                </p>
            </Well>
        );
    }
});
