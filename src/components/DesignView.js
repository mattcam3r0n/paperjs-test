import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SideBar from './Sidebar';
import RightSideBar from './RightSideBar';
import Field from './Field';
import Timeline from './Timeline';
import PathPalette from './PathPalette';

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
      overflow: 'scroll',
    },
  };
};

class DesignView extends Component {
  constructor(props) {
    super(props);
  }
  //function DesignView(props) {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <SideBar />
        <div className={classes.content}>
          <Field />
          <Timeline />
        </div>
        <RightSideBar />
        <PathPalette />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DesignView);
