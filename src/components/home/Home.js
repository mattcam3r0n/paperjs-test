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

  handleNewDrillSelected = () => {
    const { appState } = this.props;
    appState.openNewDrillDialog();
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
    const { classes } = this.props;
    const { drills } = this.state;
    return (
      <div className={classes.root}>
        <DrillPicker
          drills={drills}
          onDrillSelected={this.handleDrillSelected}
          onNewDrillSelected={this.handleNewDrillSelected}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
