import React from 'react';
import { matchPath } from "react-router";
import styles from './ComicsPage.module.css';
import { getComicsByCharacter } from './api';
import Preloader from './Preloader';


interface ComicsProps {
  match: {
    params: {
      charachterId: string;
    }
  },
  loading: boolean
}

interface ComicsState {
  comics: any[],
  loading: boolean

}

class ComicsPage extends React.Component<ComicsProps, ComicsState> {
  constructor(props: ComicsProps) {
    super(props)
    this.state = {
      comics: [],
      loading: true
      }
  }

  componentDidMount(): void {
        const characterId = this.props?.match?.params?.charachterId;
    if (!characterId) return;
    getComicsByCharacter(characterId).then((comics: any) => {
      this.setState({ 
        comics,
        loading: false 
      });
    })
  }

  render() {
     return <>{ }
      {this.state.loading ? <Preloader /> :
      <div className={styles.wrapper}>
        <div className={styles.heroTitle}>Hero comics</div>
        <div className={styles.wrapperHeroes}>
          {this.state.comics.slice(0, 5).map(comics => {
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
      </div> }
  </>
  }
}

export default ComicsPage;


