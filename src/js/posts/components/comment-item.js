import React from 'react';
import PropTypes from 'prop-types';

import Media from '../../shared/components/media';
import {formatDateOrTime} from '../../shared/utils';
import './comment-item.scss';

const CommentItem = ({item}) => {
    const gravatarUrl = 'http://www.gravatar.com/avatar/' +
                        item.author.gravatar_hash + '?s=64&d=identicon';
    const heading = (
        <>
            {item.author.first_name } {item.author.last_name} <small>
                {formatDateOrTime(item.created_on)}
            </small>
        </>
    );

    return (
        <Media src={gravatarUrl} heading={heading}>
            <p className={!item.moderated ? 'text-dim' : null}>
                {item.message}
            </p>
        </Media>
    );
};

CommentItem.propTypes = {
    item: PropTypes.shape({
        'author': PropTypes.shape({
            'gravatar_hash': PropTypes.string,
            'first_name': PropTypes.string,
            'last_name': PropTypes.string
        }),
        'created_on': PropTypes.string,
        'moderated': PropTypes.bool,
        'message': PropTypes.string
    })
};

export default CommentItem;
