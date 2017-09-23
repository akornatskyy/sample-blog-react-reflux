import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './footer.scss';


const year = new Date().getFullYear();

const Footer = () => (
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

export default Footer;
