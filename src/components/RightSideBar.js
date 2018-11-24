import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Fullscreen from '@material-ui/icons/Fullscreen';
import PanTool from '@material-ui/icons/PanTool';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 64;

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
      paddingRight: 12,
    },
    listItemIcon: {
      marginRight: 8,
    },
    listItemText: {
      paddingLeft: 8,
    },
    fab: {

    }
  };
};

function RightSideBar(props) {
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
          <Button variant="fab" mini className={classes.fag} color="primary">
            <ZoomIn/>
          </Button>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Button variant="fab" mini className={classes.fag} color="secondary">
            <ZoomOut/>
          </Button>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Button variant="fab" mini className={classes.fag} color="inherit">
            <Fullscreen/>
          </Button>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Button variant="fab" mini className={classes.fag} color="inherit">
            <PanTool/>
          </Button>
        </ListItem>
      </List>
      <Divider />
      {/* <List>{otherMailFolderListItems}</List> */}
    </Drawer>
  );
}

export default withStyles(styles)(RightSideBar);
