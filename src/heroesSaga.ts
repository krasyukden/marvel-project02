import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { getCharacterByName, getCharacters } from './api';
import { Heroes, HomeState } from './HomePage';
import { errorHeroesActionCreator, heroesActionCreator } from './redux/heroesReduser';
import { GET_HEROES_REQUEST } from './redux/heroesReduser';
 
export function* heroesSaga (action: any): Generator {
  try {
    if(action.payload){
    const heroes = yield call(getCharacterByName, action.payload);
    yield put(heroesActionCreator(heroes as Heroes[]))
    } else{
      const heroes = yield call(getCharacters);
    yield put(heroesActionCreator(heroes as Heroes[]))
    }
  } catch (error) {
    yield put(errorHeroesActionCreator(error));
  }
}
export function* watchLoadHeroesSaga(): Generator {
  yield  takeEvery(GET_HEROES_REQUEST, heroesSaga)
  
}



