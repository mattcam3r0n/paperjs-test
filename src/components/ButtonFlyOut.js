import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { observer, inject } from 'mobx-react';
// import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fullscreen from '@material-ui/icons/Fullscreen';

const styles = (theme) => ({
  flyoutButton: {
    margin: 5,
    float: 'left',
  },
});

class ButtonFlyOut extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
    e.stopPropagation();
    e.preventDefault();
  };

  handleClickAway = (e) => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <ClickAwayListener
        mouseEvent="onClick"
        onClickAway={this.handleClickAway}
      >
        <React.Fragment>
          <Fab
            size="small"
            className={classes.fab}
            color="inherit"
            onClick={this.handleClick}
          >
            <Fullscreen />
          </Fab>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {this.props.children.map((c, i) => {
              return (
                <div key={i} className={classes.flyoutButton}>
                  {c}
                </div>
              );
            })}
          </Popover>
        </React.Fragment>
      </ClickAwayListener>
    );
  }
}

//export default withStyles(styles)(RightSideBar);

export default withStyles(styles)(ButtonFlyOut);
// export default compose(
//   inject('appState'),
//   observer,
//   withStyles(styles)
// )(ButtonFlyOut);
