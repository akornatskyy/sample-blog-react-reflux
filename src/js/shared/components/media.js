import React from 'react';
import PropTypes from 'prop-types';


const Media = ({src, heading, children}) => (
    <div className="media mt-2">
        <img className="media-object mr-3" src={src} />
        <div className="media-body">
            <h5 className="mt-0">
                {heading}
            </h5>
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
