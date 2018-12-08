import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Fab from '@material-ui/core/Fab';
import ButtonFlyOut from './ButtonFlyOut';

// icons
import NearMe from '@material-ui/icons/NearMe';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ColorLens from'@material-ui/icons/ColorLens';

const styles = (theme) => ({
    fab: {
        margin: 0,
      },  
});

@inject('designViewState')
@observer
class MarchToolsFlyout extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <ButtonFlyOut icon={<NearMe />} tooltip="Marcher Tools">
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
        >
          <Add />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
        >
          <Delete />
        </Fab>
        <Fab
          size="small"
          className={classes.fab}
          color="inherit"
        >
          <ColorLens />
        </Fab>
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(MarchToolsFlyout);
