/*
    Field component uses FieldPainter
    * FieldPainter uses Paper to draw field, holds paper context
    * uses layers to separate field markings, band, various tools
    * all tools are activated via FieldPainter?
    * 
*/
import paper, { Color } from 'paper';
import FieldDimensions from './FieldDimensions';

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

export default class FieldPainter {
  constructor(canvas) {
    this.canvas = canvas;
    paper.setup(canvas);
  }

  draw() {
    this.drawFieldSurface();
    this.drawSidelines();
    this.drawYardlines();
    paper.view.draw();
  }

  update() {
    paper.view.update();
  }

  resize(width, height) {
    paper.view.viewSize.width = width;
    paper.view.viewSize.height = height;
    //paper.view.update();
  }

  zoom(zoomFactor) {
    paper.view.zoom = zoomFactor;
    //this.center();
  }

  zoomToFit(width, height) {
    const zoom = this.calculateZoomToFitFactor(width, height);
    paper.view.zoom = zoom;
    this.center();
  }

  center() {
    this.setCenter({
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2
    });
  }
  
  setCenter(center) {
    paper.view.center = [
      center.x,
      center.y
    ];
  }

  setCenterFromDelta(delta) {
    const { center } = paper.view;
    paper.view.center = [
      center.x - delta.x,
      center.y - delta.y
    ];
  }

  calculateZoomToFitFactor(width, height) {
    // TODO: need better algorithm that takes height into account
    return width / FieldDimensions.widthInSteps;
  }

  drawFieldSurface() {
    const { left, top, width, height } = FieldDimensions.fieldRect;
    const fieldSurface = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      fillColor: 'green',
    });
  }

  drawSidelines() {
    const { left, top, width, height } = FieldDimensions.sidelineRect;
    const sidelines = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      strokeColor: 'white',
      strokeWidth: 0.25,
      opacity: 0.75
    });
  }

  drawYardlines() {
      for (let i = 0; i < 21; i++) {
      let x = FieldDimensions.goalLineX + i * 6;
      const yardline = new paper.Path({
        strokeColor: 'white',
        strokeWidth: 0.25,
        opacity: 0.75
    });
      yardline.add(
        [x, FieldDimensions.sidelineRect.top],
        [x, FieldDimensions.sidelineRect.bottom]
      );
    }
  }
}
