import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import actions from './actions';
import routes from './routes';

import './app.scss';

actions.getDailyQuote();
actions.searchPosts();
actions.user();

ReactDOM.render(
    <Router basename={window.location.pathname}>
        {routes}
    </Router>,
    document.getElementById('root')
);
