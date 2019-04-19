import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { observer, inject } from 'mobx-react';

const styles = (theme) => ({
  backdrop: {
    backgroundColor: "transparent"
  },
  paper: {
    // backgroundColor: "transparent",
    // boxShadow: "none",
    // overflow: "hidden"
  },  
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

@inject('appState')
@observer
class Spinner extends React.Component {
  render() {
    const { classes, appState } = this.props;
    return (
      <Dialog
        open={appState.isSpinning}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <CircularProgress size={96} className={classes.progress} />
      </Dialog>
    );
  }
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);
