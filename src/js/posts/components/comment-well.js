import React from 'react';
import PropTypes from 'prop-types';
import {Card, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
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
                <Alert variant="warning">
                    There are too many of your comments awaiting moderation.
                    Come back later, please.
                </Alert>
            );
        }

        if (!authenticated) {
            return (
                <Card bg="light">
                    <Card.Body>
                        <Card.Title>Leave a Comment:</Card.Title>
                        <Card.Text>
                            <Link to="/signin">Sign in</Link>, please.
                            New comments are held for moderation.
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }

        const {disabled, errors} = this.props;

        return (
            <div>
                <Errors.Summary />
                <Card bg="light">
                    <Card.Body>
                        <Card.Title>Leave a Comment:</Card.Title>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <FormControl as="textarea"rows="3"
                                    disabled={disabled}
                                    ref={(e) => this.message = e}
                                    isInvalid={!!errors.message} />
                                <Errors.Field name="message" />
                            </FormGroup>
                            <Button disabled={disabled}
                                type="submit">
                                Submit
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
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
