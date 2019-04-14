import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class SettingsDialog extends React.Component {
  state = {
    tabValue: 0,
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    const { tabValue } = this.state;
    return (
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={this.handleClose}
        aria-labelledby="settings-dialog"
        {...other}
        BackdropProps={{
          classes: {
            root: classes.root,
          },
        }}
      >
        <DialogTitle id="settings-dialog">Settings</DialogTitle>
        <Paper square>
          <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
          >
            <Tab label="Field" />
            {/* <Tab label="Disabled" disabled />
            <Tab label="Active" /> */}
          </Tabs>
          {tabValue === 0 && <TabContainer>Field Settings</TabContainer>}
          {tabValue === 'two' && <TabContainer>Item Two</TabContainer>}
          {tabValue === 'three' && <TabContainer>Item Three</TabContainer>}
        </Paper>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SettingsDialog);
