import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './Sidebar';
import Field from './Field';
import Timeline from './Timeline';

const styles = (theme) => {
  return {
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      backgroundColor: '#fafafa', 
      marginTop: 64,
      padding: 0, 
      minWidth: 0,
      overflow: 'scroll'
    },
  };
};

function DesignView(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <SideBar />
      <div className={classes.content}>
        <Field />
        <Timeline />
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(DesignView);
