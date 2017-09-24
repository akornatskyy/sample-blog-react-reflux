import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import actions from './actions';
import routes from './routes';

import './app.scss';

actions.getDailyQuote();
actions.searchPosts();
actions.user();

ReactDOM.render(
    <BrowserRouter basename={window.location.pathname}>
        {routes}
    </BrowserRouter>,
    document.getElementById('root')
);
