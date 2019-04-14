import React from 'react';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';

const styles = (theme) => ({});

@inject('appState')
@observer
class AccountMenu extends React.Component {

  handleClick = () => {
    const { authenticated } = this.props.appState;
    if (authenticated) return;
    // history.push('/login');
    this.props.history.push('/login');
  }

  render() {
    const { currentUser, authenticated, signOut } = this.props.appState;
    console.log(authenticated);
    return (
      <DropDownMenu
        menuText={authenticated ? currentUser.attributes.email : 'Sign In'}
        dontOpen={!authenticated}
        onClick={this.handleClick}
      >
        <DropDownMenuItem onClick={() => {}}>Profile</DropDownMenuItem>
        <DropDownMenuItem onClick={() => { signOut() }}>Sign Out</DropDownMenuItem>
      </DropDownMenu>
    );
  }
}

export default withStyles(styles)(withRouter(AccountMenu));
