import React, { useEffect, useState } from 'react';
import { matchPath } from "react-router";
import { Dispatch, Action, AnyAction } from 'redux';
import styles from './comicsPage.module.css';
import { getComicsByCharacter } from './api';
import Preloader from './Preloader';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connect } from 'react-redux';
import { comicsActionCreatorById, ComicsInitialState } from './redux/comicsReduser';
import { loadComicsActionCreator, ComicsState } from './redux/comicsReduser';
import { Reducers } from './redux/store';
import { useMatch } from "react-router-dom";

export interface ComicsProps {
  match: {
    params: {
      charachterId: string;
    }
  },
  comics: Array<ComicsSection>,
  loading: boolean,
  characterId: string,
  loadComicsDispatch: (characterId: string) => void
}

export interface LoadComicsAction {
  type: string,
  payload: string
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

const ComicsPage = () => {

  const comics = useSelector((state: Reducers | ComicsState) => state.comicsPage.comics);
  const loading = useSelector((state: Reducers | ComicsState) => state.comicsPage.loading);
  const error = useSelector((state: Reducers | ComicsState) => state.comicsPage.error);
  const dispatch = useDispatch();
  const match = useMatch("/comics/:charachterId");

  useEffect(() => {
    const characterId = match?.params?.charachterId;
    if (!characterId) return;

    dispatch(loadComicsActionCreator(characterId))
  }, [])


  return <div>
    {loading ? <Preloader /> :
      <div className={styles.wrapper}>
        <div className={styles.heroTitle}>Hero comics</div>
        <div className={styles.wrapperHeroes}>
          {comics.slice(0, 5).map((comics: ComicsSection) => {
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

export default ComicsPage;


