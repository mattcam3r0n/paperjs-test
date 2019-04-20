import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import DrillCard from './DrillCard';
import SearchBar from './SearchBar';
import NewDrillCard from './NewDrillCard';
import { Paper, Grid, Tabs, Tab } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    // overflowY: 'scroll',
    // height: '100%'
  },
  scroll: {
    flexGrow: 1,
    overflowY: 'scroll',
    height: '80vh',
    marginTop: 10
  },
});

@inject('appState')
@observer
class DrillCardList extends Component {
  handleChange = () => {
    // const { appState } = this.props;
    // appState.isSpinning? appState.stopSpinner() : appState.startSpinner();
  }

  render() {
    const { classes, onDrillSelected, onNewDrillSelected, drills } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper square>
              <Tabs
                value={1}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
              >
                <SearchBar />
                <Tab label="Recent" />
                <Tab label="All" />
              </Tabs>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.scroll}>
          <Grid item xs={3}>
            <NewDrillCard onNewDrillSelected={onNewDrillSelected} />
          </Grid>
          {drills.map((d, i) => (
            <Grid key={i} item xs={3}>
              <DrillCard drill={d} onDrillSelected={onDrillSelected} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DrillCardList);
