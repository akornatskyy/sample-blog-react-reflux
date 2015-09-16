'use strict';

var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux');

var Layout = require('../../shared/components/layout');


var Navigation = ReactRouter.Navigation,
    ListenerMixin = Reflux.ListenerMixin;

var actions = require('../actions');


module.exports = React.createClass({
    mixins: [
        ListenerMixin,
        Navigation
    ],

    componentDidMount: function() {
        this.listenTo(actions.loadPost.completed, this.goBack);
        this.timer = setTimeout(this.loadPost, 10000);
    },

    componentWillUnmount: function() {
        clearTimeout(this.timer);
    },

    handleClick: function(e) {
        e.preventDefault();
        this.loadPost();
    },

    loadPost: function() {
        actions.loadPost(this.props.params.slug);
    },

    render: function() {
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
});
