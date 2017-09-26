import React from 'react';
import PropTypes from 'prop-types';
import {Well, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Errors from '../../shared/components/errors';


class CommentWell extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getChildContext() {
        return {errors: this.props.errors};
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.disabled && this.props.onSubmit) {
            const m = this.message.value.trim();

            if (m) {
                this.props.onSubmit(m);
            }
        }
    }

    render() {
        const {authenticated, permitted} = this.props;

        if (authenticated && !permitted) {
            return (
                <Alert bsStyle="warning">
                    There are too many of your comments awaiting moderation.
                    Come back later, please.
                </Alert>
            );
        }

        if (!authenticated) {
            return (
                <Well>
                    <h4>Leave a Comment:</h4>
                    <Link to="/signin">Sign in</Link>, please.
                    New comments are held for moderation.
                </Well>
            );
        }

        const {disabled, errors} = this.props;

        return (
            <div>
                <Errors.Summary />
                <Well>
                    <h4>Leave a Comment:</h4>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <FormGroup validationState={errors.message && 'error'}>
                            <FormControl rows="3" disabled={disabled}
                                inputRef={ ref => {
                                    this.message = ref;
                                }}
                                componentClass="textarea" />
                            <FormControl.Feedback />
                            <Errors.Field name="message" />
                        </FormGroup>
                        <Button disabled={disabled} bsStyle="primary"
                            type="submit">
                            Submit
                        </Button>
                    </form>
                </Well>
            </div>
        );
    }
}

CommentWell.propTypes = {
    authenticated: PropTypes.bool,
    permitted: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    onSubmit: PropTypes.func
};

CommentWell.childContextTypes = {
    errors: CommentWell.propTypes.errors
};

export default CommentWell;
