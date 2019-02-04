import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Nav from '../components/Nav';
import Layout from '../components/Layout';
import Destinations from './Destinations';
import Configuration from './Configuration';
import configureStore from '../configureStore';
import { routes } from '../constants/navTab';
const store = configureStore();

const App = () => (
    <BrowserRouter basename="/portal">
        <Switch>
            <Route
                exact
                path={'/administration/integrated-accounts'}
                component={ConfigurationContainer}
            />
            <Route exact path="/destinations" render={() => <Redirect to="/destinations/all" />} />
            {routes.map(routeObject => (
                <Route
                    key={routeObject.route}
                    path={routeObject.route}
                    render={() => <DestinationContainer routeObject={routeObject} />}
                />
            ))}
            <Route path="/destinations" render={() => <Redirect to="/destinations/all" />} />
        </Switch>
    </BrowserRouter>
);

const DestinationContainer = ({ routeObject }) => (
    <Provider store={store}>
        <Fragment>
            <Layout heading="Destinations">
                <Nav routes={routes} />
                <Route
                    path={routeObject.route}
                    render={() => <Destinations currentDestination={routeObject} />}
                />
            </Layout>
        </Fragment>
    </Provider>
);

const ConfigurationContainer = () => (
    <Layout heading="Configuration">
        <Configuration />
    </Layout>
);
export default App;
