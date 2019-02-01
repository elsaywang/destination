import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import Nav from '../components/Nav';
import Layout from '../components/Layout';
import Destinations from './Destinations';
import Configuration from './Configuration';
import configureStore from '../configureStore';
import { routes } from '../constants/navTab';
const store = configureStore();

const App = () => (
    <HashRouter>
        <Switch>
            <Route
                exact
                path={'/destinations/configuration'}
                render={props => <ConfigurationContainer />}
            />
            <Route component={DestinationContainer} />
        </Switch>
    </HashRouter>
);

const DestinationContainer = () => (
    <Provider store={store}>
        <Fragment>
            <Layout heading="Destinations">
                <Nav routes={routes} />
                {routes.map(item => (
                    <Route
                        exact
                        path={item.route}
                        key={item.route}
                        render={props =>
                            item.route === '/' ? (
                                <Redirect to="/destinations" />
                            ) : (
                                <Destinations {...props} currentDestination={item} />
                            )
                        }
                    />
                ))}
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
