import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import PaletteButton from './PaletteButton';
import { Done, Close, Timeline, Undo, Delete } from '@material-ui/icons';

import Palette from './Palette';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class SelectionPalette extends Component {
  state = {};

  handleRectangularSelection = () => {
    this.props.designViewState.activateRectangularSelectionTool();
  }

  handleIrregularSelection = () => {
    this.props.designViewState.activateIrregularSelectionTool();
  }

  render() {
    const { designViewState, left = 400, top = 100 } = this.props;
    return (
      <Palette title="Selection" visible={designViewState.isSelectionToolActive} left={left} top={top} >
        <PaletteButton title="Rectangular Selection" onClick={this.handleRectangularSelection} selected={designViewState.isRectangularSelectionToolActive}>
          <Timeline />
        </PaletteButton>
        <PaletteButton title="Irregular Selection" onClick={this.handleIrregularSelection} selected={designViewState.isIrregularSelectionToolActive}>
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

export default withStyles(styles)(SelectionPalette);
