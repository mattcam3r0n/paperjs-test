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
  popover: {
    //width: 135
  }
});

class ButtonFlyOut extends Component {
  state = {
    anchorEl: null,
    isOpen: false,
  };

  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget, isOpen: true });
    e.stopPropagation();
    e.preventDefault();
  };

  handleClickAway = (e) => {
    this.setState({ anchorEl: null, isOpen: false });
  };

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.isOpen) {
  //     this.setState({
  //       anchorEl: null,
  //       isOpen: false
  //     });  
  //   }
  // }

  render() {
    const { classes, tooltip } = this.props;
    const { anchorEl, isOpen } = this.state;

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
            className={classes.popover}
            PaperProps={{
              classes: {
                root: classes.popover
              }
            }}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left' //'right',
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

export default withStyles(styles)(ButtonFlyOut);
