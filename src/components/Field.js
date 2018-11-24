import React, { Component } from 'react';
import FieldPainter from '../lib/FieldPainter';

class Field extends Component {

  onResize = () => {
    if (!this.fieldPainter) return;
    const fieldContainer = document.getElementById('fieldContainer');
    this.fieldPainter.resize(fieldContainer.clientWidth, fieldContainer.clientHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.drawField();
    this.onResize();
  }

  drawField() {
    const canvas = document.getElementById('fieldCanvas');
    this.fieldPainter = new FieldPainter(canvas);
    this.fieldPainter.draw();
    this.onResize();
  }

  render() {
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
          style={{ border: 'none' }}
        />
      </div>
    );
  }
}

export default Field;
