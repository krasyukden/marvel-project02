import React from 'react';
import * as axios from "axios";


const PUBLIC_KEY = process.env.REACT_APP_API_KEY;
const hash = process.env.REACT_APP_API_HASH;
const baseURL = process.env.REACT_APP_BASEURL;

const params = {
  ts: '1',
  apikey: PUBLIC_KEY,
  hash
}

export function getComicsByCharacter(characterId) {
  return axios.get(`${baseURL}characters/${characterId}/comics?`, { params })
    .then(response => {
      return response.data.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getCharacters() {

  return axios.get(`${baseURL}characters?`, { params })
    .then(response => {
      return response.data.data.results;
    })
    .catch(error => {
      console.log(error);
    })
}

export function getCharacterByName(nameStartsWith) {

  return axios.get(`${baseURL}characters?nameStartsWith=${nameStartsWith}&`, { params })
    .then(response => {
      return response.data.data.results;
    })
    .catch(error => {
      console.log(error);
    })

}




