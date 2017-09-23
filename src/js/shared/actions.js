import api from 'api';

import actions from '../actions';


actions.getDailyQuote.listenAndPromise(api.dailyQuote);

export default actions;
