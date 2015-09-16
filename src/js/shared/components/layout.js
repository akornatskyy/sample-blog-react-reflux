'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap');

var QuoteWell = require('./quote-well');


var Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;


module.exports = React.createClass({
    propTypes: {
        sidebar: React.PropTypes.node
    },

    render: function() {
        return (
            <Row>
                <Col md={8}>
                    <article>
                        {this.props.children}
                    </article>
                </Col>
                <Col md={4}>
                    <aside>
                        {this.props.sidebar}
                        <QuoteWell/>
                    </aside>
                </Col>
            </Row>
        );
    }
});
