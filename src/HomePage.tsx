import { render } from '@testing-library/react';
import { resolve } from 'dns';
import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { getCharacterByName, getCharacters } from './api';
import Preloader from './Preloader';
import styles from './HomePage.module.css';
import logo from './common/Marvel_Studios_logo.png';

interface HomeState {
  heroes: any[],
  loading: boolean,
  inputValue: string,
  location: any,
  history: any

}

interface ComicsProps {
  match: {
    params: {
      charachterId: string;
    }
  }
}

interface HomeProps {
  heroes: any[],
  loading: boolean,
  inputValue: string


}

class HomePage extends React.Component<HomeState, HomeProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      heroes: [],
      loading: true,
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
      getCharacterByName(nameCharacter).then((heroes: any) => {
        this.setState({
          inputValue: nameCharacter,
          heroes: heroes,
          loading: false

        })
      })
    } else {

      getCharacters().then((heroes: any) => {

        this.setState({
          heroes,
          loading: false

        })
      })
    }
  }

  componentDidMount(): void {
    this.loadFromServer()
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.loadFromServer();
    }
  }

  handleSubmit() {
    if (this.state.inputValue) {
      this.props.history.push(`?query=${this.state.inputValue}`)
    } else {
      this.props.history.push(`/`)
    }
  }

  handleChange(e: any) {
    const target = e.target;
    const value: string = target.value;
    this.setState({
      inputValue: value
    })
  }

  render() {
    return <>{ }
      {this.state.loading ? <Preloader /> :
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
            {this.state.heroes.slice(0, 5).map((heroes: any) => {
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
    </>
  }

}

export default HomePage;


