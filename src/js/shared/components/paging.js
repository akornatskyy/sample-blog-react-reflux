'use strict';

var React = require('react'),
    ReactBootstrap = require('react-bootstrap');


var Pager = ReactBootstrap.Pager,
    PageItem = ReactBootstrap.PageItem;


module.exports = React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool,
        paging: React.PropTypes.object,
        onSelect: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {disabled: false};
    },

    render: function() {
        var newer, older,
            disabled = this.props.disabled,
            paging = this.props.paging;

        if (!paging) {
            return null;
        }

        if (paging.before !== undefined) {
            newer = (
                <PageItem previous disabled={disabled}
                          eventKey={paging.before}>
                    &larr; Newer
                </PageItem>
            );
        }

        if (paging.after !== undefined) {
            older = (
                <PageItem next disabled={disabled}
                          eventKey={paging.after}>
                    Older &rarr;
                </PageItem>
            );
        }

        if (!newer && !older) {
            return null;
        }

        return (
            <Pager onSelect={this.props.onSelect}>
                {newer}
                {older}
            </Pager>
        );
    }
});
