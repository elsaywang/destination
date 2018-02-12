import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
        <HashRouter>
            <Fragment>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/all-signals" component={SearchContainer} />
                    <Route exact path="/aa" component={SearchContainer} />
                    <Route exact path="/other" component={SearchContainer} />
                    <Route exact path="/onboarded" component={SearchContainer} />
                </Switch>
            </Fragment>
        </HashRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
