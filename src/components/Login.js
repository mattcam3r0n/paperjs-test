import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { Authenticator, Greetings } from 'aws-amplify-react';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({});

@inject('appState')
@observer
class Login extends React.Component {
  componentDidMount() {}

  render() {
    const { currentUser } = this.props.appState;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    
    if (currentUser) {
      return <Redirect to={from} />;
    }

    return <Authenticator hide={[Greetings]} />;
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
