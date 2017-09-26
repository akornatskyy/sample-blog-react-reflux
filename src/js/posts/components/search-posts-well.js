import React from 'react';
import PropTypes from 'prop-types';
import {
    Well, InputGroup, FormControl, Button, Glyphicon
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
            <Well>
                <h4>Blog Search</h4>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <FormControl inputRef={ ref => {
                            this.q = ref;
                        }}
                        defaultValue={q} />
                        <InputGroup.Button>
                            <Button disabled={pending} type="submit">
                                <Glyphicon glyph="search" />
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </form>
            </Well>
        );
    }
}

SearchPostsWell.propTypes = {
    q: PropTypes.string,
    pending: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default SearchPostsWell;
