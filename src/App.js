import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'mobx-react';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Header from './components/Header';
import DesignView from './components/DesignView';
import DesignViewState from './stores/DesignViewState';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  overrides: {
    root: {
      // MuiListItemIcon: {
      //   marginRight: 8,
      //   color: 'red'
      // }
    },
  },
});

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 64,
    padding: 0, // theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

const designViewState = new DesignViewState();
function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        <Provider designViewState={designViewState}>
          <DesignView />
        </Provider>
      </div>
    </MuiThemeProvider>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
