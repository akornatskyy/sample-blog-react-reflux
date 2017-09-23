import React from 'react';
import PropTypes from 'prop-types';


const Media = ({src, heading, children}) => (
    <article className="media">
        <a className="media-left">
            <img className="media-object" src={src} />
        </a>
        <div className="media-body">
            <h4 className="media-heading">
                {heading}
            </h4>
            {children}
        </div>
    </article>
);

Media.propTypes = {
    src: PropTypes.string.isRequired,
    heading: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
};

export default Media;
