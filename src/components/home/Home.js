import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import DrillPicker from './DrillPicker';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 48,
    padding: 8,
  },
});

// TEMP
const Splash = () => <div>Show splash page</div>;

@inject('drillState', 'appState', 'designViewState')
@observer
class Home extends Component {
  state = {
    drills: [],
  };

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

  handleDeleteDrill = (drill) => {
    const { appState, drillState } = this.props;
    appState
      .openDialog(appState.DialogNames.CONFIRM, {
        title: 'Delete Drill',
        message: 'Are you sure you want to delete this drill?',
        confirmButtonText: 'Delete',
      })
      .then((status) => {
        if (status === 'CONFIRM') {
          drillState.deleteDrill(drill);
          this.setState({
            drills: this.state.drills.filter((d) => d.id !== drill.id),
          });
        }
      });
  };

  handleNewDrillSelected = () => {
    const { appState } = this.props;
    appState.openDialog(appState.DialogNames.NEW_DRILL);
  };

  componentDidMount() {
    const { drillState } = this.props;
    drillState.getUserDrills().then((drills) => {
      this.setState({
        drills,
      });
    });
  }

  render() {
    const { classes, appState } = this.props;
    const { drills } = this.state;
    return (
      <div className={classes.root}>
        {appState.authenticated ? (
          <DrillPicker
            drills={drills}
            onDrillSelected={this.handleDrillSelected}
            onNewDrillSelected={this.handleNewDrillSelected}
            onDeleteDrill={this.handleDeleteDrill}
          />
        ) : (
          <Splash />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
