import React from 'react';
import preloader from './assets/Spinner-1s-200px.svg'
import styles from './Preloader.module.css'

const Preloader = () => {
  return <img className={styles.loader} src={preloader} />
}

export default Preloader;


