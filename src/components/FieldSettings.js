import React from 'react';
import ColorPicker from './ColorPicker';

class FieldSettings extends React.Component {
  render() {
    return (
      <div>
        Field Color: <ColorPicker />
      </div>
    );
  }
}

export default FieldSettings;
