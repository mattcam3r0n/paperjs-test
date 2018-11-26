import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';

import paper from 'paper';
import FieldPainter from '../lib/FieldPainter';
import { reaction } from 'mobx';
import PanTool from '../lib/PanTool';

class Field extends Component {
  onResize = () => {
    if (!this.fieldPainter) return;
    const { appState } = this.props;
    const fieldContainer = document.getElementById('fieldContainer');
    const { clientWidth, clientHeight } = fieldContainer;
    this.fieldPainter.resize(clientWidth, clientHeight);

    appState.setFieldContainerSize({
      width: clientWidth,
      height: clientHeight
    });
    appState.zoomToFit();
  };

  onPan = (delta) => {
    const { appState } = this.props;
    appState.setCenterDelta(delta);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    console.log('Field component did mount');
    window.addEventListener('resize', this.onResize);

    reaction(
      () => this.props.appState.zoomFactor,
      (zoomFactor, reaction) => {
        console.log('zoom factor is ', zoomFactor);
        this.fieldPainter.zoom(zoomFactor);
      }
    );

    reaction(
      () => this.props.appState.center,
      (center, reaction) => {
        this.fieldPainter.setCenter(center);
      }
    );

    this.drawField();
    this.onResize();

    const panTool = new PanTool(this.onPan);
  }

  drawField() {
    const canvas = document.getElementById('fieldCanvas');
    this.fieldPainter = new FieldPainter(canvas);
    this.fieldPainter.draw();
    this.onResize();
  }

  render() {
    const { appState } = this.props;
    return (
      <div
        id="fieldContainer"
        style={{
          flex: 'auto',
          overflow: 'hidden',
          // backgroundColor: 'gray',
          //   width: 'calc(100vw - 240px)',
          //   height: 'calc((100vw - 240px) / 2)',
        }}
      >
        <canvas
          id="fieldCanvas"
          //   data-paper-resize="true"
          // style={{ width: '100%', height: '100%', border: 'solid 1px black' }}
          style={{ cursor: appState.activeTool == 'pan' ? 'grab' : 'default'}}
        />
      </div>
    );
  }
}

export default compose(
  inject('appState'),
  observer,
)(Field);
