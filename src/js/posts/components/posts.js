import React from 'react';
import Reflux from 'reflux';

import Layout from '../../shared/components/layout';
import SignUpWell from '../../shared/components/signup-well';
import Paging from '../../shared/components/paging';
import SearchPostsWell from './search-posts-well';
import PostItem from './post-item';

import actions from '../actions';
import postsStore from '../stores/posts';


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
            p => this.props.router.push('/post/' + p.slug));
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.unsubscribe();
    }

    handleSearch(q, page) {
        const locationBeforeTransitions = this.props.location;
        const posts = this.state.posts;
        const location = {query: {}};

        if (q == '') {
            location.pathname = '/';
        } else {
            location.pathname = '/posts';
            location.query.q = q;
        }

        if (page > 0) {
            location.query.page = page;
        }

        if (location.pathname != locationBeforeTransitions.pathname ||
                location.query.q != locationBeforeTransitions.query.q ||
                location.query.page != locationBeforeTransitions.query.page) {
            this.props.router.push(location);
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
        const {q, pending, posts} = this.state;
        const sidebar = (
            <div>
                <SearchPostsWell q={q} pending={pending}
                    onSubmit={this.handleSearch} />
                <SignUpWell user={this.props.user} />
            </div>
        );

        return (
            <Layout sidebar={sidebar}>
                <h1>
                    Keep It Simple <small>Welcome</small>
                </h1>
                {
                    posts.items.map((p, i) => <PostItem key={i} item={p} />)
                }
                <Paging disabled={pending}
                    paging={posts.paging}
                    onSelect={this.handleSelectPage} />
            </Layout>
        );
    }
}

export default Posts;
