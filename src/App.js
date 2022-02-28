import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';

import './App.css';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-2530788.okta.com/oauth2/default',
  clientId: '0oa4091th4FTpalJf5d7',
  redirectUri: window.location.origin + '/login/callback'
});

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
  restoreOriginalUri;

  constructor(props) {
    super(props);
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
  }

  render() {
    return (
      <Router>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={this.restoreOriginalUri}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => (
                  <Login />
                )}
              />
              <Route path="/login/callback" component={LoginCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (<Router><AppWithRouterAccess/></Router>);
  }
}

export default RouterApp;
