import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import bookingReducer from './reducer';

const rootReducer = combineReducers({bookingReducer});
export default rootReducer;
export type State = ReturnType<typeof rootReducer>
export const Store = createStore(rootReducer, applyMiddleware(thunk));
