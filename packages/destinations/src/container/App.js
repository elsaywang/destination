import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
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
            <Route exact path={'/administration/integrated-accounts'} component={ConfigurationContainer} />
            <Route exact path="/" render={() => (  <Redirect to="/destinations/all"/>)} />
            <Route path='/destinations' render={DestinationContainer} />
        </Switch>
    </BrowserRouter>
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
                            component={props =>
                                <Destinations {...props} currentDestination={item} />
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
