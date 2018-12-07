import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
// import { compose } from 'recompose';

import Drawer from '@material-ui/core/Drawer';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Fullscreen from '@material-ui/icons/Fullscreen';
import PanTool from '@material-ui/icons/PanTool';
import NearMe from '@material-ui/icons/NearMe';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';

import ButtonFlyOut from './ButtonFlyOut';
import Palette from './Palette';

const drawerWidth = 64;

const styles = (theme) => {
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
    fab: {
      margin: 0,
    },
  };
};

@inject('designViewState')
@observer
class RightSideBar extends Component {
  state = {};

  handleZoomIn = (e) => {
    e.preventDefault();
    this.props.designViewState.zoomIn();
  };

  handleZoomOut = (e) => {
    e.preventDefault();
    this.props.designViewState.zoomOut();
  };

  handleZoomToFit = (e) => {
    e.preventDefault();
    this.props.designViewState.zoomToFit();
  };

  handlePathTool = (e) => {
    this.props.designViewState.activatePointerTool();
  };

  handlePanTool = () => {
    this.props.designViewState.activatePanTool();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
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
              <Fab
                size="small"
                className={classes.fab}
                onClick={this.handlePathTool}
              >
                <NearMe />
              </Fab>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <ButtonFlyOut>
                <Fab
                  size="small"
                  className={classes.fab}
                  color="inherit"
                  onClick={this.handlePanTool}
                >
                  <PanTool />
                </Fab>
                <Fab
                  size="small"
                  className={classes.fab}
                  color="primary"
                  onClick={this.handleZoomIn}
                >
                  <ZoomIn />
                </Fab>
                <Fab
                  size="small"
                  className={classes.fab}
                  color="secondary"
                  onClick={this.handleZoomOut}
                >
                  <ZoomOut />
                </Fab>
                <Fab
                  size="small"
                  className={classes.fab}
                  color="inherit"
                  onClick={this.handleZoomToFit}
                >
                  <Fullscreen />
                </Fab>
              </ButtonFlyOut>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <ButtonFlyOut>
                <Fab size="small" color="inherit">
                  <Fullscreen />
                </Fab>
                <Fab size="small" color="inherit">
                  <Fullscreen />
                </Fab>
                <Fab size="small" color="inherit">
                  <Fullscreen />
                </Fab>
              </ButtonFlyOut>
            </ListItem>
          </List>
          <Divider />
          {/* <List>{otherMailFolderListItems}</List> */}
          <Palette />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RightSideBar);

// export default compose(
//   inject('designViewState'),
//   observer,
//   withStyles(styles)
// )(RightSideBar);
