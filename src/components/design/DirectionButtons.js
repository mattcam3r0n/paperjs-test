import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { observer, inject } from 'mobx-react';

import PaletteButton from './PaletteButton';
import { ArrowForward } from '@material-ui/icons';
//import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    lineHeight: 2
  },
  north: {
    transform: 'rotate(-90deg)',
  },
  south: {
    transform: 'rotate(90deg)',
  },
  east: {
    transform: 'rotate(0deg)',
  },
  west: {
    transform: 'rotate(180deg)',
  },
  northWest: {
    transform: 'rotate(-135deg)',
  },
  northEast: {
    transform: 'rotate(-45deg)',
  },
  southEast: {
    transform: 'rotate(45deg)',
  },
  southWest: {
    transform: 'rotate(135deg)',
  },
});

class DirectionButtons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.buttonContainer}>
          <PaletteButton>
            <ArrowForward className={classes.northWest} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.north} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.northEast} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.west} />
          </PaletteButton>
          <PaletteButton>{/* <ArrowForward/> */}
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.east} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.southWest} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.south} />
          </PaletteButton>
          <PaletteButton>
            <ArrowForward className={classes.southEast} />
          </PaletteButton>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DirectionButtons);
