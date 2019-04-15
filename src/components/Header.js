import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';
import AccountMenu from './AccountMenu';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'black',
  },
  appName: {
    marginRight: 32,
  },
  grow: {
    flexGrow: 1
  }
});

@inject('designViewState', 'drillState')
@observer
class Header extends React.Component {
  state = {};

  render() {
    const { classes, designViewState, drillState } = this.props;
    // const { anchorEl } = this.state;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography
            variant="title"
            color="inherit"
            noWrap
            className={classes.appName}
            component={Link}
            to="/home"
          >
            Precision
          </Typography>
          <DropDownMenu menuText="File">
            <DropDownMenuItem onClick={designViewState.newDrill}>
              New Drill
            </DropDownMenuItem>
            <DropDownMenuItem>Open...</DropDownMenuItem>
            <DropDownMenuItem onClick={drillState.saveDrill}>Save</DropDownMenuItem>
          </DropDownMenu>
          <DropDownMenu menuText="Edit">
            <DropDownMenuItem>Undo</DropDownMenuItem>
            <DropDownMenuItem>Redo</DropDownMenuItem>
          </DropDownMenu>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <div className={classes.grow} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
