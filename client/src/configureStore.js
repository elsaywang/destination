import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

export default () =>
    createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware())));
