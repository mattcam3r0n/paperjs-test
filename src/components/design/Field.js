import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FieldController from '../../lib/field/FieldController';

@inject('designViewState', 'drillState', 'fieldState')
@observer
class Field extends Component {

  controller;

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    const { designViewState, fieldState, drillState } = this.props;
    const rootState = {
      designViewState,
      fieldState,
      drillState
    };

    window.addEventListener('resize', this.onResize);

    const canvas = document.getElementById('fieldCanvas');
    this.controller = new FieldController(canvas, rootState);

    this.onResize();
    rootState.designViewState.fieldInitialized(); // necessary?
  }

  componentWillMount() {
    const { fieldState } = this.props;
    // reset zoom to 1 when field is unmounted so that, when it is remounted,
    // it will detect a change and rezoom the field.  need a better way to handle.
    fieldState.setZoom(1);
  }

  onResize = () => {
    if (!this.controller) return;
    const fieldContainer = document.getElementById('fieldContainer');
    this.controller.resize(fieldContainer.clientWidth, fieldContainer.clientHeight);
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
