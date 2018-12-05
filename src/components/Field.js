import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
//import { compose } from 'recompose';

import FieldPainter from '../lib/FieldPainter';

@inject('designViewState')
@observer
class Field extends Component {
  onResize = () => {
    if (!this.fieldPainter) return;
    const { designViewState } = this.props;
    const fieldContainer = document.getElementById('fieldContainer');
    const { clientWidth, clientHeight } = fieldContainer;
    this.fieldPainter.resize(clientWidth, clientHeight);

    designViewState.setFieldContainerSize({
      width: clientWidth,
      height: clientHeight
    });
    designViewState.zoomToFit();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    // move these to init/wireup funcs?
    reaction(
      () => this.props.designViewState.zoomFactor,
      (zoomFactor, reaction) => {
        this.fieldPainter.zoom(zoomFactor);
      }
    );

    reaction(
      () => this.props.designViewState.center,
      (center, reaction) => {
        this.fieldPainter.setCenter(center);
      }
    );

    this.drawField();
    this.onResize();

    // where should this go?
    // const panTool = new PanTool(this.onPan);
  }

  drawField() {
    const canvas = document.getElementById('fieldCanvas');
    this.fieldPainter = new FieldPainter(canvas);
    this.fieldPainter.draw();
    this.onResize();
  }

  render() {
    const { designViewState } = this.props;
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
          style={{ cursor: designViewState.activeTool && designViewState.activeTool.name === 'pan' ? 'grab' : 'default'}}
        />
      </div>
    );
  }
}

export default Field;
// export default compose(
//   inject('designViewState'),
//   observer,
// )(Field);
