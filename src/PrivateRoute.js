import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { component: Component, user, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
