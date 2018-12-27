import paper, { Path, Point, PointText } from 'paper';
import { round } from 'lodash';
import FieldDimensions from './FieldDimensions';

export default class PathTool {
  constructor(paperScope) {
    this.paperScope = paperScope;
    paperScope.activate();
    this.name = 'path';
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
  }

  get cursor() {
    return 'crosshair';
  }

  onMouseMove = (event) => {
    const { item } = event;

    // ignore mouse moves that originate from other than the canvas
    if (event.event.target.nodeName !== "CANVAS") return;

    if (this.path) {
      const snapped = this.snapToLine(
        this.path.lastSegment.previous.point,
        event.point
      );
      this.path.lastSegment.point = snapped;
      this.drawPathSegmentLength(this.path.lastSegment);
    }

    if (item && item._itemType === 'marcher') {
      this.highlightMarcher(item);
      return;
    }

    this.unhighlightMarcher();
  };

  drawPathSegmentLength(segment) {
    const p1 = segment.point;
    const p2 = segment.previous.point;
    const v = p2.subtract(p1).divide(2);
    let textPoint = p1.add(v);
    if (this.isVertical(segment)) { // place to left of vertical line
      textPoint = textPoint.add({ x: -1.5, y: 0 });
    } else {
      textPoint = textPoint.add({ x: 0, y: -0.5 });
    }
    const text = segment.pathSegmentLength || new PointText({
      point: textPoint,
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fillColor: 'deepskyblue',
      justification: 'center',
      fontSize: 2
    });
    text.content = this.getLengthInSteps(segment);
    text.point = textPoint;
    segment.pathSegmentLength = text;
  }

  getLengthInSteps(segment) {
    if (this.isOblique(segment)) {
      return round(segment.curve.length / FieldDimensions.obliqueStepSize);
    }
    return round(segment.curve.length);
  }

  isOblique(segment) {
    const angle = round(segment.curve.line.vector.angle + 90);
    return angle % 90 !== 0;
  }

  isVertical(segment) {
    const angle = segment.curve.line.vector.angle + 90;
    return angle === 0 || angle === 180;
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

  onMouseDown = (event) => {
    const { item } = event;

    if (this.path) {
      this.path.add(event.point);
      console.log('lastCurve', this.path.lastCurve);
      return;
    }

    if (item && item._itemType === 'marcher') {
      this.path = new Path();
      this.path.strokeColor = 'gray';
      this.path.strokeWidth = 0.25;
      this.path.dashArray = [0.5, 0.5];
      this.path.strokeCap = 'round';
      this.path.add(this.marcher.position);
      this.path.add(this.marcher.position);
      this.path.selected = true;
    }
  };

  onMouseDrag = (event) => {};

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

  // TODO: move to utils class
  degreesInRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  radiansInDegrees(radians) {
    return (radians * 180) / Math.PI + 180;
  }

  calculateAngle(p1, p2) {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    return this.radiansInDegrees(angle);
  }

  snapToAngle(p1, p2) {
    // TODO: find a way to do this mathematically
    const sectorMap = {
      0: 360,
      1: 45,
      2: 45,
      3: 90,
      4: 90,
      5: 135,
      6: 135,
      7: 180,
      8: 180,
      9: 225,
      10: 225,
      11: 270,
      12: 270,
      13: 315,
      14: 315,
      15: 360,
    };
    let angle = this.calculateAngle(p1, p2) - 180;
    angle = this.normalizeAngle(angle);
    const sector = Math.floor(angle / 22.5);
    const snapAngle = this.degreesInRadians(sectorMap[sector]);
    return snapAngle;
  }

  snapToLine(p1, p2) {
    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    if (a % 90 > 0) return this.snapToOblique(p1, p2);
    v.angle = a; // snap angle
    v.length = round(v.length);
    const p = p1.add(v);
    return new Point((p.x), (p.y));
}

  snapToOblique(p1, p2) {
    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    v.angle = a; // snap angle
    v.length = round(v.length / FieldDimensions.obliqueStepSize) * FieldDimensions.obliqueStepSize;
    const p = p1.add(v);
    return new Point((p.x), (p.y));
  }

  calculateDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;

    return Math.sqrt(a * a + b * b);
  }

  normalizeAngle(a) {
    if (a >= 0 && a < 360) return a;

    return a - Math.floor(a / 360) * 360;
  }
}
