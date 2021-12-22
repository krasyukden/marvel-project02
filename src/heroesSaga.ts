import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { getCharacterByName, getCharacters } from './api';
import { errorHeroesActionCreator, heroesActionCreator, LOAD_HEROES, LOAD_HEROES_BY_NAME } from './redux/heroesReduser';



export function* heroesSagaDefault(): Generator {
  try {
    const heroes: any = yield call(getCharacters);
    yield put(heroesActionCreator(heroes))
  } catch (error: any) {
    yield put(errorHeroesActionCreator(error));
  }
}

export function* heroesSagaByName(action: any): Generator {
  try {
    const heroes: any = yield call(getCharacterByName, action.payload);
    yield put(heroesActionCreator(heroes))
  } catch (error: any) {
    yield put(errorHeroesActionCreator(error));
  }
}

export function* watchLoadHeroesSaga(): Generator {
  yield all([
    takeEvery(LOAD_HEROES_BY_NAME, heroesSagaByName),
    takeEvery(LOAD_HEROES, heroesSagaDefault)
  ])
}

