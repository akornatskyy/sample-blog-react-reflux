import $ from '../../shared/ajax';


export default {
    dailyQuote: function() {
        return $.get('/api/v1/quote/daily');
    }
};
