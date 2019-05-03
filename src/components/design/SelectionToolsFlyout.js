import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import ButtonFlyOut from './ButtonFlyOut';
import FlyoutButton from './FlyoutButton';
import ToolNames from '../../lib/tools/ToolNames';

// icons
import SelectionIcon from '../icons/SelectionIcon';
import IrregularSelectionIcon from '../icons/IrregularSelectionIcon';
import SelectAllIcon from '../icons/SelectAllIcon';
import DeselectAllIcon from '../icons/DeselectAllIcon';

const styles = (theme) => ({
  fab: {
    margin: 0,
  },
});

@inject('designViewState')
@observer
class SelectionToolsFlyout extends Component {
  state = {};

  handlePointerTool = (e) => {
    //e.preventDefault();
    this.props.designViewState.activateTool(ToolNames.RECTANGULAR_SELECTION);
  };

  render() {
    //const { classes, designViewState } = this.props;
    return (
      <ButtonFlyOut icon={<SelectionIcon />} tooltip="Selection Tools">
        <FlyoutButton
          title="Rectangular Selection"
          onClick={this.handlePointerTool}
        >
          <SelectionIcon />
        </FlyoutButton>
        <FlyoutButton
          title="Freeform Selection"
          onClick={this.handlePointerTool}
        >
          <IrregularSelectionIcon />
        </FlyoutButton>
        <FlyoutButton title="Select All">
          <SelectAllIcon />
        </FlyoutButton>
        <FlyoutButton title="Deselect All">
          <DeselectAllIcon />
        </FlyoutButton>
        <FlyoutButton title="Hide Unselected Marchers" />
        <FlyoutButton title="Unhide All" />
      </ButtonFlyOut>
    );
  }
}

export default withStyles(styles)(SelectionToolsFlyout);
