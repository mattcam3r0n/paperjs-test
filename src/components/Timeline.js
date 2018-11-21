import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  footer: {
    flex: 'none',
    height: '100px',
  },
});

function Timeline(props) {
  const { classes } = props;
  return <div className={classes.footer}>footer</div>;
}

export default withStyles(styles)(Timeline);
