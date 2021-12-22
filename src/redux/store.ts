import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { comicsReducer, GET_COMICS_BY_ID, LOAD_COMICS } from './comicsReduser';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { heroesReducer } from './heroesReduser';
import { rootSaga } from '../rootSaga';

export const sagaMiddleware = createSagaMiddleware();

const composeEncancer = composeWithDevTools({ trace: true });

const reducers = combineReducers({
  comicsPage: comicsReducer,
  heroesPage: heroesReducer
})

const store = createStore(
  reducers,
  composeEncancer( 
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store


