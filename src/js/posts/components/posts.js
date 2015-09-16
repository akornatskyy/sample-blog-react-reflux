'use strict';

var React = require('react'),
    ReactRouter = require('react-router'),
    ReactBootstrap = require('react-bootstrap'),
    Reflux = require('reflux');

var _ = require('../../shared/utils'),
    Layout = require('../../shared/components/layout'),
    Paging = require('../../shared/components/paging'),
    SignUpWell = require('../../shared/components/signup-well');

var actions = require('../actions'),
    postsStore = require('../stores/posts');


var Well = ReactBootstrap.Well,
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button,
    Glyphicon = ReactBootstrap.Glyphicon,
    Navigation = ReactRouter.Navigation,
    ListenerMixin = Reflux.ListenerMixin;


var PostItem = React.createClass({
    handleClick: function(e) {
        e.preventDefault();
        actions.loadPost(this.props.item.slug);
    },

    render: function() {
        var p = this.props.item,
            created = _.formatDateOrTime(p.created_on);

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
                    <Glyphicon glyph="time" /> Posted {created}
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
});

var Posts = React.createClass({
    render: function() {
        var p, items = [];

        for (var i in this.props.items) {
            p = this.props.items[i];
            items.push(<PostItem key={i} item={p} />);
        }

        return (
            <div>
                {items}
            </div>
        );
    }
});

var SearchPostsWell = React.createClass({
    propTypes: {
        q: React.PropTypes.string,
        onSubmit: React.PropTypes.func
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.props.onSubmit) {
            var q = this.refs.q.getInputDOMNode().value.trim();

            this.props.onSubmit(q);
        }
    },

    render: function() {
        var search = (
            <Button disabled={this.props.disabled} type="submit">
                <Glyphicon glyph="search" />
            </Button>
        );

        return (
            <Well>
                <h4>Blog Search</h4>
                <form autoComplete="off"
                      onSubmit={this.handleSubmit}>
                    <Input name="q" ref="q" type="text" standalone
                        defaultValue={this.props.q}
                        buttonAfter={search} />
                </form>
            </Well>
        );
    }
});

module.exports = React.createClass({
    mixins: [
        Reflux.connect(postsStore),
        ListenerMixin,
        Navigation
    ],

    componentDidMount: function() {
        this.listenTo(actions.loadPost.completed, this.onLoadPostCompleted);
    },

    handleSearch: function(q) {
        actions.searchPosts(q);
        this.transitionTo('posts', null, q ? {q: q} : null);
    },

    handleSelectPage: function(page) {
        var query = {}, q = this.state.q;

        actions.searchPosts(this.state.q, page);

        if (q) {
            query.q = q;
        }

        if (page > 0) {
            query.p = page;
        }

        this.transitionTo('posts', null, query);
    },

    onLoadPostCompleted: function(p) {
        this.transitionTo('post', {slug: p.slug});
    },

    render: function() {
        var sidebar = (
            <div>
                <SearchPostsWell q={this.state.q}
                                 onSubmit={this.handleSearch} />
                <SignUpWell user={this.props.user} />
            </div>
        );

        return (
            <Layout sidebar={sidebar}>
                <h1>
                    Keep It Simple <small>Welcome</small>
                </h1>
                <Posts items={this.state.posts.items} />
                <Paging disabled={this.state.pending}
                        paging={this.state.posts.paging}
                        onSelect={this.handleSelectPage} />
            </Layout>
        );
    }
});
