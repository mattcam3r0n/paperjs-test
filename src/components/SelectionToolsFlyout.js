import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Fab from '@material-ui/core/Fab';
import ButtonFlyOut from './ButtonFlyOut';

// icons
import NearMe from '@material-ui/icons/NearMe';
import TabUnselected from '@material-ui/icons/TabUnselected';
import Timeline from '@material-ui/icons/Timeline';

const styles = (theme) => ({
    fab: {
        margin: 0,
      },  
});

@inject('designViewState')
@observer
class SelectionToolsFlyout extends Component {
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

  handlePanTool = () => {
    this.props.designViewState.activatePanTool();
  };

  render() {
    const { classes } = this.props;
    return (
      <ButtonFlyOut icon={<TabUnselected />} tooltip="Selection Tools">
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handlePanTool}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomIn}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomOut}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomToFit}
        >
          <TabUnselected />
        </Fab>
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(SelectionToolsFlyout);
