import { Heroes } from '../HomePage';

export const GET_HEROES = 'GET_HEROES';
export const LOAD_HEROES = 'LOAD_HEROES';
export const LOAD_HEROES_BY_NAME = 'LOAD_HEROES_BY_NAME';
export const ERROR = 'ERROR';

export interface HeroesInitialState {
  heroes: Array<Heroes>,
  loading: boolean,
  error: Error | null
  }

const initialState = {
  heroes: [],
  loading: true,
  error: null
}

export const heroesReducer = (state: HeroesInitialState = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case GET_HEROES:
      return {
        ...state,
        heroes: action.payload,
        loading: false,
        error: ''
      }
       case ERROR:
      return {
        state: initialState,
        loading: false,
        error: 'ERROR'
      }
    default:
      return state;
  }
}

export const heroesActionCreator = (heroes: Array<Heroes>) => ({ type: GET_HEROES, payload: heroes })
export const loadingHeroesActionCreator = () => ({ type: LOAD_HEROES })
export const loadingHeroesActionCreatorByName = (nameCharacter: string) =>
({ type: LOAD_HEROES_BY_NAME, payload: nameCharacter })
export const errorHeroesActionCreator = (error: Error | null) => ({ type: ERROR, payload: error })