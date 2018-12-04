import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Done, Close, Timeline, Undo, Delete } from '@material-ui/icons';

import Palette from './Palette';

const styles = (theme) => ({});

class PathPalette extends Component {
  state = {};

  render() {
    return (
      <Palette title="Path Tool">
        <Tooltip title="New Path">
          <IconButton size="small" variant="outlined">
            <Timeline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo">
          <IconButton size="small" variant="outlined">
            <Undo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Current Path">
          <IconButton size="small" variant="outlined">
            <Delete />
          </IconButton>
        </Tooltip>
        <div>
          <Tooltip title="Save">
            <IconButton size="small" variant="outlined">
              <Done style={{ color: 'green ' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton size="small" variant="outlined">
              <Close style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </div>
      </Palette>
    );
  }
}

export default compose(
  inject('appState'),
  observer,
  withStyles(styles)
)(PathPalette);
