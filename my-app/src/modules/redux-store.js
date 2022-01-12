import wsMiddleware from '../middleware/middleware';
import reduxThunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import { chatReducer } from './game';

let reducers = combineReducers({
    chat: chatReducer
});

const middleware = [reduxThunk, wsMiddleware];

let store = createStore(
    reducers, 
    applyMiddleware(...middleware)
    );

export default store;