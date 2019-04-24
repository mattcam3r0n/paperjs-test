import paper from 'paper';
import { observable, action } from 'mobx';
import { merge } from 'lodash';
import FieldDimensions from '../lib/field/FieldDimensions';
import FieldPainter from '../lib/field/FieldPainter';

export default class FieldState {
  @observable zoomFactor;
  @observable center;
  @observable fieldContainerSize;
  @observable count;
  @observable fieldSettings;

  lastDelta;
  fieldPaperScope;

  constructor(root) {
    this.rootState = root;
    this.zoomFactor = 1;
    this.count = 0;
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
    this.fieldContainerSize = {
      width: FieldDimensions.width,
      height: FieldDimensions.height,
    };
    this.fieldSettings = {
      fieldColor: '#40703B',
      fieldOpacity: 1,
      yardlineColor: '#FFFFFE',
      yardlineOpacity: 0.75,
      yardlineNumberColor: '#FFFFFE',
      yardlineNumberOpacity: 0.75,
    };
  }

  get drillState() {
    return this.rootState.drillState;
  }

  @action.bound
  initializeField(canvas) {
    // init paperjs
    this.fieldPaperScope = new paper.PaperScope();
    this.fieldPaperScope.setup(canvas);
    // draw field and initial marchers
    this.fieldPainter = new FieldPainter(
      this.fieldPaperScope,
      this.fieldSettings
    );
    this.fieldPainter.draw();
    this.syncMarchers(this.drillState.currentDrill);
  }

  syncMarchers() {
    this.fieldPainter.syncMarchers(this.drillState.currentDrill);
  }

  syncMarcherPositions() {
    this.fieldPainter.syncMarcherPositions(this.drillState.currentDrill)
  }

  @action.bound
  resize(width, height) {
    this.fieldPainter.resize(width, height);
    this.setFieldContainerSize({
      width: width,
      height: height,
    });
    this.zoomToFit();
  }

  @action
  zoomIn(point) {
    this.zoomAndCenter(point, this.center, this.zoomFactor, 1.1);
  }

  @action
  zoomOut(point) {
    //this.zoomFactor *= 0.9;
    this.zoomAndCenter(point, this.center, this.zoomFactor, 0.9);
  }

  @action
  zoomAndCenter(point, currentCenter, currentZoom, zoomFactor) {
    // based on https://matthiasberth.com/tech/stable-zoom-and-pan-in-paperjs
    const c = new paper.Point(currentCenter);
    const oldZoom = currentZoom;
    const newZoom = currentZoom * zoomFactor;
    const beta = oldZoom / newZoom;
    const pc = point.subtract(this.center);
    const a = point.subtract(pc.multiply(beta)).subtract(c);
    this.setZoom(newZoom);
    this.setCenter(c.add(a));
  }

  @action.bound
  zoomToFit() {
    // TODO: need better algorithm that takes height into account
    this.zoomFactor =
      this.fieldContainerSize.width / FieldDimensions.widthInSteps;
    this.fieldPainter.zoom(this.zoomFactor);
    this.reCenter();
  }

  @action
  reCenter() {
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
    this.fieldPainter.setCenter(this.center);
  }

  setFieldPaperScope(paperScope) {
    this.fieldPaperScope = paperScope;
  }

  @action.bound
  setFieldSettings(settings) {
    const merged = merge({}, this.fieldSettings, settings);
    this.fieldSettings = merged;
    this.fieldPainter.setColors(merged);
  }

  @action
  setZoom(newFactor) {
    this.zoomFactor = newFactor;
  }

  @action
  setCenter(newCenter) {
    this.center = newCenter;
  }

  @action
  setCenterDelta(delta) {
    this.center = {
      x: this.center.x - delta.x,
      y: this.center.y - delta.y,
    };
  }

  @action
  setFieldContainerSize(newSize) {
    this.fieldContainerSize = newSize;
  }

  // passes thru to design view state.  not sure about this.
  setCursor(cursor) {
    this.rootState.designViewState.setCursor(cursor);
  }

  @action
  setCount(newCount) {
    this.count = newCount;
  }
}
