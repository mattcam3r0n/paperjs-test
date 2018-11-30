import paper, { Path, Point } from 'paper';
import { round } from 'lodash';
import FieldDimensions from './FieldDimensions';

export default class PathTool {
  constructor() {
    this.name = 'path';
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
    // this.panTool.onMouseDown = this.onMouseDown;
    // this.panTool.onMouseDrag = throttle(this.onMouseDrag, 50);
    //this.panTool.onMouseDrag = this.onMouseDrag;
    //this.panTool.minDistance = 1;
    //this.panTool.maxDistance = 600;
  }

  onMouseMove = (event) => {
    const { item } = event;

    if (this.path) {
      const snapped = this.snapToLine(
        this.path.lastSegment.previous.point,
        event.point
      );
      this.path.lastSegment.point = snapped;

      // const p2 = event.point;
      // const p1 = this.path.lastSegment.previous.point;
      // const v = p2.subtract(p1);
      // console.log('v', v);
      // const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
      // v.angle = a;
      // console.log('v2', v);

      // this.path.lastSegment.point = p1.add(v);

      // console.log(
      //   this.path.lastSegment.previous.point,
      //   this.path.lastSegment.point,
      //   this.path.lastSegment.point.subtract(
      //     this.path.lastSegment.previous.point
      //   ).angle,
      //   this.normalizeAngle(
      //     this.path.lastSegment.point.subtract(
      //       this.path.lastSegment.previous.point
      //     ).angle + 90
      //   )
      // );
    }

    if (item && item._itemType === 'marcher') {
      this.highlightMarcher(item);
      return;
    }

    this.unhighlightMarcher();
  };

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
      return;
    }

    if (item && item._itemType === 'marcher') {
      console.log('start path');
      this.path = new Path();
      this.path.strokeColor = 'gray';
      this.path.strokeWidth = 0.25;
      this.path.dashArray = [0.5, 0.5];
      this.path.strokeCap = 'round';
      this.path.add(this.marcher.position);
      this.path.add(this.marcher.position);
    }
  };

  onMouseDrag = (event) => {};

  activate() {
    this.tool.activate();
  }

  dispose() {
    this.onMouseDown = null;
    this.onMouseDrag = null;
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
    // console.log(angle, sector, snapAngle);
    return snapAngle;
  }

  snapToLine(p1, p2) {
    // x' = x + (d * cos(a))
    // y' = y + (d * sin(a))
    // const a = this.snapToAngle(p1, p2);
    // if (a % 90 === 0) return this.snapToOblique(p1, p2);

    // const d = round(this.calculateDistance(p1, p2));
    // return {
    //   x: round(p1.x + d * Math.cos(a)),
    //   y: round(p1.y + d * Math.sin(a)),
    // };

    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    if (a % 90 > 0) return this.snapToOblique(p1, p2);
    v.angle = a; // snap angle
    const p = p1.add(v);
    return new Point(round(p.x), round(p.y));
}

  snapToOblique(p1, p2) {
    // x' = x + (d * cos(a))
    // y' = y + (d * sin(a))
    // const a = this.snapToAngle(p1, p2);
    // const d = Math.floor(
    //   this.calculateDistance(p1, p2) / FieldDimensions.obliqueStepSize
    // );
    // return {
    //   x: p1.x + d * Math.cos(a),
    //   y: p1.y + d * Math.sin(a),
    // };

    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    v.angle = a; // snap angle
    v.length = round(v.length / FieldDimensions.obliqueStepSize);
    const p = p1.add(v);
    return new Point(round(p.x), round(p.y));
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
