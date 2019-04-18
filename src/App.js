import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { styles, theme } from './App.styles';

import PrivateRoute from './PrivateRoute';
import Login from './components/Login';
import Header from './components/header/Header';
import DesignView from './components/design/DesignView';

//import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

// TODO: replace with real components
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

@inject('appState')
@observer
class App extends React.Component {

  componentDidMount() {
    // Analytics.record('quiz-app mounted.');
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
