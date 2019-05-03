import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import PaletteButton from './PaletteButton';
import { Done, Close, Undo, Delete } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';

import Palette from './Palette';
import ToolNames from '../../lib/tools/ToolNames';
import DirectionButtons from './DirectionButtons';
import SelectionIcon from '../icons/SelectionIcon';
import IrregularSelectionIcon from '../icons/IrregularSelectionIcon';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class SelectionPalette extends Component {
  state = {};

  handleRectangularSelection = () => {
    this.props.designViewState.activateTool(ToolNames.RECTANGULAR_SELECTION);
  };

  handleIrregularSelection = () => {
    this.props.designViewState.activateTool(ToolNames.IRREGULAR_SELECTION);
  };

  render() {
    const { designViewState, left = 400, top = 100 } = this.props;
    return (
      <Palette
        title="Selection"
        visible={designViewState.isSelectionToolActive}
        left={left}
        top={top}
      >
        <DirectionButtons />
        <div style={{ width: '100%'}}>
          <Divider />
        </div>
        <PaletteButton
          title="Rectangular Selection"
          onClick={this.handleRectangularSelection}
          selected={designViewState.isToolActive(
            ToolNames.RECTANGULAR_SELECTION
          )}
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="click"
          data-amplify-analytics-attrs="tool:rectangularSelection"
        >
          <SelectionIcon />
        </PaletteButton>
        <PaletteButton
          title="Irregular Selection"
          onClick={this.handleIrregularSelection}
          selected={designViewState.isToolActive(ToolNames.IRREGULAR_SELECTION)}
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="click"
          data-amplify-analytics-attrs="tool:irregularSelection"
        >
          <IrregularSelectionIcon />
        </PaletteButton>
        <PaletteButton title="Undo" onClick={this.handleUndo}>
          <Undo />
        </PaletteButton>
        <PaletteButton
          title="Delete Current Path"
          onClick={this.handleDeletePath}
        >
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
