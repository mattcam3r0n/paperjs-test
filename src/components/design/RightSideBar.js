import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
// import { compose } from 'recompose';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import ToolNames from '../../lib/tools/ToolNames';
import MarcherToolsFlyout from './MarcherToolsFlyout';
import ZoomToolsFlyout from './ZoomToolsFlyout';
import SelectionToolsFlyout from './SelectionToolsFlyout';
import EditToolsFlyout from './EditToolsFlyout';
import FlyoutButton from './FlyoutButton';
import FootprintsIcon from '../icons/FootprintsIcon';

const drawerWidth = 64;

const styles = (theme) => {
  return {
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    listItem: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    listItemIcon: {
      marginRight: 8,
    },
    listItemText: {
      paddingLeft: 8,
    },
    fab: {
      margin: 0,
    },
  };
};

@inject('designViewState')
@observer
class RightSideBar extends Component {
  state = {};

  handlePathTool = (e) => {
    this.props.designViewState.activateTool(ToolNames.RECTANGULAR_SELECTION);
  };

  componentDidMount() {
    this.props.designViewState.activateTool(ToolNames.RECTANGULAR_SELECTION);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {/* <List>{mailFolderListItems}</List> */}
          <List>
            <ListItem button className={classes.listItem}>
              <SelectionToolsFlyout />
            </ListItem>
            <ListItem button className={classes.listItem}>
              <FlyoutButton title="Steps Tool">
                <FootprintsIcon/>
              </FlyoutButton>
            </ListItem>
            <ListItem button className={classes.listItem}>
              <EditToolsFlyout />
            </ListItem>
            <ListItem button className={classes.listItem}>
              <MarcherToolsFlyout />
            </ListItem>
            <ListItem button className={classes.listItem}>
              <ZoomToolsFlyout />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RightSideBar);
