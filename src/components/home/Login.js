import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { Authenticator, Greetings } from 'aws-amplify-react';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

@inject('appState')
@observer
class Login extends React.Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const { currentUser } = this.props.appState;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    
    if (currentUser) {
      return <Redirect to={from} />;
    }

    return <div className={classes.root}><Authenticator hide={[Greetings]} /></div>;
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
