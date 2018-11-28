import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

import Drawer from '@material-ui/core/Drawer';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Fullscreen from '@material-ui/icons/Fullscreen';
import PanTool from '@material-ui/icons/PanTool';
import NearMe from '@material-ui/icons/NearMe';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

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
    fabSlideOut: {
      margin: 10
    },
    paper: {
      zIndex: 1,
      position: 'absolute',
      // margin: theme.spacing.unit,
      margin: 0,
      height: 62,
      width: 200
    },
  };
};

class RightSideBar extends Component {
  state = {
    showSlider: false,
    x: 0,
    y: 0
  };

  handleZoomIn = () => {
    this.props.appState.zoomIn();
  };

  handleZoomOut = () => {
    this.props.appState.zoomOut();
  };

  handleZoomToFit = () => {
    this.props.appState.zoomToFit();
  };

  handlePathTool = () => {
    this.props.appState.activatePointerTool();
  };

  handlePanTool = () => {
    this.props.appState.activatePanTool();
  };

  testSlider = (e) => {
    console.log(e.currentTarget.getBoundingClientRect());
    this.setState({
      showSlider: !this.state.showSlider,
      x: e.currentTarget.getBoundingClientRect().x - 200,
      y: e.currentTarget.getBoundingClientRect().y - 11
    });
  };

  render() {
    const { classes } = this.props;
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
              <Button
                variant="fab"
                mini
                className={classes.fab}
                color="inherit"
                onClick={this.handlePathTool}
              >
                <NearMe />
              </Button>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <Button
                variant="fab"
                mini
                className={classes.fab}
                color="inherit"
                onClick={this.handlePanTool}
              >
                <PanTool />
              </Button>
            </ListItem>
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
              <Button
                variant="fab"
                mini
                className={classes.fab}
                color="inherit"
                onClick={this.testSlider}
              >
                <Fullscreen />
              </Button>
            </ListItem>
          </List>
          <Divider />
          {/* <List>{otherMailFolderListItems}</List> */}
        </Drawer>
        <Slide
          direction="left"
          in={this.state.showSlider}
          mountOnEnter
          unmountOnExit
        >
          <Paper elevation={4} className={classes.paper} style={{ left: this.state.x, top: this.state.y }}>
            {/* <svg className={classes.svg}>
              <polygon
                points="0,100 50,00, 100,100"
                className={classes.polygon}
              />
            </svg> */}
              <Button
                variant="fab"
                mini
                className={classes.fabSlideOut}
                color="inherit"
                onClick={this.testSlider}
              >
                <Fullscreen />
              </Button>
              <Button
                variant="fab"
                mini
                className={classes.fabSlideOut}
                color="inherit"
                onClick={this.testSlider}
              >
                <Fullscreen />
              </Button>
              <Button
                variant="fab"
                mini
                className={classes.fabSlideOut}
                color="inherit"
                onClick={this.testSlider}
              >
                <Fullscreen />
              </Button>
          </Paper>
        </Slide>
      </React.Fragment>
    );
  }
}

//export default withStyles(styles)(RightSideBar);

export default compose(
  inject('appState'),
  observer,
  withStyles(styles)
)(RightSideBar);
