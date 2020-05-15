import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async'
import './App.css';

export default function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Route exact path='/' component={} />
          <Route path = '/todos' component={} />
        </Router>
        <p>hello world</p>
      </HelmetProvider>
      
    </div>
  );
}
