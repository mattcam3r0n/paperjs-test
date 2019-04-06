import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Fab from '@material-ui/core/Fab';
import ButtonFlyOut from './ButtonFlyOut';

// icons
import NearMe from '@material-ui/icons/NearMe';
import TabUnselected from '@material-ui/icons/TabUnselected';
import Timeline from '@material-ui/icons/Timeline';
import ToolNames from '../lib/tools/ToolNames';

const styles = (theme) => ({
    fab: {
        margin: 0,
      },  
});

@inject('designViewState')
@observer
class EditToolsFlyout extends Component {
  state = {
  };

  handlePathTool = (e) => {
//    e.preventDefault();
    this.props.designViewState.activateTool(ToolNames.PATH);
  };

  render() {
    const { classes } = this.props;
    const { isFlyoutOpen } = this.state;

    return (
      <ButtonFlyOut icon={<Timeline />} tooltip="Editing Tools" >
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handlePathTool}
        >
          <Timeline />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomIn}
        >
          <Timeline />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomOut}
        >
          <Timeline />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handleZoomToFit}
        >
          <Timeline />
        </Fab>
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(EditToolsFlyout);
