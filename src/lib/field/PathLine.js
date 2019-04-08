import { Path, PointText } from 'paper';
import LineUtils from './LineUtils';

const defaultOptions = {
    inactiveColor: "lightslategray",
    activeColor: "deepskyblue",
    strokeWidth: 0.25,
    strokeCap: 'round',
    dashArray: [0.5, 0.5],
    selected: true,
    showSegmentLength: true
};

export default class PathLine {
    constructor(startPoint, options) {
        const mergedOptions = { ...defaultOptions, ...options };
        this.options = mergedOptions;
        this.path = new Path({
            _itemType: 'path',
            strokeColor: mergedOptions.inactiveColor,
            strokeWidth: mergedOptions.strokeWidth,
            strokeCap: mergedOptions.strokeCap,
            dashArray: mergedOptions.dashArray,
            segments: [startPoint, startPoint],
            selected: mergedOptions.selected,
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

    undoLastSegment() {
        const { path } = this;
        if (path.segments.length > 2) {
            path.segments.pop();
            this.hideLastSegment();
        }
    }

    activate() {
        this.path.segments.forEach(s => {
            if (s.pathSegmentLength)
                s.pathSegmentLength.fillColor = this.options.activeColor;
        });
        this.path.selected = true;
    }

    deactivate() {
        this.hideLastSegment();
        this.path.segments.forEach(s => {
            if (s.pathSegmentLength)
                s.pathSegmentLength.fillColor = this.options.inactiveColor;
        });
        this.path.selected = false;
    }

    remove() {
        const { path } = this;
        this.path.segments.forEach(s => {
            if (s.pathSegmentLength)
                s.pathSegmentLength.remove();
        });
        path.remove();
    }

    hideLastSegment() {
        const { lastSegment } = this.path;
        lastSegment.point = lastSegment.previous.point.clone();
        if (lastSegment.pathSegmentLength) {
          lastSegment.pathSegmentLength.visible = false;
        }
    }
 
    drawPathSegmentLength(segment) {
        if (!this.options.showSegmentLength) return;
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
            fillColor: this.options.activeColor,
            justification: 'center',
            fontSize: 2,
          });
        text.content = LineUtils.getLengthInSteps(segment);
        text.point = textPoint;
        text.visible = true;
        segment.pathSegmentLength = text;
      }
        
}