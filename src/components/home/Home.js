import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DrillPicker from './DrillPicker';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    //overflowY: 'scroll',
    // width: '100%',
    marginTop: 48,
    padding: 8
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DrillPicker />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
