import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Layout from './Layout';
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import SearchContainer from './SearchContainer/SearchContainer';
import '@react/react-spectrum/page';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Layout>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/search" component={SearchContainer} />
                </Switch>
            </Layout>
        </HashRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
