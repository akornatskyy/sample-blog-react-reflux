'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux');

var _ = require('../../shared/utils'),
    FormErrors = require('../../shared/components/form-errors'),
    Layout = require('../../shared/components/layout'),
    LeadBreak = require('../../shared/components/lead-break'),
    Media = require('../../shared/components/media');

var actions = require('../actions'),
    postStore = require('../stores/post');


var Alert = ReactBootstrap.Alert,
    Well = ReactBootstrap.Well,
    Input = ReactBootstrap.Input,
    Button = ReactBootstrap.Button,
    Glyphicon = ReactBootstrap.Glyphicon,
    Link = ReactRouter.Link,
    Navigation = ReactRouter.Navigation,
    ListenerMixin = Reflux.ListenerMixin;


var Post = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function() {
        var p = this.props.data,
            created = _.formatDateOrTime(p.created_on);

        return (
            <article>
                <h1>{p.title}</h1>
                <p className="lead">
                    by {p.author.first_name} {p.author.last_name}
                </p>
                <hr/>
                <p>
                    <Glyphicon glyph="time" /> Posted {created}
                </p>
                <hr/>
                <LeadBreak text={p.message} />
            </article>
        );
    }
});

var CommentWell = React.createClass({
    propTypes: {
        authenticated: React.PropTypes.bool.isRequired,
        permitted: React.PropTypes.bool.isRequired,
        disabled: React.PropTypes.bool,
        errors: React.PropTypes.object,
        onSubmit: React.PropTypes.func
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.props.onSubmit) {
            var m = this.refs.message.getInputDOMNode().value.trim();

            if (m) {
                this.props.onSubmit(m);
            }
        }
    },

    render: function() {
        if (this.props.authenticated && !this.props.permitted) {
            return (
                <Alert bsStyle="warning">
                    There are too many of your comments awaiting moderation.
                    Come back later, please.
                </Alert>
            );
        }

        if (!this.props.authenticated) {
            return (
                <Well>
                    <h4>Leave a Comment:</h4>
                    <Link to="signin">Sign in</Link>, please.
                    New comments are held for moderation.
                </Well>
            );
        }

        var disabled = this.props.disabled;

        return (
            <FormErrors errors={this.props.errors}>
                <Well>
                    <h4>Leave a Comment:</h4>
                    <form autoComplete="off"
                          onSubmit={!disabled && this.handleSubmit}>
                        <Input ref="message" type="textarea" rows="3" />
                        <Button disabled={disabled} bsStyle="primary"
                                type="submit">
                            Submit
                        </Button>
                    </form>
                </Well>
            </FormErrors>
        );
    }
});

var CommentItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },

    render: function() {
        var c = this.props.item,
            gravatarUrl = 'http://www.gravatar.com/avatar/' +
                          c.author.gravatar_hash + '?s=64&d=identicon',
            heading = (
                <div>
                    {c.author.first_name } {c.author.last_name} <small>
                        {_.formatDateOrTime(c.created_on)}
                    </small>
                </div>
            );

        return (
            <Media src={gravatarUrl} heading={heading}>
                <p className={!c.moderated ? 'text-dim' : null}>
                    {c.message}
                </p>
            </Media>
        );
    }
});

var Comments = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        var items = this.props.items;

        if (!items || items.length === 0) {
            return null;
        }

        var comments = [];

        for (var i in items) {
            comments.push(<CommentItem key={i} item={items[i]} />);
        }

        return <section><hr/>{comments}</section>;
    }
});

module.exports = React.createClass({
    mixins: [
        Reflux.connect(postStore),
        ListenerMixin,
        Navigation
    ],

    componentDidMount: function() {
        this.listenTo(actions.addPostComment.completed,
                      this.onAddPostCommentCompleted);
    },

    handleSubmit: function(message) {
        actions.addPostComment(this.state.post.slug, message);
    },

    onAddPostCommentCompleted: function() {
        this.transitionTo('moderation', this.props.params);
    },

    render: function() {
        var p = this.state.post,
            permitted = p.permissions && p.permissions.create_comment;

        return (
            <Layout>
                <Post data={p} />
                <hr/>
                <CommentWell authenticated={!!this.props.user}
                             permitted={permitted}
                             disabled={this.state.pending}
                             errors={this.state.errors}
                             onSubmit={this.handleSubmit} />
                <Comments items={p.comments} />
            </Layout>
        );
    }
});
