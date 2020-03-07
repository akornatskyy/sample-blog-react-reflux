import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';

import Layout from '../../shared/components/layout';
import SignUpWell from '../../shared/components/signup-well';
import Paging from '../../shared/components/paging';
import SearchPostsWell from './search-posts-well';
import PostItem from './post-item';

import actions from '../actions';
import postsStore from '../stores/posts';
import {qs} from '../../shared/utils';


class Posts extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = postsStore;
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectPage = this.handleSelectPage.bind(this);
    }

    componentWillMount() {
        super.componentWillMount();
        this.unsubscribe = actions.getPost.completed.listen(
            p => this.props.history.push('/post/' + p.slug));
    }

    componentWillReceiveProps(nextProps) {
        const nl = nextProps.location;
        const l = this.props.location;
        if (nl.pathname !== l.pathname || nl.search !== l.search) {
            const state = nextProps.location.state;
            if (!state) {
                actions.searchPosts();
            } else {
                actions.searchPosts(state.q, state.page);
            }
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unsubscribe();
    }

    handleSearch(q, page) {
        const locationBeforeTransitions = this.props.location;
        const posts = this.state;
        const location = {};
        const query = {};

        if (!q || q == '') {
            location.pathname = '/';
        } else {
            location.pathname = '/posts';
            query.q = q;
        }

        if (page > 0) {
            query.page = page;
        }

        const search = qs(query);
        if (search !== '') {
            location.search = '?' + search;
        }

        if (location.pathname != locationBeforeTransitions.pathname ||
            location.search != locationBeforeTransitions.search) {
            this.props.history.push(location, query);
        }

        if (posts.pending || posts.q == q && posts.page == page) {
            return;
        }

        actions.searchPosts(q, page);
    }

    handleSelectPage(page) {
        this.handleSearch(this.state.q, page);
    }

    render() {
        const {q, pending, posts: {items, paging}} = this.state;
        const sidebar = (
            <>
                <SearchPostsWell q={q} pending={pending}
                    onSubmit={this.handleSearch} />
                <SignUpWell authenticated={this.props.authenticated} />
            </>
        );
        return (
            <Layout sidebar={sidebar}>
                <h1>
                    Keep It Simple <small>Welcome</small>
                </h1>
                {
                    items && items.map((p, i) => <PostItem key={i} item={p} />)
                }
                <Paging disabled={pending}
                    paging={paging}
                    onSelect={this.handleSelectPage} />
            </Layout>
        );
    }
}

Posts.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.shape({
            q: PropTypes.string,
            page: PropTypes.string
        })
    }),
    authenticated: PropTypes.bool
};

export default Posts;
