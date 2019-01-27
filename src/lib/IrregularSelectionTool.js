import FieldTool from './FieldTool';

export default class IrregularSelectionTool extends FieldTool {
  constructor(paperScope) {
    super('irregularSelection', paperScope);
    this.paperScope.view.onDoubleClick = this.onDoubleClick;
    this.paperScope.view.onClick = this.onClick;
    this.paperScope.view.onMouseMove = this.onMouseMove;
    this.selectionPath = null;
  }

  dispose() {
    this.disposeSelection();
    this.paperScope.view.off('doubleclick');
    this.paperScope.view.off('click');
    super.dispose();
  }

  disposeSelection() {
    if (!this.selectionPath) return;
    this.selectionPath.remove();
    this.selectionPath = null;
  }

  onDoubleClick = (event) => {
    console.log('onDoubleClick', event);

    if (this.selectionPath) {
      this.finishSelection(event.point);
    } else {
      this.startSelection(event.point);
    }    
  };

  onClick = (event) => {
    console.log('onClick', event);
    if (this.selectionPath) {
      this.addPoint(event.point);
    }
  };

  onMouseMove = (event) => {
    if (this.selectionPath) {
      this.selectionPath.lastSegment.point = event.point;
    }
  };

  startSelection(point) {
    this.selectionPath = this.createPath(point);
  }

  finishSelection(point) {
    this.disposeSelection();
  }

  addPoint(point) {
    this.selectionPath.add(point);
  }

  createPath(point) {
    return new this.paperScope.Path({
      segments: [point, point],
      strokeColor: 'deepskyblue',
      strokeWidth: 0.25,
      dashArray: [0.5, 0.5],
      opacity: 0.5,
      fillColor: 'white',
      closed: true
    });
  }

  cancel() {
    this.dispose();
  }
}
