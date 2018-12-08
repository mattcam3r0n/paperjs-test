import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'black',
  },
  appName: {
    marginRight: 32
  },
});

class Header extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit" noWrap className={classes.appName}>
            Precision
          </Typography>
          <DropDownMenu menuText="File">
            <DropDownMenuItem>New Drill</DropDownMenuItem>
            <DropDownMenuItem>Open...</DropDownMenuItem>
          </DropDownMenu>
          <DropDownMenu menuText="Edit">
            <DropDownMenuItem>Undo</DropDownMenuItem>
            <DropDownMenuItem>Redo</DropDownMenuItem>
          </DropDownMenu>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
