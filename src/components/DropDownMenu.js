import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    menuButton: {
        color: 'white'
      }    
});

class DropDownMenu extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, menuText } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <Button className={classes.menuButton} onClick={this.handleMenu}>
          {menuText}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          marginThreshold={48}
          open={open}
          onClose={this.handleClose}
        >
          {
              React.Children.map(this.props.children, c => {
                return React.cloneElement(c, {
                    onClose: this.handleClose
                });
              })
          }

          {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DropDownMenu);
