import React from 'react';
import Reflux from 'reflux';
import {Well} from 'react-bootstrap';

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
            <Well>
                <h4>Quote of the Day</h4>
                <p>
                    <q>{quote.message}</q>
                    <i> — {quote.author}</i>
                </p>
            </Well>
        );
    }
}

export default QuoteWell;
