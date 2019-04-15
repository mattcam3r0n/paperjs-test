/*
    Field component uses FieldPainter
    * FieldPainter uses Paper to draw field, holds paper context
*/
import paper from 'paper';
import FieldDimensions from './FieldDimensions';
import Marcher from './Marcher';
import { merge } from 'lodash';

const yardlineMarkers = [
  '',
  '10',
  '20',
  '30',
  '40',
  '50',
  '40',
  '30',
  '20',
  '10',
  '',
];

const defaultOptions = {
  fieldColor: '#40703B',
  fieldOpacity: 1,
  yardlineColor: 'white',
  yardlineOpacity: 0.75,
  yardlineNumberColor: 'white',
  yardlineNumberOpacity: 0.75,
};

class FieldPainter {
  constructor(paperScope, options) {
    this.paperScope = paperScope;
    this.options = merge({}, defaultOptions, options);
    this.paperScope.activate();
    this.fieldSurface = null;
    this.hashes = [];
    this.yardlines = [];
    this.yardlineNumbers = [];
  }

  draw() {
    this.paperScope.activate();
    this.drawFieldSurface();
    this.drawSidelines();
    this.drawYardlines();
    this.drawHashmarks();
    this.drawYardlineNumbers();
    this.paperScope.view.draw();
  }

  setColors(options = {}) {
    options = merge({}, defaultOptions, options);
    if (this.fieldSurface) {
      this.fieldSurface.fillColor = options.fieldColor;
      this.fieldSurface.opacity = options.fieldOpacity;
    }
    if (this.sidelines) {
      this.sidelines.strokeColor = options.yardlineColor;
      this.sidelines.opacity = options.yardlineOpacity;
    }
    this.yardlines.forEach(y => {
      y.strokeColor = options.yardlineColor;
      y.opacity = options.yardlineOpacity;
    });
    this.hashes.forEach(h => {
      h.strokeColor = options.yardlineColor;
      h.opacity = options.yardlineOpacity;
    });
    this.yardlineNumbers.forEach(y => {
      y.fillColor = options.yardlineNumberColor;
      y.opacity = options.yardlineNumberOpacity;
    });
  }

  syncMarchers(drill) {
    this.deleteMarchers();
    this.createMarchers(drill);
  }

  createMarchers(drill) {
    this.marchers = drill.marchers.map((m) => {
      const { position } = m.script.currentState;
      return new Marcher(this.paperScope, {
        position: [position.x, position.y],
        rotation: position.rotation,
        marcher: m,
      });
    });
  }

  deleteMarchers() {
    if (!this.marchers) return;
    this.marchers.forEach((m) => {
      m.remove();
    });
  }

  syncMarcherPositions(drill) {
    this.marchers.forEach((m) => {
      // TODO: need a better way to map paper marchers to drill marchers
      m._marcher.position.x = m.options.marcher.script.currentState.position.x;
      m._marcher.position.y = m.options.marcher.script.currentState.position.y;
    });
  }

  update() {
    this.paperScope.view.update();
  }

  resize(width, height) {
    this.paperScope.activate();
    this.paperScope.view.viewSize.width = width;
    this.paperScope.view.viewSize.height = height;
    //paper.view.update();
  }

  zoom(zoomFactor) {
    this.paperScope.activate();
    this.paperScope.view.zoom = zoomFactor;
    //this.center();
  }

  zoomToFit(width, height) {
    this.paperScope.activate();
    const zoom = this.calculateZoomToFitFactor(width, height);
    this.paperScope.view.zoom = zoom;
    this.center();
  }

  center() {
    this.setCenter({
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    });
  }

  setCenter(center) {
    this.paperScope.view.center = [center.x, center.y];
  }

  setCenterFromDelta(delta) {
    const { center } = this.paperScope.view;
    this.paperScope.view.center = [center.x - delta.x, center.y - delta.y];
  }

  calculateZoomToFitFactor(width, height) {
    // TODO: need better algorithm that takes height into account
    return width / FieldDimensions.widthInSteps;
  }

  drawFieldSurface() {
    const { left, top, width, height } = FieldDimensions.fieldRect;
    this.fieldSurface = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      fillColor: this.options.fieldColor,
    });
  }

  drawSidelines() {
    const { left, top, width, height } = FieldDimensions.sidelineRect;
    this.sidelines = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      strokeColor: this.options.yardlineColor,
      strokeWidth: 0.25,
      opacity: this.options.yardlineOpacity,
    });
  }

  drawYardlines() {
    this.yardlines = [];
    for (let i = 0; i < 21; i++) {
      let x = FieldDimensions.goalLineX + i * 6;
      const yardline = new paper.Path({
        strokeColor: this.options.yardlineColor,
        strokeWidth: 0.25,
        opacity: this.options.yardlineOpacity,
      });
      yardline.add(
        [x, FieldDimensions.sidelineRect.top],
        [x, FieldDimensions.sidelineRect.bottom]
      );
      this.yardlines.push(yardline);
    }
  }

  drawHashmarks() {
    let lineOptions = {
      strokeColor: this.options.yardlineColor,
      strokeWidth: 0.25,
      opacity: this.options.yardlineOpacity,
    };
    this.hashes = [];
    for (let i = 1; i < 20; i++) {
      let x = FieldDimensions.goalLineX + i * FieldDimensions.fiveYardsX;
      let farHashCoords = {
        start: [x - 1, FieldDimensions.farHashY],
        end: [x + 1, FieldDimensions.farHashY],
      };
      let nearHashCoords = {
        start: [x - 1, FieldDimensions.nearHashY],
        end: [x + 1, FieldDimensions.nearHashY],
      };
      let farHash = new paper.Path(lineOptions);
      let nearHash = new paper.Path(lineOptions);
      farHash.add(farHashCoords.start, farHashCoords.end);
      nearHash.add(nearHashCoords.start, nearHashCoords.end);
      this.hashes.push(farHash, nearHash);
    }
  }

  drawYardlineNumbers() {
    let textOptions = {
      fontFamily: 'Palatino',
      fontWeight: 'normal',
      fontSize: 3.5,
      // lineHeight: 1,
      // originX: 'center',
      // originY: 'center',
      // scaleX: 0.8,
      // stroke: options.stroke || 'white',
      fillColor: this.options.yardlineNumberColor,
      opacity: this.options.yardlineNumberOpacity,
    };
    this.yardlineNumbers = [];
    // add near
    yardlineMarkers.forEach((m, i) => {
      this.drawYardlineNumber(m, i, true, textOptions);
    });

    // add far
    yardlineMarkers.forEach((m, i) => {
      this.drawYardlineNumber(m, i, false, textOptions);
    });
  }

  /*
  - top of number is 27' from sideline (10.8 steps)
  - numbers are 6' high by 4' wide (2.4 x 1.6)
  - bottom of number is (8.4 steps)
*/
  drawYardlineNumber(number, index, isNear, options) {
    // add each digit
    const firstDigit = number.substring(0, 1);
    const secondDigit = number.substring(1, 2);
    const leftOf50 = index < yardlineMarkers.length / 2;

    const y = isNear
      ? FieldDimensions.nearSidelineY - 9
      : FieldDimensions.farSidelineY + 11.5;
    const firstX =
      FieldDimensions.goalLineX + index * FieldDimensions.fiveYardsX * 2 - 2;
    const secondX =
      FieldDimensions.goalLineX + index * FieldDimensions.fiveYardsX * 2 + 0.4;
    // add first digit
    this.drawDigit(firstDigit, [firstX, y], options);
    // add second digit
    if (secondDigit) {
      this.drawDigit(secondDigit, [secondX, y], options);
    }
    if (number && number !== '50') {
      // if not Goal line, which is empty number
      // add arrow
      this.drawNumberArrow(
        {
          left: leftOf50 ? firstX - 0.75 : secondX + 2.75,
          top: y - 1,
        },
        leftOf50
      );
    }
  }

  drawDigit(digit, point, options) {
    const textOptions = Object.assign({}, options, {
      point: point,
      content: digit.toString(),
    });
    this.yardlineNumbers.push(new paper.PointText(textOptions));
  }

  drawNumberArrow(position, leftOf50) {
    const arrow = new paper.Path.RegularPolygon({
      center: [position.left, position.top],
      radius: 0.75,
      sides: 3,
      fillColor: this.options.yardlineNumberColor,
      opacity: this.options.yardlineNumberOpacity,
      rotation: leftOf50 ? 270 : 90,
    });
    this.yardlineNumbers.push(arrow);
  }
}

export default FieldPainter;
