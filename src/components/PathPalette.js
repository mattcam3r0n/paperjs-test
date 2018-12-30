import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Done, Close, Timeline, Undo, Delete } from '@material-ui/icons';

import Palette from './Palette';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class PathPalette extends Component {
  state = {};

  getPathTool = () => {
    if (!this.props.designViewState.isPathToolActive) return null;
    return this.props.designViewState.activeTool;
  }

  handleNewPath = () => {
    const pathTool = this.getPathTool();
    if (pathTool)
      pathTool.newPath();
  }

  render() {
    const { designViewState } = this.props;
    return (
      <Palette title="Path Tool" visible={designViewState.isPathToolActive}>
        <Tooltip title="New Path">
          <IconButton size="small" variant="outlined" onClick={this.handleNewPath}>
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

export default withStyles(styles)(PathPalette);
