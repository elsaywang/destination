import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import './polyfills';
import { getLocaleData } from './lib/i18n';
import configureStore from './configureStore';
import Layout from './components/Layout';
import Nav from './components/Nav';
import DashboardContainer from './containers/DashboardContainer';
import SearchContainer from './containers/SearchContainer';
import Footer from './components/Footer';
import './lib/tour-guide';
import './lib/tour-guide-initializer';
import '@aam/aam-topnav';

const { locale, messages } = getLocaleData();
const store = configureStore();

ReactDOM.render(
    <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
            <HashRouter>
                <Fragment>
                    <Layout>
                        <Nav />
                        <Switch>
                            <Route exact path="/" component={DashboardContainer} />
                            <Route exact path="/search" component={SearchContainer} />
                        </Switch>
                    </Layout>
                    <Footer />
                </Fragment>
            </HashRouter>
        </Provider>
    </IntlProvider>,
    document.getElementById('root'),
);
