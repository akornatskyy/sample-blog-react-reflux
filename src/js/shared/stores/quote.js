import Reflux from 'reflux';

import actions from '../actions';


class QuoteStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {};
        this.listenables = actions;
    }

    onGetDailyQuoteCompleted(quote) {
        this.setState({quote: quote});
    }
}

export default Reflux.initStore(QuoteStore);
