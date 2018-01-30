import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import SearchContainer from './SearchContainer/SearchContainer';
import '@react/react-spectrum/page';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Nav />
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/all-signals" component={SearchContainer} />
                    <Route exact path="/aa" component={SearchContainer} />
                    <Route exact path="/other" component={SearchContainer} />
                    <Route exact path="/onboarded" component={SearchContainer} />
                </Switch>
            </Fragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
