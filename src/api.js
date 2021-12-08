import React from 'react';
import * as axios from "axios";


const PUBLIC_KEY = process.env.REACT_APP_API_KEY;
const hash = process.env.REACT_APP_API_HASH;
const baseURL = process.env.REACT_APP_BASEURL;

const params = {
  ts: '1',
  apikey: PUBLIC_KEY,
  hash: hash
}

export function getComicsByCharacter(characterId) {
  return axios.get(`${baseURL}characters/${characterId}/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(response => {
 
      const res = response.data.data.results;
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCharacters() {

  return axios.get(`${baseURL}characters?`, {params})
    .then(response => {
      const res = response.data.data.results;
      return res;
    })
    .catch(error => {
      console.log(error);
    })

}

export function getCharacterByName(nameStartsWith) {

  return axios.get(`${baseURL}characters?nameStartsWith=${nameStartsWith}&`, {params})
    .then(response => {
      const res = response.data.data.results;
      return res;
    })
    .catch(error => {
      console.log(error);
    })

}




