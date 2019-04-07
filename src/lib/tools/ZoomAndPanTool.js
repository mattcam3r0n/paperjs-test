import FieldTool from './FieldTool';
import { throttle } from 'lodash';
import ToolNames from './ToolNames';

export default class ZoomAndPanTool extends FieldTool {
  constructor(paperScope, viewState, mode) {
    super(ToolNames.ZOOM_IN, paperScope);
    this.viewState = viewState;
    this.mode = mode || 'zoomIn';
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseDrag = throttle(this.onMouseDrag, 50);
    this.tool.onKeyDown = this.onKeyDown;
    this.tool.onKeyUp = this.onKeyUp;
  }

  get cursor() {
    if (this.mode === 'zoomIn') return 'zoom-in';
    if (this.mode === 'zoomOut') return 'zoom-out';
    if (this.mode === 'pan') return 'grab';
    return 'default';
  }

  setMode(mode) {
    this.saveMode = this.mode;
    this.mode = mode;
    this.viewState.setCursor(this.cursor);
  }

  restoreMode() {
    if (this.saveMode) this.mode = this.saveMode;
    this.saveMode = null;
    this.viewState.setCursor(this.cursor);
  }

  onKeyDown = (event) => {
    if (event.key === 'shift' && this.mode === 'zoomIn') {
      return this.setMode('zoomOut');
    }

    if (event.key === 'shift' && this.mode === 'zoomOut') {
      return this.setMode('zoomIn');
    }

    if (event.key === 'alt') {
    //   event.preventDefault();
      return this.setMode('pan');
    }
  };

  onKeyUp = (event) => {
    this.restoreMode();
  };

  onMouseDown = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    if (this.mode === 'zoomIn') return this.viewState.zoomIn(event.downPoint);

    if (this.mode === 'zoomOut') return this.viewState.zoomOut(event.downPoint);
  };

  onMouseDrag = (event) => {
    if (this.mode !== 'pan') return;
    const speed = 2;
    const newDelta = this.dejitter(event.delta.multiply(speed));
    this.lastDelta = newDelta;
    this.viewState.setCenterDelta(newDelta);
  };

  dispose() {
    this.tool.off('mousedown');
    this.tool.off('onkeyup');
    this.tool.off('onkeydown');
    this.tool.off('onmousedrag');
    super.dispose();
  }

  dejitter(delta) {
    // sometimes the mouse delta jitters, eg. between -1.2 and 1.2
    // try to detect and modify to smooth panning.
    if (!this.lastDelta) return delta;

    const min = 0.3;
    return {
      x: Math.abs(delta.x + this.lastDelta.x) < min ? 0 : delta.x,
      y: Math.abs(delta.y + this.lastDelta.y) < min ? 0 : delta.y,
    };
  }
}
