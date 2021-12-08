import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFoundPage from './NotFoundPage';
import ComicsPage from './ComicsPage';
import HomePage from './HomePage';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path='/comics/:charachterId' component={ComicsPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Router>


  );
}

export default App;

