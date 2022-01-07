import { render } from '@testing-library/react';
import { resolve } from 'dns';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Dispatch, Action, AnyAction } from 'redux';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { getCharacterByName, getCharacters } from './api';
import Preloader from './Preloader';
import styles from './homePage.module.css';
import logo from './common/Marvel_Studios_logo.png';
import { HeroesInitialState, loadingHeroesActionCreator, HeroesState } from './redux/heroesReduser';
import { Reducers } from './redux/store';

export interface HomeState {
  heroes: Array<Heroes>,
  loading: boolean,
  inputValue: string,
  loadingHeroesDispatch: (id: string) => void,
  heroesPage: { heroes: Array<Heroes>; loading: boolean; error: null; }
}
export interface LoadHerosAction {
  type: string,
  payload: string
}

export interface HomeProps {
  inputValue: string
}

export interface Heroes {
  id: number,
  name: string,
  thumbnail: {
    path: string,
    extension: string
  },
  description: string
}

const HomePage = () => {
  const heroes = useSelector((state: Reducers | HomeState) => state.heroesPage.heroes);
  const loading = useSelector((state: Reducers | HomeState) => state.heroesPage.loading);
  const error = useSelector((state: Reducers | HomeState) => state.heroesPage.error);

  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState<string>('');

  const location = useLocation();

  useEffect(() => {

    loadFromServer();
  }, [location])
  const loadFromServer = () => {
    const search = location.search;
    const params = new URLSearchParams(search);
    const nameCharacter: string | null = params.get('query');

    if (nameCharacter) {
      setInputValue(nameCharacter);
      dispatch(loadingHeroesActionCreator(nameCharacter));
    } else {
      dispatch(loadingHeroesActionCreator(''));
    }
  }
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputValue) {
      navigate(`?query=${inputValue}`)
    } else {
      navigate(`/`)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return <div>
    {loading ? <Preloader /> :
      <div className={styles.wrapper}>
        <img src={logo} alt='logo' className={styles.logo} />
        <div className={styles.wrapperInput}>
          <div>
            <input type='text' className={styles.inputSearch}
              value={inputValue} name="inputValue" onChange={handleChange} />
          </div>
          <Button variant="contained" type="submit" className={styles.sortBy}>Sort by</Button>
          <Button variant="contained" type="submit" className={styles.search} onClick={handleSubmit}>
            Search</Button>
        </div>
        <div className={styles.wrapperHeroes}>
          {heroes.slice(0, 5).map((heroes: Heroes) => {
            return <div key={heroes.id}>
              <div className={styles.hero}>
                <Avatar alt="Photo" sx={{ width: 100, height: 100, margin: 5 }}
                  className={styles.avatarStyle} src={heroes.thumbnail.path != null
                    ? `${heroes.thumbnail.path}.${heroes.thumbnail.extension}` : 'Photo'} />
                <div className={styles.name}>{heroes.name}</div>
                <div className={styles.description} >{heroes.description}</div>
                <NavLink to={`/comics/${heroes.id}`} style={{ textDecoration: 'none' }}> {<Button variant="contained"
                  sx={{ marginRight: 5, textDecoration: 'none' }}
                  type="submit"  >See more</Button>} </NavLink>
              </div>
            </div>
          })}
        </div>
      </div>}
  </div>
}

export default HomePage;


