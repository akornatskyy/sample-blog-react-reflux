import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './comment-item';


const Comments = ({items}) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section>
            <hr/>
            {
                items.map((p, i) => <CommentItem key={i} item={p} />)
            }
        </section>
    );
};

Comments.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

export default Comments;