'use strict';

var React = require('react');


module.exports = React.createClass({
    propTypes: {
        src: React.PropTypes.string.isRequired,
        heading: React.PropTypes.node.isRequired
    },

    render: function() {
        return (
            <article className="media">
                <a className="media-left">
                    <img className="media-object" src={this.props.src} />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">
                        {this.props.heading}
                    </h4>
                    {this.props.children}
                </div>
            </article>
        );
    }
});
