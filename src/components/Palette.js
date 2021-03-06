import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { observer, inject } from 'mobx-react';
// import { compose } from 'recompose';

import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import DragHandle from '@material-ui/icons/DragHandle';

const styles = (theme) => ({
  dragHandle: {
    backgroundColor: 'silver',
    cursor: 'grab',
    // padding: 5,
    display: 'flex',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: {
    flex: '1 1 auto',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  paper: {
    position: 'absolute',
    // top: 100,
    // left: 200,
    zIndex: 100,
    // border: 'solid 1px black',
    width: 100,
    // height: 100,
  },
});

class Palette extends Component {
  state = {};

  handlePathTool = () => {
    this.props.appState.activateSelectionTool();
  };

  render() {
    const { classes, title, children, visible, left = 200, top = 100 } = this.props;
    return visible ? (
      <Draggable handle="div[name='drag-handle']">
        <Paper elevation={4} className={classes.paper} style={{ left: left, top: top }}>
          <div name="drag-handle" className={classes.dragHandle}>
            <DragHandle />
            <div className={classes.title}>{title}</div>
          </div>
          {children}
        </Paper>
      </Draggable>
    ) : null;
  }
}

//export default withStyles(styles)(RightSideBar);

export default withStyles(styles)(Palette);
// export default compose(
//   inject('appState'),
//   observer,
//   withStyles(styles)
// )(Palette);
