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
    this.zoomToFit(width, height);
  }

  zoom(factor) {
    console.log(paper.view.zoom);
    const zoom = 2;
    paper.view.zoom = zoom;
    paper.view.center = [
      (FieldDimensions.widthInSteps / 2) * zoom,
      (FieldDimensions.heightInSteps / 2) * zoom,
    ];
  }

  zoomToFit(width, height) {
    const zoom = width / FieldDimensions.widthInSteps;
    paper.view.zoom = zoom;
    paper.view.center = [
      FieldDimensions.widthInSteps / 2,
      FieldDimensions.heightInSteps / 2,
    ];
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
