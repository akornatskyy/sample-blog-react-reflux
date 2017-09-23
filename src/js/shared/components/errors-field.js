import React from 'react';
import PropTypes from 'prop-types';
import {HelpBlock} from 'react-bootstrap';


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
            <HelpBlock>{errors}</HelpBlock>
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