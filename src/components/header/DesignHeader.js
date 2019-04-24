import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';

const styles = (theme) => ({});

// this is a hack to work around a bug in material-ui that causes
// the first menu item to always be (and stay) highlighted. adding
// a hidden, dummy item seems to work around it.
const HiddenMenuItem = () => (
  <DropDownMenuItem style={{ display: 'none' }}>Dummy</DropDownMenuItem>
);

@inject('designViewState', 'drillState', 'appState')
@observer
class DesignHeader extends React.Component {
  state = {};

  handleNewDrill = () => {
    const { appState } = this.props;
    appState.openDialog(appState.DialogNames.NEW_DRILL);
  };

  handleSaveDrill = () => {
    const { appState, drillState } = this.props;
    appState.startSpinner();
    drillState
      .saveDrill()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        appState.stopSpinner();
      });
  };

  handleOpen = () => {
    const { appState, drillState } = this.props;
    drillState.getUserDrills();
    appState.showAlert({ variant: 'error', message: 'this is a really long test message to see how it looks in the snack bar.'});
  };

  render() {
    const { drillState } = this.props;
    return (
      <React.Fragment>
        <DropDownMenu menuText="File">
          <HiddenMenuItem />
          <DropDownMenuItem onClick={this.handleNewDrill}>
            New Drill
          </DropDownMenuItem>
          <DropDownMenuItem onClick={this.handleOpen}>
            Open...
          </DropDownMenuItem>
          <DropDownMenuItem onClick={this.handleSaveDrill}>
            Save
          </DropDownMenuItem>
        </DropDownMenu>
        <DropDownMenu menuText="Edit">
          <HiddenMenuItem />
          <DropDownMenuItem>Undo</DropDownMenuItem>
          <DropDownMenuItem>Redo</DropDownMenuItem>
        </DropDownMenu>
        <DropDownMenu menuText="Help">
          <HiddenMenuItem />
          <DropDownMenuItem>Video Tutorials</DropDownMenuItem>
          <DropDownMenuItem>Release Notes</DropDownMenuItem>
        </DropDownMenu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DesignHeader);
