import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NotFoundPage from './NotFoundPage';
import ComicsPage, { ComicsProps } from './ComicsPage';
import HomePage from './HomePage';
import store from "./App";
import { Provider } from 'react-redux';
import HomePageContainer from './HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comics/:charachterId" element={<ComicsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

