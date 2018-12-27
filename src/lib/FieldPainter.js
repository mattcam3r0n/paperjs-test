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

// const yardlineMarkers = [
//   '',
//   '10',
//   '20',
//   '30',
//   '40',
//   '50',
//   '40',
//   '30',
//   '20',
//   '10',
//   '',
// ];

export default class FieldPainter {
  constructor(paperScope) {
    this.paperScope = paperScope;
    // this.canvas = canvas;
    // this.paperScope = new paper.PaperScope();
    // this.paperScope.setup(canvas);
    this.paperScope.activate();
  }

  draw() {
    this.paperScope.activate();
    this.drawFieldSurface();
    this.drawSidelines();
    this.drawYardlines();

    // test
    const m = [
      new Marcher(this.paperScope, {
        position: [18, 6],
        rotation: 90,
      }),
      new Marcher(this.paperScope, {
        position: [20, 6],
        rotation: 90,
      }),
      new Marcher(this.paperScope, {
        position: [22, 6],
        rotation: 90,
      }),
      new Marcher(this.paperScope, {
        position: [24, 6],
        rotation: 90,
      }),
      new Marcher(this.paperScope, {
        position: [18, 12],
        rotation: 90,
      }),
      new Marcher(this.paperScope, {
        position: [20, 12],
      }),
      new Marcher(this.paperScope, {
        position: [22, 12],
      }),
      new Marcher(this.paperScope, {
        position: [24, 12],
      }),
    ];

    this.paperScope.view.draw();
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
    const fieldSurface = new paper.Path.Rectangle({
      point: [left, top],
      size: [width, height],
      fillColor: '#40703B',
    });
  }

  drawSidelines() {
    const { left, top, width, height } = FieldDimensions.sidelineRect;
    const sidelines = new paper.Path.Rectangle({
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
}
