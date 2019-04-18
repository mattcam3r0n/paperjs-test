import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountMenu from './AccountMenu';
import HomeHeader from './HomeHeader';
import DesignHeader from './DesignHeader';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'black',
  },
  appName: {
    marginRight: 32,
  },
});

const headerMenu = {
  '/home': <HomeHeader />,
  '/design': <DesignHeader />,
  '/about': <HomeHeader />,
  '/login': <HomeHeader />,
};

const Spacer = () => <div style={{ flexGrow: 1 }} />;

const AppName = (props) => (
  <Typography
    variant="title"
    color="inherit"
    noWrap
    className={props.classes.appName}
    component={Link}
    to="/home"
  >
    Precision
  </Typography>
);

@inject('designViewState', 'drillState')
@observer
class Header extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    const route = this.props.location.pathname;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <AppName classes={classes} />
          {/* show appropriate header menu for route */}
          {headerMenu[route]}
          <Spacer />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
