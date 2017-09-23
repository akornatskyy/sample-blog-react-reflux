import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import QuoteWell from './quote-well';


const Layout = ({children, sidebar}) => (
    <Row>
        <Col md={8}>
            <article>
                {children}
            </article>
        </Col>
        <Col md={4}>
            <aside>
                {sidebar}
                <QuoteWell />
            </aside>
        </Col>
    </Row>
);

Layout.propTypes = {
    children: PropTypes.node,
    sidebar: PropTypes.node
};

export default Layout;
