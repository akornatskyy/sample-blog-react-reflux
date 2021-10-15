import React from 'react';
import PropTypes from 'prop-types';


const Media = ({src, heading, children}) => (
    <div className="mt-2 d-flex">
        <div className="flex-shrink-0">
            <img className="me-3" src={src} />
        </div>
        <div>
            <h5 className="mt-0">{heading}</h5>
            {children}
        </div>
    </div>
);

Media.propTypes = {
    src: PropTypes.string.isRequired,
    heading: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
};

export default Media;
