import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
  root: {},
});

@inject('appState', 'designViewState')
@observer
class NewDrillDialog extends Component {
  state = {
      name: '',
      description: ''
  };

  handleOnEnter = (e) => {
    this.setState({
      name: '',
      description: ''
    });
    console.log('entered');
  }

  handleNameChange = (e) => {
    this.setState({
        name: e.target.value
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
        description: e.target.value
    });
  };

  handleCancel = () => {
    this.props.appState.closeNewDrillDialog();
  };

  handleContinue = () => {
    const { appState, designViewState, history } = this.props;
    const { name, description } = this.state;
    appState.startSpinner();
    designViewState
      .newDrill({
          name,
          description
      })
      .then((drill) => {
        console.log('new drill', drill);
        this.props.appState.closeNewDrillDialog();
        history.push('/design');
      })
      .catch((ex) => {})
      .finally(() => {
        appState.stopSpinner();
      });
  };

  componentDidMount() {}

  render() {
    const { appState } = this.props;
    return (
      <Dialog
        open={appState.isNewDrillDialogOpen}
        disableBackdropClick={true}
        aria-labelledby="form-dialog-title"
        onEnter={this.handleOnEnter}
      >
        <DialogTitle id="form-dialog-title">New Drill</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your new drill.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Drill Name"
            fullWidth
            required
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleContinue} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withRouter(NewDrillDialog));
