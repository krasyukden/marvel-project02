import { render } from '@testing-library/react';
import { resolve } from 'dns';
import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { getCharacterByName, getCharacters } from './api';
import Preloader from './Preloader';
import styles from './homePage.module.css';
import logo from './common/Marvel_Studios_logo.png';
import { loadingHeroesActionCreatorByName } from './redux/heroesReduser';
import { HeroesInitialState, loadingHeroesActionCreator } from './redux/heroesReduser';

export interface HomeState {
  heroes: Array<Heroes>,
  loading: boolean,
  inputValue: string,
  location: any,
  history: any,
  loadingHeroesDispatchDefault: any,
  loadingHeroesDispatchByName: any
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

class HomePage extends React.Component<HomeState, HomeProps, HeroesInitialState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  loadFromServer() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const nameCharacter = params.get('query');

    if (nameCharacter) {
      this.props.loadingHeroesDispatchByName(nameCharacter);
      this.setState({ inputValue: nameCharacter })
    } else {
      this.props.loadingHeroesDispatchDefault()
    }
  }

  componentDidMount(): void {
    this.loadFromServer()
  }

  componentDidUpdate(prevProps: any): void {
    if (this.props.location !== prevProps.location) {
      this.loadFromServer();
    }
  }

  handleSubmit(): void {
    if (this.state.inputValue) {
      this.props.history.push(`?query=${this.state.inputValue}`)
    } else {
      this.props.history.push(`/`)
    }
  }

  handleChange(e: any): void {
    const target = e.target;
    const value: string = target.value;
    this.setState({
      inputValue: value
    })
  }

  render(): JSX.Element {
    const { loading } = this.props;
    return <div>
      {loading ? <Preloader /> :
        <div className={styles.wrapper}>
          <img src={logo} alt='logo' className={styles.logo} />
          <div className={styles.wrapperInput}>
            <div>
              <input type='text' className={styles.inputSearch}
                value={this.state.inputValue} name="inputValue" onChange={this.handleChange} />
            </div>
            <Button variant="contained" type="submit" className={styles.sortBy}>Sort by</Button>
            <Button variant="contained" type="submit" className={styles.search} onClick={this.handleSubmit}>
              Search</Button>
          </div>
          <div className={styles.wrapperHeroes}>
            {this.props.heroes.slice(0, 5).map((heroes: Heroes) => {
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
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadingHeroesDispatchDefault: () => dispatch(loadingHeroesActionCreator()),
    loadingHeroesDispatchByName: (nameCharacter: string) => dispatch(loadingHeroesActionCreatorByName(nameCharacter))
  }
}

const mapStateToProps = (state: any) => {
  return {
    heroes: state.heroesPage.heroes,
    loading: state.heroesPage.loading,
    error: state.heroesPage.error
  }
}
const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default HomePageContainer;


