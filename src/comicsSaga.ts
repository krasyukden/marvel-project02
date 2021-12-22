import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { take, takeEvery, takeLatest, takeLeading, put, call, all } from 'redux-saga/effects';
import { getComicsByCharacter } from "./api";
import { ComicsSection, ComicsState, ComicsProps } from "./ComicsPage";
import { errorActionCreator, GET_COMICS_BY_ID, LOAD_COMICS } from "./redux/comicsReduser";
import { comicsActionCreatorById, ERROR } from "./redux/comicsReduser";
import React from 'react';
import { matchPath } from "react-router";
import { Provider } from 'react-redux';
import { sagaMiddleware } from "./redux/store";

function* workerComicsSaga(action: any): Generator {
  try {
    const comics: any = yield call(getComicsByCharacter, action.payload);
    yield put(comicsActionCreatorById(comics))
  } catch (error) {
    yield put(errorActionCreator(error));
  }
}

export function* watchLoadComicsSaga(): Generator {
  yield takeEvery(LOAD_COMICS, workerComicsSaga)
}


