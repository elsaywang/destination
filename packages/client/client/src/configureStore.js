import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './redux/reducers';

//TODO: create the actual store once reducers are filled and remove the empty store placeholder
export default () =>
    //createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware())))
    createStore(() => {});
