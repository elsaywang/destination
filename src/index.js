import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import SearchContainer from './SearchContainer/SearchContainer';

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path="/" component={SearchContainer} />
        </Switch>
    </HashRouter>
), document.getElementById('root'));
