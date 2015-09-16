'use strict';

var React = require('react');


module.exports = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired
    },

    render: function() {
        var r = [], p = this.props.text.split('\\n\\n');

        r.push(<p key={0} className="lead">{p[0]}</p>);
        for (var i = 1; i < p.length; i++) {
            r.push(<p key={i}>{p[i]}</p>);
        }

        return <div>{r}</div>;
    }
});
