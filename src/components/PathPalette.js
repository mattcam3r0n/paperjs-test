import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import PaletteButton from './PaletteButton';
import { Done, Close, Timeline, Undo, Delete } from '@material-ui/icons';

import Palette from './Palette';
import ToolNames from '../lib/tools/ToolNames';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class PathPalette extends Component {
  state = {};

  get isPathToolActive() {
    const { designViewState } = this.props;
    return designViewState.isToolActive(ToolNames.PATH);
  }

  getPathTool = () => {
    const { designViewState } = this.props;
    if (!this.isPathToolActive) return null;
    return designViewState.activeTool;
  };

  handleNewPath = () => {
    const pathTool = this.getPathTool();
    if (pathTool) pathTool.newPath();
  };

  handleSelectFile = () => {
    const { designViewState } = this.props;
    designViewState.activateFileSelectorTool();
  };

  handleUndo = () => {
    const pathTool = this.getPathTool();
    if (pathTool) pathTool.undoLastSegment();
  };

  handleDeletePath = () => {
    const pathTool = this.getPathTool();
    if (pathTool) pathTool.deleteCurrentPath();
  };

  handleCancel = () => {
    const { designViewState } = this.props;
    const pathTool = this.getPathTool();
    if (pathTool) pathTool.cancel();
    designViewState.activateSelectionTool();
  };

  render() {
    return (
      <Palette title="Path Tool" visible={this.isPathToolActive}>
        <PaletteButton title="New Path" onClick={this.handleNewPath}>
          <Timeline />
        </PaletteButton>
        <PaletteButton title="Select File" onClick={this.handleSelectFile}>
          <Timeline />
        </PaletteButton>
        <PaletteButton title="Undo" onClick={this.handleUndo}>
          <Undo />
        </PaletteButton>
        <PaletteButton title="Delete Current Path" onClick={this.handleDeletePath}>
          <Delete />
        </PaletteButton>
        <div>
          <PaletteButton title="Save">
            <Done style={{ color: 'green ' }} />
          </PaletteButton>
          <PaletteButton title="Cancel" onClick={this.handleCancel}>
            <Close style={{ color: 'red' }} />
          </PaletteButton>
        </div>
      </Palette>
    );
  }
}

export default withStyles(styles)(PathPalette);
