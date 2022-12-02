import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';
import { persistMiddlware } from './midleware/state-middleware';

export const store = createStore(reducers, {}, applyMiddleware(
    thunk,
    persistMiddlware
  ));