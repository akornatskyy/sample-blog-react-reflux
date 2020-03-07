import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';


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
            <Alert variant="danger">
                <i className="fa fa-exclamation-circle"></i> {errors}
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
