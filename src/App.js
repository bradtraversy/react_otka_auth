import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route path="/" exact={true} component={Home} />
            <Route path="/staff" exact={true} component={Staff} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
