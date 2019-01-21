import FieldTool from './FieldTool';

export default class RectangularSelectionTool extends FieldTool {
  constructor(paperScope) {
    super('rectangularSelection', paperScope);
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseUp = this.onMouseUp;
    this.tool.onMouseMove = this.onMouseMove;
    this.tool.onMouseDrag = this.onMouseDrag;
    this.selectionRect = null;
  }

  dispose() {
    this.disposeRect();
    this.tool.off('mousedown');
    this.tool.off('mouseup');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    super.dispose();
  }

  disposeRect() {
    if (!this.selectionRect) return;
    this.selectionRect.remove();
  }

  onMouseDown = (event) => {};

  onMouseUp = (event) => {
    if (this.selectionRect)
      this.selectionRect.remove();
  };

  onMouseDrag = (event) => {
    // if (!this.selectionRect) {
    //   this.selectionRect = this.createRect(event.downPoint);
    // }

    // this.selectionRect.size = new this.paperScope.Size(
    //   event.point.x - event.downPoint.x,
    //   event.point.y - event.downPoint.y
    // );
    if (this.selectionRect)
      this.selectionRect.remove();
    this.selectionRect = this.createRect(event.downPoint, event.point);
  };

  onMouseMove = (event) => {};

  createRect(from, to) {
    return new this.paperScope.Path.Rectangle({
      from: from,
      to: to,
      strokeColor: 'deepskyblue',
      strokeWidth: 0.25,
      dashArray: [0.5, 0.5],
      opacity: 1
    });
  }

  cancel() {
    this.dispose();
  }
}
