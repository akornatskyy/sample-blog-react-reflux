import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Pagination} from 'react-bootstrap';


const Paging = ({pending, paging, onSelect}) => {
    let newer;
    let older;

    if (!paging) {
        return null;
    }

    if (paging.before !== undefined) {
        newer = (
            <Pagination onSelect={onSelect}>
                <Pagination.Prev disabled={pending}
                    onClick={() => onSelect(paging.before)}>
                &larr; Newer
                </Pagination.Prev>
            </Pagination>
        );
    }

    if (paging.after !== undefined) {
        older = (
            <Pagination className="justify-content-end">
                <Pagination.Item disabled={pending}
                    onClick={() => onSelect(paging.after)}>
                Older &rarr;
                </Pagination.Item>
            </Pagination>
        );
    }

    if (!newer && !older) {
        return null;
    }

    return (
        <Row>
            <Col>
                {newer}
            </Col>
            <Col>
                {older}
            </Col>
        </Row>
    );
};

Paging.propTypes = {
    pending: PropTypes.bool,
    paging: PropTypes.shape({
        before: PropTypes.number,
        after: PropTypes.number
    }),
    onSelect: PropTypes.func
};

Paging.defaultProps = {
    pending: false,
    paging: {}
};

export default Paging;
