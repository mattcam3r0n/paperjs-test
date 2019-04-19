import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DrillCardList from './DrillCardList';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    // overflowY: 'scroll',
    // width: '100%',
    padding: 8
  },
});

class DrillPicker extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DrillCardList />
      </div>
    );
  }
}

export default withStyles(styles)(DrillPicker);
