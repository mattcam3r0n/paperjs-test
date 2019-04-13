import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class AccountMenu extends React.Component {
  state = {};

  handleOpen() {
    console.log('handleOpen');
  }

  render() {
    const { classes, designViewState } = this.props;
    // const { anchorEl } = this.state;
    return (
      <DropDownMenu menuText="Account" openOnClick={true} onClick={this.handleOpen}>
        <DropDownMenuItem onClick={designViewState.newDrill}>
          Profile
        </DropDownMenuItem>
        <DropDownMenuItem>Sign Out</DropDownMenuItem>
      </DropDownMenu>
    );
  }
}

export default withStyles(styles)(AccountMenu);
