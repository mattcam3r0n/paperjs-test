import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import DrillPicker from './DrillPicker';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    //overflowY: 'scroll',
    // width: '100%',
    marginTop: 48,
    padding: 8,
  },
});

@inject('drillState', 'appState')
@observer
class Home extends Component {
  handleDrillSelected = (drill) => {
    const { appState, drillState, history } = this.props;
    appState.startSpinner();
    drillState
      .openDrill(drill.id)
      .then(() => {
        history.push('/design');
      })
      .catch((ex) => {})
      .finally(() => {
        appState.stopSpinner();
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DrillPicker onDrillSelected={this.handleDrillSelected} />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
