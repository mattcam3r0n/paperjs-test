import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { styles, theme } from './App.styles';

import Spinner from './components/Spinner';
import PrivateRoute from './PrivateRoute';
import Home from './components/home/Home';
import Login from './components/home/Login';
import Header from './components/header/Header';
import DesignView from './components/design/DesignView';
import NewDrillDialog from './components/design/NewDrillDialog';
import ConfirmDialog from './components/ConfirmDialog';

//import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

// TODO: replace with real components
const About = () => <h1>About</h1>;

@inject('appState')
@observer
class App extends React.Component {

  componentDidMount() {
    // Analytics.record('quiz-app mounted.');
    this.props.appState.log();
  }

  render() {
    const { classes } = this.props;
    const { currentUser } = this.props.appState;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/design" component={DesignView} />
            <PrivateRoute path="/about" user={currentUser} component={About} />
            <Spinner />
            <NewDrillDialog />
            <ConfirmDialog />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
