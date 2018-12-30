import { Point } from 'paper';
import { round } from 'lodash';
import FieldDimensions from './FieldDimensions';

export default class LineUtils {
  static degreesInRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  static radiansInDegrees(radians) {
    return (radians * 180) / Math.PI + 180;
  }

  static calculateAngle(p1, p2) {
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    return this.radiansInDegrees(angle);
  }

  static snapToAngle(p1, p2) {
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

  static snapToLine(p1, p2) {
    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    if (a % 90 > 0) return this.snapToOblique(p1, p2);
    v.angle = a; // snap angle
    v.length = round(v.length);
    const p = p1.add(v);
    return new Point((p.x), (p.y));
}

  static snapToOblique(p1, p2) {
    const v = p2.subtract(p1);
    const a = this.radiansInDegrees(this.snapToAngle(p1, p2)) + 180;
    v.angle = a; // snap angle
    v.length = round(v.length / FieldDimensions.obliqueStepSize) * FieldDimensions.obliqueStepSize;
    const p = p1.add(v);
    return new Point((p.x), (p.y));
  }

  static calculateDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;

    return Math.sqrt(a * a + b * b);
  }

  static normalizeAngle(a) {
    if (a >= 0 && a < 360) return a;

    return a - Math.floor(a / 360) * 360;
  }

  static getLengthInSteps(segment) {
    if (this.isOblique(segment)) {
      return round(segment.curve.length / FieldDimensions.obliqueStepSize);
    }
    return round(segment.curve.length);
  }

  static isOblique(segment) {
    const angle = round(segment.curve.line.vector.angle + 90);
    return angle % 90 !== 0;
  }

  static isVertical(segment) {
    const angle = round(segment.curve.line.vector.angle + 90);
    return angle === 0 || angle === 180;
  }

}