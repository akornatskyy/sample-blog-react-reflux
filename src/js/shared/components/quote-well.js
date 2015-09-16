'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    Reflux = require('reflux');

var quoteStore = require('../stores/quote');


var Well = ReactBootstrap.Well;


module.exports = React.createClass({
    mixins: [Reflux.connect(quoteStore)],

    render: function() {
        var q = this.state;

        if (!q) {
            return null;
        }

        return (
            <Well>
                <h4>Quote of the Day</h4>
                <p>
                    <q>{q.message}</q>
                    <i> — {q.author}</i>
                </p>
            </Well>
        );
    }
});
