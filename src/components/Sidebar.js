import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import PlayArrow from '@material-ui/icons/PlayArrow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 160;

const styles = (theme) => {
  console.log(theme);
  return {
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    listItem: {
      paddingLeft: 12,
      paddingRight: 12
    },
    listItemIcon: {
      marginRight: 8,
    },
    listItemText: {
      paddingLeft: 8,
    },
  };
};

function SideBar(props) {
  const { classes } = props;
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
          <ListItemIcon className={classes.listItemIcon}>
            <PlayArrow />
          </ListItemIcon>
          <ListItemText primary="Marchers" className={classes.listItemText} />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <PlayArrow />
          </ListItemIcon>
          <ListItemText primary="Marchers" className={classes.listItemText} />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <PlayArrow />
          </ListItemIcon>
          <ListItemText primary="Marchers" className={classes.listItemText} />
        </ListItem>
      </List>
      <Divider />
      {/* <List>{otherMailFolderListItems}</List> */}
    </Drawer>
  );
}

export default withStyles(styles)(SideBar);
