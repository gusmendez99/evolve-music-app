
import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RouterApp from './router';

import "tachyons";

class App extends Component {
  render(){
    return (
        <Router>
          <Route path="" component={RouterApp} />
        </Router>
    );
  }
}

export default App;