import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import ButtonFlyOut from './ButtonFlyOut';
import FlyoutButton from './FlyoutButton';
import ToolNames from '../../lib/tools/ToolNames';

// icons
import { Build as ToolsIcon, Timeline as PathIcon } from '@material-ui/icons';
import FootprintsIcon from '../icons/FootprintsIcon';

const styles = (theme) => ({
  fab: {
    margin: 0,
  },
});

@inject('designViewState')
@observer
class EditToolsFlyout extends Component {
  state = {};

  handlePathTool = (e) => {
    //    e.preventDefault();
    const { designViewState } = this.props;
    designViewState.activateTool(ToolNames.PATH);
  };

  activateStepsTool = () => {
    const { designViewState } = this.props;
    designViewState.activateTool(ToolNames.STEPS);
  };

  render() {
    return (
      <ButtonFlyOut icon={<ToolsIcon />} tooltip="Editing Tools">
        <FlyoutButton title="Steps Tool" onClick={this.activateStepsTool}>
          <FootprintsIcon />
        </FlyoutButton>
        <FlyoutButton title="Path Tool">
          <PathIcon />
        </FlyoutButton>
        <FlyoutButton title="Gate Tool" />
        <FlyoutButton title="Pinwheel Tool" />
        <FlyoutButton title="Drag Step Tool" />
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(EditToolsFlyout);
