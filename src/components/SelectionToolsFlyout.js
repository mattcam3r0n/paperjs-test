import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Fab from '@material-ui/core/Fab';
import ButtonFlyOut from './ButtonFlyOut';

// icons
import TabUnselected from '@material-ui/icons/TabUnselected';

const styles = (theme) => ({
    fab: {
        margin: 0,
      },  
});

@inject('designViewState')
@observer
class SelectionToolsFlyout extends Component {
  state = {};

  handlePointerTool = (e) => {
    //e.preventDefault();
    this.props.designViewState.activateRectangularSelectionTool();
  };

  render() {
    const { classes } = this.props;
    return (
      <ButtonFlyOut icon={<TabUnselected />} tooltip="Selection Tools">
        <Fab
          size="small"
          className={classes.fab}
          color="primary"
          onClick={this.handlePointerTool}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handlePointerTool}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handlePointerTool}
        >
          <TabUnselected />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={this.handlePointerTool}
        >
          <TabUnselected />
        </Fab>
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(SelectionToolsFlyout);
