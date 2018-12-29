import paper, { Path, PointText } from 'paper';
import LineUtils from './LineUtils';

export default class PathLine {
    constructor(startPoint) {

        this.path = new Path({
            strokeColor: 'gray',
            strokeWidth: 0.25,
            strokeCap: 'round',
            dashArray: [0.5, 0.5],
            segments: [startPoint, startPoint],
            selected: true,
          });
    
    }

    add(point) {
        this.path.add(point);
    }

    setEndPoint(endPoint) {
        const { path } = this;
        path.lastSegment.point = LineUtils.snapToLine(
            path.lastSegment.previous.point,
            endPoint
          );
        this.drawPathSegmentLength(path.lastSegment);    
    }

    hideLastSegment() {
        const { lastSegment } = this.path;
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
        
}