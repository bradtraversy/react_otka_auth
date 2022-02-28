import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
    }

    onSuccess = tokens => {
      this.props.oktaAuth.handleLoginRedirect(tokens);
    };

    onError = err => {
      console.log('error logging in', err);
    };

    render() {
      return this.props.authState?.isAuthenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <SignInWidget
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
    }
  }
);
