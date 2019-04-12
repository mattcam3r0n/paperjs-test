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
    this.paperScope.view.draw();
  }

  syncMarchers(drill) {
    this.deleteMarchers();
    this.createMarchers(drill);
  }

  createMarchers(drill) {
    this.marchers = drill.marchers.map(m => {
      const { position } = m.script.currentState;
      return new Marcher(this.paperScope, {
        position: [position.x, position.y],
        rotation: position.rotation,
        marcher: m
      });
    });
  }

  deleteMarchers() {
    if (!this.marchers) return;
    this.marchers.forEach(m => {
      m.remove();
    });
  }

  syncMarcherPositions(drill) {
    this.marchers.forEach(m => {
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
}

export default FieldPainter;