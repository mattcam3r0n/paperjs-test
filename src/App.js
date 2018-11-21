import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header';
import DesignView from './components/DesignView';
import SideBar from './components/Sidebar';
import Field from './components/Field';
import { CssBaseline } from '@material-ui/core';
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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

function ClippedDrawer(props) {
  const { classes } = props;

  console.log('app theme', theme);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        {/* <SideBar />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Field />
        </div> */}
        <DesignView />
      </div>
    </MuiThemeProvider>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
