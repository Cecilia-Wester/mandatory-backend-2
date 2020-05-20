import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async'
import './App.css';
import Boards from './components/Boards/Boards';
import Header from './components/Header/Header';
import Cards from './components/Board/List/List';

export default function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Header />
          <Route exact path='/' component={Cards} />
          <Route path = '/boards' component={Boards} />
        </Router>
      </HelmetProvider>
    </div>
  );
}
