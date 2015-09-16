'use strict';

var React = require('react');


module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <hr />
                <p className="small">
                    This is a private system. Unauthorized access to or use
                    of this system is strictly prohibited and tracked. By
                    continuing, you acknowledge your awareness of and
                    concurrence with the acceptable use policy.
                </p>
                <p className="small">
                    As you finish, you should sign out to protect yourself.
                </p>
            </div>
        );
    }
});
