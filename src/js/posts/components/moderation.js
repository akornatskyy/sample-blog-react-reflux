import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../shared/components/layout';

import actions from '../actions';


class Moderation extends React.Component {
    constructor(props) {
        super(props);
        this.getPost = this.getPost.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = actions.getPost.completed.listen(
            this.props.history.goBack);
        this.timer = setTimeout(this.getPost, 10000);
    }

    componentWillUnmount() {
        this.unsubscribe();
        clearTimeout(this.timer);
    }

    handleClick(e) {
        e.preventDefault();
        this.getPost();
    }

    getPost() {
        actions.getPost(this.props.match.params.slug);
    }

    render() {
        return (
            <Layout>
                <h1>Comment Moderation</h1>
                <p>
                    Thank you for the comment. Your comment has been queued
                    for moderation.
                </p>
                <p>
                    Redirecting <a href=""
                        onClick={this.handleClick}>back</a> in 10 seconds...
                </p>
            </Layout>
        );
    }
}

Moderation.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string.isRequired
        })
    })
};

export default Moderation;
