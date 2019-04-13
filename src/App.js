import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { styles, theme } from './App.styles';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsmobile from './aws-exports';
import { Authenticator, Greetings } from 'aws-amplify-react';

import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import DesignView from './components/DesignView';

//import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsmobile);

// TODO: replace with real components
const Home = () => <h1>Home</h1>;
const Login = () => <Authenticator hide={[Greetings]} />;
const About = () => <h1>About</h1>;

class App extends React.Component {
  constructor(props) {
    super(props);
    Hub.listen('auth', (data) => {
      this.onAuthEvent(data.payload);
    });
  }

  state = {
    user: null,
  };

  componentDidMount() {
    // Analytics.record('quiz-app mounted.');
    this.loadUser();
  }

  onAuthEvent(payload) {
    console.log('payload', payload);
    console.log(
      'A new auth event has happened: ',
      payload.data.username + ' has ' + payload.event
    );
    this.loadUser();
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => this.setState({ user: user }))
      .catch(() => this.setState({ user: null }));
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

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
            <PrivateRoute path="/about" user={user} component={About} />
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
