import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { getCharacterByName, getCharacters } from './api';
import { errorHeroesActionCreator, heroesActionCreator } from './redux/heroesReduser';
import { GET_HEROES_REQUEST } from './redux/heroesReduser';
 
export function* heroesSaga (action: any): Generator {
  try {
    if(action.payload){
    const heroes: any = yield call(getCharacterByName, action.payload);
    yield put(heroesActionCreator(heroes))
    } else{
      const heroes: any = yield call(getCharacters);
    yield put(heroesActionCreator(heroes))
    }
  } catch (error) {
    yield put(errorHeroesActionCreator(error));
  }
}
export function* watchLoadHeroesSaga(): Generator {
  yield  takeEvery(GET_HEROES_REQUEST, heroesSaga)
  
}



