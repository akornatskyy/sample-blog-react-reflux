import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, InputGroup, FormControl, Button
} from 'react-bootstrap';


class SearchPostsWell extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.props.pending && this.props.onSubmit) {
            this.props.onSubmit(this.q.value.trim());
        }
    }

    render() {
        const {q, pending} = this.props;

        return (
            <Card bg="light" className="mb-3">
                <Card.Body>
                    <Card.Title>Blog Search</Card.Title>
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <InputGroup>
                            <FormControl defaultValue={q}
                                ref={(e) => this.q = e} />
                            <InputGroup.Append>
                                <Button disabled={pending}
                                    variant="secondary" >
                                    <i className="fa fa-search"></i>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </Card.Body>
            </Card>
        );
    }
}

SearchPostsWell.propTypes = {
    q: PropTypes.string,
    pending: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default SearchPostsWell;
