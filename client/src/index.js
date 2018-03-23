import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import './polyfills';
import { getLocaleData } from './lib/i18n';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Nav from './components/Nav';
import SearchContainer from './containers/SearchContainer';

const { locale, messages } = getLocaleData();
const store = configureStore();

ReactDOM.render(
    <IntlProvider locale={locale} messages={messages}>
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
        </Provider>
    </IntlProvider>,
    document.getElementById('root'),
);

registerServiceWorker();
