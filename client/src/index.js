import '@react/react-spectrum/page';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Nav from './components/Nav';
import SearchContainer from './containers/SearchContainer';

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
