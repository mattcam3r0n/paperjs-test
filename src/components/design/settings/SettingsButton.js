import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

// material
import Fab from '@material-ui/core/Fab';
// icons
import Settings from '@material-ui/icons/Settings';

import SettingsDialog from './SettingsDialog';

const styles = (theme) => ({
  fab: {
    margin: 0,
  },
});

//@inject('designViewState')
@observer
class SettingsButton extends Component {
  state = {
    open: false,
  };

  handleOnClick = (e) => {
    // this.props.designViewState.activateTool(ToolNames.RECTANGULAR_SELECTION);
    this.setState({
      open: true,
    });
  };

  handleClose = (e) => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Fab
          size="small"
          className={classes.fab}
          color="default"
          onClick={this.handleOnClick}
        >
          <Settings />
        </Fab>
        <SettingsDialog open={this.state.open} onClose={this.handleClose} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SettingsButton);
