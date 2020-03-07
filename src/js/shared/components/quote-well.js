import React from 'react';
import Reflux from 'reflux';
import {Card} from 'react-bootstrap';

import quoteStore from '../stores/quote';


class QuoteWell extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = quoteStore;
    }

    render() {
        const quote = this.state.quote;

        if (!quote) {
            return null;
        }

        return (
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Quote of the Day</Card.Title>
                    <Card.Text>
                        <q>{quote.message}</q>
                        <i> — {quote.author}</i>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default QuoteWell;
