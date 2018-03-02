import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

export default () =>
    createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware())));