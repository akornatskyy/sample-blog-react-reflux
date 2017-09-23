import React from 'react';
import PropTypes from 'prop-types';
import {Pager} from 'react-bootstrap';


const Paging = ({pending, paging, onSelect}) => {
    let newer;
    let older;

    if (!paging) {
        return null;
    }

    if (paging.before !== undefined) {
        newer = (
            <Pager.Item previous disabled={pending}
                eventKey={paging.before}>
                &larr; Newer
            </Pager.Item>
        );
    }

    if (paging.after !== undefined) {
        older = (
            <Pager.Item next disabled={pending}
                eventKey={paging.after}>
                Older &rarr;
            </Pager.Item>
        );
    }

    if (!newer && !older) {
        return null;
    }

    return (
        <Pager onSelect={onSelect}>
            {newer}
            {older}
        </Pager>
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
