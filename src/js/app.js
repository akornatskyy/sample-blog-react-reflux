import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import actions from './actions';
import routes from './routes';

import './app.scss';

actions.getDailyQuote();
actions.searchPosts();
actions.user();

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('root')
);
