import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Nav from '../components/Nav';
import Layout from '../components/Layout';
import Destinations from './Destinations';
import IntegratedAccounts from './IntegratedAccounts';
import configureStore from '../configureStore';
import { routes } from '../constants/navTab';
const store = configureStore();

const App = () => (
    <BrowserRouter basename="/portal">
        <Switch>
            <Route
                exact
                path={'/administration/integrated-accounts'}
                component={IntegratedAccountsContainer}
            />
            <Route exact path="/destinations" render={() => <Redirect to="/destinations/all" />} />
            {routes.map(routeObject => (
                <Route
                    key={routeObject.route}
                    path={routeObject.route}
                    render={() => <DestinationContainer routeObject={routeObject} />}
                />
            ))}
        </Switch>
    </BrowserRouter>
);

const DestinationContainer = ({ routeObject }) => (
    <Provider store={store}>
        <Fragment>
            <Layout heading="Destinations">
                <Nav routes={routes} />
                <Destinations currentDestination={routeObject} />
            </Layout>
        </Fragment>
    </Provider>
);

const IntegratedAccountsContainer = () => (
    <Layout heading="Integrated Accounts">
        <IntegratedAccounts />
    </Layout>
);
export default App;
