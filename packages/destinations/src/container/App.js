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
            <Route exact path={'/destinations/configuration'} render={props => <ConfigurationContainer />} />
            <Route component={DestinationContainer} />
        </Switch>
    </HashRouter>
);

const DestinationContainer = () => (
    <Provider store={store}>
        <Fragment>
            <Layout heading="Destinations">
                <Nav routes={routes} />
                {routes.map(({ route, name }) => (
                    <Route
                        exact
                        path={route}
                        key={route}
                        render={props =>
                            route === '/' ? (
                                <Redirect to="/destinations" />
                            ) : (
                                <Destinations {...props} destinationType={name} />
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
