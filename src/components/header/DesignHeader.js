import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DropDownMenu from './DropDownMenu';
import DropDownMenuItem from './DropDownMenuItem';

const styles = (theme) => ({});

// this is a hack to work around a bug in material-ui that causes
// the first menu item to always be (and stay) highlighted. adding
// a hidden, dummy item seems to work around it.
const HiddenMenuItem = () => (
    <DropDownMenuItem style={{ display: 'none' }}>Dummy</DropDownMenuItem>
  );
  
@inject('designViewState', 'drillState')
@observer
class DesignHeader extends React.Component {
  state = {};

  render() {
    const { designViewState, drillState } = this.props;
    return (
      <React.Fragment>
        <DropDownMenu menuText="File">
          <HiddenMenuItem />
          <DropDownMenuItem onClick={designViewState.newDrill}>
            New Drill
          </DropDownMenuItem>
          <DropDownMenuItem onClick={drillState.getUserDrills}>
            Open...
          </DropDownMenuItem>
          <DropDownMenuItem onClick={drillState.saveDrill}>
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
