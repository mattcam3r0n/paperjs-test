import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

import Drawer from '@material-ui/core/Drawer';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Fullscreen from '@material-ui/icons/Fullscreen';
import PanTool from '@material-ui/icons/PanTool';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 64;

const styles = (theme) => {
  console.log(theme);
  return {
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    listItem: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    listItemIcon: {
      marginRight: 8,
    },
    listItemText: {
      paddingLeft: 8,
    },
    fab: {},
  };
};

class RightSideBar extends Component {
  handleZoomIn = () => {
    this.props.appState.zoomIn();
  };

  handleZoomOut = () => {
    this.props.appState.zoomOut();
  };

  handleZoomToFit = () => {
    this.props.appState.zoomToFit();
  };

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        {/* <List>{mailFolderListItems}</List> */}
        <List>
          <ListItem button className={classes.listItem}>
            <Button
              variant="fab"
              mini
              className={classes.fab}
              color="primary"
              onClick={this.handleZoomIn}
            >
              <ZoomIn />
            </Button>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Button
              variant="fab"
              mini
              className={classes.fab}
              color="secondary"
              onClick={this.handleZoomOut}
            >
              <ZoomOut />
            </Button>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Button
              variant="fab"
              mini
              className={classes.fab}
              color="inherit"
              onClick={this.handleZoomToFit}
            >
              <Fullscreen />
            </Button>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Button variant="fab" mini className={classes.fab} color="inherit">
              <PanTool />
            </Button>
          </ListItem>
        </List>
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    );
  }
}

//export default withStyles(styles)(RightSideBar);

export default compose(
  inject('appState'),
  observer,
  withStyles(styles)
)(RightSideBar);
