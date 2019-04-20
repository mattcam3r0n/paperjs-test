import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('designViewState', 'drillState', 'fieldState')
@observer
class Field extends Component {

  controller;

  componentWillUnmount() {
    const { fieldState } = this.props;
    window.removeEventListener('resize', this.onResize);
    // reset zoom to 1 when field is unmounted so that, when it is remounted,
    // it will detect a change and rezoom the field.  need a better way to handle.
    fieldState.setZoom(1);
  }

  componentDidMount() {
    const { fieldState } = this.props;

    window.addEventListener('resize', this.onResize);

    const canvas = document.getElementById('fieldCanvas');
    fieldState.initializeField(canvas);
    this.onResize();
  }

  onResize = () => {
    const fieldContainer = document.getElementById('fieldContainer');
    this.props.fieldState.resize(fieldContainer.clientWidth, fieldContainer.clientHeight);
  };

  render() {
    const { designViewState } = this.props;
    return (
      <div
        id="fieldContainer"
        style={{
          flex: 'auto',
          overflow: 'hidden',
        }}
      >
        <canvas
          id="fieldCanvas"
          style={{ cursor: designViewState.cursor }}
        />
      </div>
    );
  }
}

export default Field;
