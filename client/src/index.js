import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import './polyfills';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Nav from './components/Nav';
import SearchContainer from './containers/SearchContainer';

ReactDOM.render(
    <Provider store={configureStore()}>
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
