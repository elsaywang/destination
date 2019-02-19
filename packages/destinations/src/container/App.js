import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './App.css';
import { Provider } from 'react-redux';
import queryString from 'query-string';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Nav from '../components/Nav';
import Layout from '../components/Layout';
import Destinations from './Destinations';
import IntegratedAccounts from './IntegratedAccounts';
import configureStore from '../configureStore';
import { routes } from '../constants/navTab';
import { integratedPlatformsOptions } from '../constants/integratedPlatformsOptions';
import {
    applySearch,
    applyFilter,
    updateIntegratedPlatformType,
    fetchDestinations,
} from '../redux/actions/destinations';
import { applySort } from '../redux/actions/tableActions';
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
                    render={({ location }) => (
                        <DestinationContainer location={location} routeObject={routeObject} />
                    )}
                />
            ))}
        </Switch>
    </BrowserRouter>
);

class DestinationContainer extends Component {
    updateStateToReflectUrl = () => {
        const parsedParams = queryString.parse(this.props.location.search);
        const currentDestination = this.props.routeObject;
        const currentSubroute = _.last(
            this.props.location.pathname.split(currentDestination.route),
        );

        if (!_.isEmpty(currentSubroute)) {
            const currentPlatform = integratedPlatformsOptions.find(
                ({ subroute }) => subroute === currentSubroute,
            );

            store.dispatch(updateIntegratedPlatformType(currentPlatform.value));
            store.dispatch(applyFilter(currentPlatform.serverTypes));
        } else {
            store.dispatch(applyFilter(currentDestination.types));
        }

        if (parsedParams['sort']) {
            const [sortDirection, sortColumn] = _.tail(parsedParams['sort'].match('^(-)?(.*)'));
            store.dispatch(
                applySort({
                    sortDirection: sortDirection ? -1 : 1,
                    sortColumn,
                }),
            );
        } else {
            store.dispatch(
                applySort({
                    sortDirection: 1,
                    sortColumn: 'destinationId',
                }),
            );
        }

        store.dispatch(applySearch(parsedParams['search'] || ''));
        store.dispatch(fetchDestinations());
    };

    componentDidUpdate() {
        this.updateStateToReflectUrl();
    }

    componentDidMount() {
        this.updateStateToReflectUrl();
    }

    render() {
        const { routeObject, location } = this.props;
        return (
            <Provider store={store}>
                <Fragment>
                    <Layout heading="Destinations">
                        <Nav routes={routes} />
                        <Switch>
                            {routeObject.name === 'Integrated Platforms' ? (
                                [
                                    integratedPlatformsOptions.map(({ value, subroute }) => (
                                        <Route
                                            exact
                                            key={value}
                                            path={routeObject.route + subroute}
                                            render={() => (
                                                <Destinations currentDestination={routeObject} />
                                            )}
                                        />
                                    )),
                                    <Route
                                        key={`no_match_${routeObject.name}`}
                                        path={'/destinations/integratedPlatforms'}
                                        render={() => (
                                            <Redirect to="/destinations/integratedPlatforms" />
                                        )}
                                    />,
                                ]
                            ) : (
                                <Destinations
                                    currentDestination={routeObject}
                                    subroute={_.last(location.pathname.split(routeObject.route))}
                                />
                            )}
                        </Switch>
                    </Layout>
                </Fragment>
            </Provider>
        );
    }
}

const IntegratedAccountsContainer = () => (
    <Layout heading="Integrated Accounts">
        <IntegratedAccounts />
    </Layout>
);
export default App;
