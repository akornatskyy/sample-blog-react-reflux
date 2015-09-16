'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap');


var Alert = ReactBootstrap.Alert,
    Glyphicon = ReactBootstrap.Glyphicon,
    Input = ReactBootstrap.Input;


module.exports = React.createClass({
    propTypes: {
        errors: React.PropTypes.object
    },

    render: function() {
        var errors = this.props.errors;

        if (errors) {
            errors = errors.__ERROR__;
            if (errors) {
                errors = errors[errors.length - 1];
                errors = <Alert bsStyle="danger">
                    <Glyphicon glyph="exclamation-sign" /> {errors}
                </Alert>;
            }
        }

        return (
            <section>
                {errors}
                {this.renderChildren(this.props.children)}
            </section>
        );
    },

    renderChildren: function(children) {
        if (typeof children !== 'object' || children === null) {
            return children;
        }

        return React.Children.map(children, function(child) {
            if (typeof child !== 'object' || child === null) {
                return child;
            }

            if (this.props.errors && child.type === Input) {
                var name = child.props.name || child.ref;

                if (name) {
                    var errors = this.props.errors[name];

                    if (errors) {
                        return React.cloneElement(child, {
                            groupClassName: 'has-error',
                            help: errors[errors.length - 1]
                        });
                    }
                }
            }

            return React.cloneElement(child, null,
                this.renderChildren(child.props.children));
        }.bind(this));
    }
});
