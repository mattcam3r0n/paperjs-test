import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  timeline: {
    flex: 'none',
    height: '100px',
    backgroundColor: '#fff'
  },
});

function Timeline(props) {
  const { classes } = props;
    return <div className={classes.timeline}>footer</div>;
};

export default withStyles(styles)(Timeline);
