import React from 'react';
import ColorPicker from './ColorPicker';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex'
  }
});

@inject('fieldState')
@observer
class FieldSettings extends React.Component {
  setFieldSettings = (settings) => {
    const { fieldState } = this.props;
    fieldState.setFieldSettings(settings);
  };

  render() {
    const { classes } = this.props;
    const { fieldSettings } = this.props.fieldState;
    return (
      <div className={classes.container}>
        <ColorPicker
          label='Field'
          selectedColor={fieldSettings.fieldColor}
          onChange={(color) => {
            this.setFieldSettings({
                fieldColor: color.hex
            });
          }}
        />
        <ColorPicker
          label='Yardlines'
          selectedColor={fieldSettings.yardlineColor}
          onChange={(color) => {
            this.setFieldSettings({
                yardlineColor: color.hex
            });
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(FieldSettings);
