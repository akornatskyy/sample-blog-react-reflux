import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {Glyphicon} from 'react-bootstrap';

import Layout from '../../shared/components/layout';
import LeadBreak from '../../shared/components/lead-break';
import {formatDateOrTime} from '../../shared/utils';

import CommentWell from './comment-well';
import Comments from './comments';

import actions from '../actions';
import postStore from '../stores/post';


class Post extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = postStore;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        super.componentWillMount();
        this.unsubscribe = actions.addPostComment.completed.listen(
            () => this.props.history.push(
                '/post/' + this.props.match.params.slug + '/moderation'));
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unsubscribe();
    }

    handleSubmit(message) {
        actions.addPostComment(this.props.match.params.slug, message);
    }

    render() {
        const {pending, post, errors} = this.state;
        const permitted = post.permissions && post.permissions.create_comment;

        return (
            <Layout>
                <article>
                    <h1>{post.title}</h1>
                    <p className="lead">
                        by {post.author.first_name} {post.author.last_name}
                    </p>
                    <hr/>
                    <p>
                        <Glyphicon glyph="time" /> Posted {
                            formatDateOrTime(post.created_on)
                        }
                    </p>
                    <hr/>
                    <LeadBreak text={post.message} />
                </article>
                <hr/>
                <CommentWell authenticated={this.props.authenticated}
                    permitted={permitted}
                    disabled={pending}
                    errors={errors}
                    onSubmit={this.handleSubmit} />
                <Comments items={post.comments} />
            </Layout>
        );
    }
}

Post.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string.isRequired
        }),
    }),
    pending: PropTypes.bool,
    post: PropTypes.shape({
        'title': PropTypes.string,
        'author': PropTypes.shape({
            'first_name': PropTypes.string,
            'last_name': PropTypes.string
        }),
        'created_on': PropTypes.string,
        'message': PropTypes.string
    }),
    authenticated: PropTypes.bool
};

export default Post;
