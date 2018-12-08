import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { observer, inject } from 'mobx-react';
// import { compose } from 'recompose';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
    const { classes, tooltip } = this.props;
    const { anchorEl } = this.state;

    return (
      <ClickAwayListener
        mouseEvent="onClick"
        onClickAway={this.handleClickAway}
      >
        <React.Fragment>
          <Tooltip title={tooltip} disableFocusListener={true}>
            <Fab
              size="small"
              className={classes.fab}
              color="inherit"
              onClick={this.handleClick}
            >
              {this.props.icon}
            </Fab>
          </Tooltip>
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
