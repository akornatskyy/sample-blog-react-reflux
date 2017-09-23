import React from 'react';
import PropTypes from 'prop-types';
import {Glyphicon, Button} from 'react-bootstrap';

import {formatDateOrTime} from '../../shared/utils';

import actions from '../actions';


class PostItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        actions.getPost(this.props.item.slug);
    }

    render() {
        const p = this.props.item;

        return (
            <div>
                <h2>
                    <a href="" onClick={this.handleClick}>
                        {p.title}
                    </a>
                </h2>
                <p className="lead">
                    by {p.author.first_name} {p.author.last_name}
                </p>
                <p>
                    <Glyphicon glyph="time" /> Posted {
                        formatDateOrTime(p.created_on)
                    }
                </p>
                <hr/>
                <p>
                    {p.message}
                </p>
                <Button bsStyle="primary" onClick={this.handleClick}>
                    Read More <Glyphicon glyph="chevron-right" />
                </Button>
                <hr/>
            </div>
        );
    }
}

PostItem.propTypes = {
    item: PropTypes.shape({
        'slug': PropTypes.string,
        'title': PropTypes.string,
        'author': PropTypes.shape({
            'first_name': PropTypes.string,
            'last_name': PropTypes.string
        }),
        'created_on': PropTypes.string,
        'message': PropTypes.string,
    })
};

export default PostItem;
