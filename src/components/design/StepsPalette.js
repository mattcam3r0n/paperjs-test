import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import PaletteButton from './PaletteButton';
import { Done, Close } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';

import Palette from './Palette';
import ToolNames from '../../lib/tools/ToolNames';
import DirectionButtons from './DirectionButtons';

const styles = (theme) => ({});

@inject('designViewState')
@observer
class StepsPalette extends Component {
  state = {};

  get isStepsToolActive() {
    return this.props.designViewState.isToolActive(ToolNames.STEPS);
  }

  render() {
    const { designViewState, left = 400, top = 100 } = this.props;
    return (
      <Palette
        title="Steps Tool"
        visible={this.isStepsToolActive}
        left={left}
        top={top}
      >
        <DirectionButtons />
        <div style={{ width: '100%'}}>
          <Divider />
        </div>
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

export default withStyles(styles)(StepsPalette);
