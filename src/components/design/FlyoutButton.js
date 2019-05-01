import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const styles = (theme) => ({
  fab: {
    margin: 0,
  },
});

class FlyoutButton extends Component {
  state = {};

  render() {
    const { classes, children, onClick, title } = this.props;
    return (
      <Tooltip title={title}>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
          onClick={onClick}
        >
          {children}
        </Fab>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(FlyoutButton);
