import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
});

@inject('appState')
@observer
class ConfirmDialog extends React.Component {

  handleOnEnter = () => {

  };

  handleCancel = () => {
    const { appState } = this.props;
    appState.closeDialog(appState.DialogNames.CONFIRM, 'CANCEL');
  };

  handleContinue = () => {
    const { appState } = this.props;
    appState.closeDialog(appState.DialogNames.CONFIRM, 'CONFIRM');
  };

  render() {
    const { classes, appState } = this.props;
    return (
      <Dialog
        open={appState.isDialogOpen(appState.DialogNames.CONFIRM)}
        disableBackdropClick={true}
        aria-labelledby="confirm-dialog-title"
        onEnter={this.handleOnEnter}
      >
        <DialogTitle id="confirm-dialog-title">{appState.dialogOptions.title || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {appState.dialogOptions.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            {appState.dialogOptions.cancelButtonText || 'Cancel'}
          </Button>
          <Button onClick={this.handleContinue} color="primary">
            { appState.dialogOptions.confirmButtonText || 'Continue' }
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmDialog);
