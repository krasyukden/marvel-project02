import { Heroes, LoadHerosAction } from '../HomePage';
import { Action, Reducer } from 'redux';
export const GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS';
export const GET_HEROES_REQUEST = 'GET_HEROES_REQUEST';
export const GET_HEROES_ERROR = 'GET_HEROES_ERROR';

export interface HeroesInitialState {
  heroes: Array<Heroes>,
  loading: boolean,
  error: Error | null
}

export interface HeroesAction {
  type: string,
  payload: Array<Heroes>
}

export interface HeroesState {
  heroes: Array<Heroes>,
  loading: boolean,
  error: Error | null,
  heroesPage: { heroes: Array<Heroes>; loading: boolean; error: null; }
}
export interface HeroesAction {
  type: string,
  payload: Array<Heroes>
}

const initialState = {
  heroes: [],
  loading: true,
  error: null
}

export const heroesReducer = (state: HeroesInitialState = initialState, action: LoadHerosAction) => {
  console.log(action)
  switch (action.type) {
    case GET_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload,
        loading: false,
        error: false
      }
    case GET_HEROES_ERROR:
      return {
        state: initialState,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export const heroesActionCreator = (heroes: Array<Heroes>) => ({ type: GET_HEROES_SUCCESS, payload: heroes })
export const loadingHeroesActionCreator = (nameCharacter: string | null) =>
  ({ type: GET_HEROES_REQUEST, payload: nameCharacter })
export const errorHeroesActionCreator = (error: Error | null | any) => ({ type: GET_HEROES_ERROR, payload: error })