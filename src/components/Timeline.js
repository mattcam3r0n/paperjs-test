import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  timeline: {
    flex: 'none',
    height: '100px',
    backgroundColor: '#fff',
  },
});

function Timeline(props) {
  const { classes } = props;
  return (
    <div className={classes.timeline}>
      <canvas
        id="timelineCanvas"
        data-paper-resize="true"
        style={{ width: '100%', height: '100px', border: 'solid 1px black' }}
      />
    </div>
  );
}

export default withStyles(styles)(Timeline);
