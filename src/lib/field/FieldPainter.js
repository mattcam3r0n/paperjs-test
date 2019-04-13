/*
    Field component uses FieldPainter
    * FieldPainter uses Paper to draw field, holds paper context
    * uses layers to separate field markings, band, various tools
    * all tools are activated via FieldPainter?
    * 
*/
import paper from 'paper';
import FieldDimensions from './FieldDimensions';
import Marcher from './Marcher';

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

class FieldPainter {
  constructor(paperScope) {
    this.paperScope = paperScope;
    this.paperScope.activate();
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
      fillColor: '#40703B',
    });
  }

  drawSidelines() {
    const { left, top, width, height } = FieldDimensions.sidelineRect;
    this.sidelines = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      strokeColor: 'white',
      strokeWidth: 0.25,
      opacity: 0.75,
    });
  }

  drawYardlines() {
    for (let i = 0; i < 21; i++) {
      let x = FieldDimensions.goalLineX + i * 6;
      const yardline = new paper.Path({
        strokeColor: 'white',
        strokeWidth: 0.25,
        opacity: 0.75,
      });
      yardline.add(
        [x, FieldDimensions.sidelineRect.top],
        [x, FieldDimensions.sidelineRect.bottom]
      );
    }
  }

  drawHashmarks(options = {}) {
    let lineOptions = {
      strokeColor: options.stroke || 'white',
      strokeWidth: options.strokeWidth || 0.25,
      opacity: options.strokeWidth || 0.75,
    };
    for (let i = 0; i < 21; i++) {
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
    }
  }

  drawYardlineNumbers(options = {}) {
    let textOptions = {
      fontFamily: 'Palatino',
      fontWeight: 'normal',
      fontSize: options.fontSize || 3.5,
      // lineHeight: 1,
      // originX: 'center',
      // originY: 'center',
      // scaleX: 0.8,
      // stroke: options.stroke || 'white',
      fillColor: options.fill || 'white',
      opacity: options.opacity || 0.75,
    };

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
      ? FieldDimensions.nearSidelineY -  11
      : FieldDimensions.farSidelineY +  11;
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
    const textOptions = Object.assign({}, options, { point: point, content: digit.toString() });
    const text = new paper.PointText(textOptions);
    // let text = new fabric.Text(digit, Object.assign(position, options));
    // canvas.add(text);
    // text.sendToBack();
  }

  drawNumberArrow(position, leftOf50) {
    const arrow = new paper.Path.RegularPolygon({
      center: [position.left, position.top],
      radius: 0.75,
      sides: 3,
      fillColor: 'white',
      opacity: 0.75,
      rotation: leftOf50 ? 270 : 90,
    });
  }
}

export default FieldPainter;
