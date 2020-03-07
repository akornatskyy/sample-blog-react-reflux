import React from 'react';
import PropTypes from 'prop-types';


class ErrorsField extends React.Component {
    render() {
        let errors = this.props.errors || this.context.errors;

        if (!errors) {
            return null;
        }

        errors = errors[this.props.name];
        if (!errors) {
            return null;
        }

        if (Array.isArray(errors)) {
            errors = errors[errors.length - 1];
        }

        return (
            <div className="invalid-feedback">
                <i className="fa fa-exclamation"></i> {errors}
            </div>
        );
    }
}

ErrorsField.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.object
};

ErrorsField.contextTypes = {
    errors: ErrorsField.propTypes.errors
};

export default ErrorsField;
