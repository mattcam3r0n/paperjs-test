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
class AddMarchersPalette extends Component {

  render() {
    const { designViewState, left = 300, top = 100 } = this.props;
    return (
      <Palette title="Add Marchers" visible={designViewState.isToolActive(ToolNames.ADD_MARCHERS)} left={left} top={top} >
        <PaletteButton title="New Path" onClick={this.handleNewPath}>
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

export default withStyles(styles)(AddMarchersPalette);
