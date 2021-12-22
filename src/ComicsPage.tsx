import React from 'react';
import { matchPath } from "react-router";
import styles from './comicsPage.module.css';
import { getComicsByCharacter } from './api';
import Preloader from './Preloader';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connect } from 'react-redux';
import { comicsActionCreatorById, GET_COMICS_BY_ID } from './redux/comicsReduser';
import { loadComicsActionCreator } from './redux/comicsReduser';

export interface ComicsProps {
  match: {
    params: {
      charachterId: string;
    }
  },
  comics: Array<ComicsSection>,
  loading: boolean,
  isLoading: boolean,
  loadComicsDispatch: any
}

export interface ComicsState {
  comics: Array<ComicsSection>,
  loading: boolean,
  isLoading: boolean,
  loadComicsDispatch: any
}

export interface ComicsSection {
  title: string,
  id: number,
  thumbnail: {
    path: string,
    extension: string
  }
  prices: Array<PricesItem>,
  description: string
}

interface PricesItem {
  price: number
}

class ComicsPage extends React.Component<ComicsProps, ComicsState> {
  constructor(props: ComicsProps) {
    super(props)
  }

  componentDidMount(): void {
    const characterId = this.props?.match?.params?.charachterId;
    if (!characterId) return;
    this.props.loadComicsDispatch(characterId);
  }

  render(): JSX.Element {
    const { loading } = this.props;
    return <div>
      {loading ? <Preloader /> :
        <div className={styles.wrapper}>
          <div className={styles.heroTitle}>Hero comics</div>
          <div className={styles.wrapperHeroes}>
            {this.props.comics.slice(0, 5).map((comics: ComicsSection) => {
              return <div className={styles.hero} key={comics.id}>
                <img className={styles.heroesImg} src={comics.thumbnail.path != null
                  ? `${comics.thumbnail.path}.${comics.thumbnail.extension}` : 'Photo'} />
                <div className={styles.heroesInfo}>
                  <div><strong>{comics.title}</strong></div>
                  <div className={styles.description}>{comics.description}</div>
                  <div>price: {comics.prices[0].price !== 0 ? `${comics.prices[0].price} usd` : ''}</div>
                </div>
              </div>
            })}
          </div>
        </div>}
    </div>
  }
}

const mapStateToProps = (state: any) => {
  return {
    comics: state.comicsPage.comics,
    loading: state.comicsPage.loading,
    error: state.comicsPage.error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadComicsDispatch: (characterId: string) => dispatch(loadComicsActionCreator(characterId))
  }
}

const ComicsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ComicsPage)

export default ComicsPageContainer;


