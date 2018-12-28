import paper, { Path, PointText } from 'paper';
import LineUtils from './LineUtils';

export default class PathTool {
  constructor(paperScope) {
    this.paperScope = paperScope;
    paperScope.activate();
    this.name = 'path';
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
  }

  activate() {
    this.tool.activate();
  }

  dispose() {
    this.tool.off('mousedown');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    this.tool.remove();
    this.tool = null;
  }

  get cursor() {
    return 'crosshair';
  }

  onMouseDown = (event) => {
    const { item } = event;
    const { path, marcher } = this;

    if (path) {
      path.add(event.point);
      return;
    }

    if (item && item._itemType === 'marcher') {
      this.path = new Path({
        strokeColor: 'gray',
        strokeWidth: 0.25,
        strokeCap: 'round',
        dashArray: [0.5, 0.5],
        segments: [marcher.position, marcher.position],
        selected: true
      });
    }
  };

  onMouseDrag = (event) => {};

  onMouseMove = (event) => {
    const { item } = event;
    const { path } = this;

    // ignore mouse moves that originate from other than the canvas
    const targetNodeName = event.event.target.nodeName;
    if (targetNodeName !== 'CANVAS') {
      this.hideLastSegment();
      return;
    }

    if (path) {
      const snapped = LineUtils.snapToLine(
        path.lastSegment.previous.point,
        event.point
      );
      path.lastSegment.point = snapped;
      this.drawPathSegmentLength(path.lastSegment);
    }

    if (item && item._itemType === 'marcher') {
      this.highlightMarcher(item);
      return;
    }

    this.unhighlightMarcher();
  };

  hideLastSegment() {
    const lastSegment = this.path.lastSegment;
    lastSegment.point = lastSegment.previous.point.clone();
    if (lastSegment.pathSegmentLength) {
      lastSegment.pathSegmentLength.visible = false;
    }
  }

  drawPathSegmentLength(segment) {
    const p1 = segment.point;
    const p2 = segment.previous.point;
    const v = p2.subtract(p1).divide(2);
    let textPoint = p1.add(v);
    if (LineUtils.isVertical(segment)) {
      // place to left of vertical line
      textPoint = textPoint.add({ x: -1.5, y: 0 });
    } else {
      textPoint = textPoint.add({ x: 0, y: -0.5 });
    }
    const text =
      segment.pathSegmentLength ||
      new PointText({
        point: textPoint,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fillColor: 'deepskyblue',
        justification: 'center',
        fontSize: 2,
      });
    text.content = LineUtils.getLengthInSteps(segment);
    text.point = textPoint;
    text.visible = true;
    segment.pathSegmentLength = text;
  }

  highlightMarcher = (item) => {
    // highlight
    this.marcher = item;
    item.strokeColor = 'yellow';
  };

  unhighlightMarcher = () => {
    if (!this.marcher) return;

    this.marcher.strokeColor = 'black';
    this.marcher = null;
  };
}
