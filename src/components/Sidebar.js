import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import Bookmarks from '@material-ui/icons/Bookmarks';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

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
    // listItemIcon: {
    //   marginRight: 8,
    // },
    // listItemText: {
    //   paddingLeft: 8,
    // },
    fab: {
      margin: 0,
    },
  };
};

@inject('designViewState')
@observer
class SideBar extends Component {
  handlePlay = () => {
    const { designViewState } = this.props;
    if (designViewState.isPlaying) {
      designViewState.stop();
    } else {
      designViewState.play();
    }
  };

  render() {
    const { classes, designViewState } = this.props;
    return (
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
            <Fab
              size="small"
              className={classes.fab}
              color="inherit"
              onClick={this.handlePlay}
            >
              {designViewState.isPlaying ? <Stop /> : <PlayArrow />}
            </Fab>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Fab size="small" className={classes.fab} color="inherit">
              <Stop />
            </Fab>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Fab size="small" className={classes.fab} color="inherit">
              <Bookmarks />
            </Fab>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Fab size="small" className={classes.fab} color="inherit">
              <LibraryMusic />
            </Fab>
          </ListItem>
        </List>
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
