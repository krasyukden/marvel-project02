import { ComicsSection } from "../ComicsPage";

export const LOAD_COMICS = 'LOAD_COMICS';
export const GET_COMICS_BY_ID = 'GET_COMICS_BY_ID';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

interface ComicsInitialState {
  comics: Array<ComicsSection>,
  loading: boolean,
  error: Error | null
}

const initialState = {
  comics: [],
  loading: true,
  error: null
}

export const comicsReducer = (state: ComicsInitialState = initialState, action: any) => {
  switch (action.type) {
    case LOAD_COMICS:
      return {
        state: initialState,
        loading: true,
        error: ''
      }
    case GET_COMICS_BY_ID:
      return {
        ...state,
        comics: action.payload,
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

export const comicsActionCreatorById = (comics: Array<ComicsSection>) => ({ type: GET_COMICS_BY_ID, payload: comics })
export const loadComicsActionCreator = (characterId: string) => ({ type: LOAD_COMICS, payload: characterId })
export const errorActionCreator = (error: Error | null | any) => ({ type: ERROR, payload: error })



