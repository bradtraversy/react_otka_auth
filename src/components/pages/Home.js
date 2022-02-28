import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(
  class Home extends Component {

    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    login = async () => {
      this.props.history.push('/login');
    };

    logout = async () => {
      this.props.oktaAuth.signOut();
    };

    render() {
      const mainContent = this.props.authState?.isAuthenticated ? (
        <div>
          <p className="lead">
            You have entered the staff portal,{' '}
            <Link to="/staff">click here</Link>
          </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            If you are a staff member, please get your credentials from your
            supervisor
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );

      return (
        <div className="jumbotron">
          <h1 className="display-4">Acme Staff Portal</h1>
          {mainContent}
        </div>
      );
    }
  }
);
