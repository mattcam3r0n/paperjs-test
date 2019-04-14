import React from 'react';
import ColorPicker from './ColorPicker';
import { observer, inject } from 'mobx-react';

@inject('fieldState')
@observer
class FieldSettings extends React.Component {
  setFieldSettings = (settings) => {
    const { fieldState } = this.props;
    fieldState.setFieldSettings(settings);
  };

  render() {
    return (
      <div>
        Field Color:{' '}
        <ColorPicker
          onChange={(color) => {
            this.setFieldSettings({
                fieldColor: color.hex
            });
          }}
        />
        Yardline Color:{' '}
        <ColorPicker
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

export default FieldSettings;
