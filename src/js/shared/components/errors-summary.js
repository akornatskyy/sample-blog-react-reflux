import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Glyphicon} from 'react-bootstrap';


class ErrorsSummary extends React.Component {
    render() {
        let errors = this.props.errors || this.context.errors;

        if (!errors) {
            return null;
        }

        errors = errors.__ERROR__;
        if (!errors) {
            return null;
        }

        if (Array.isArray(errors)) {
            errors = errors[errors.length - 1];
        }

        return (
            <Alert bsStyle="danger">
                <Glyphicon glyph="exclamation-sign" /> {errors}
            </Alert>
        );
    }
}

ErrorsSummary.propTypes = {
    errors: PropTypes.shape({
        __ERROR__: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    })
};

ErrorsSummary.contextTypes = {
    errors: ErrorsSummary.propTypes.errors
};

export default ErrorsSummary;