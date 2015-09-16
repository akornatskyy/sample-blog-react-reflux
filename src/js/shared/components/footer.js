'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap');


var Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;


module.exports = React.createClass({
    render: function() {
        var year = new Date().getFullYear();

        return (
            <footer>
                <Row>
                    <Col lg={12}>
                        <p className="small">
                            Copyright &copy; Keep It Simple Blog { year }
                        </p>
                    </Col>
                </Row>
            </footer>
        );
    }
});
