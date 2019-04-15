import paper from 'paper';
import FieldDimensions from '../lib/field/FieldDimensions';
import { observable, action } from 'mobx';
import { merge } from 'lodash';

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
      yardlineColor: 'white',
      yardlineOpacity: 0.75,
      yardlineNumberColor: 'white',
      yardlineNumberOpacity: 0.75,          
    };
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

  @action
  zoomToFit() {
    // TODO: need better algorithm that takes height into account
    this.zoomFactor =
      this.fieldContainerSize.width / FieldDimensions.widthInSteps;
    this.reCenter();
  }

  @action
  reCenter() {
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
  }

  setFieldPaperScope(paperScope) {
    this.fieldPaperScope = paperScope;
  }

  @action
  setFieldSettings(settings) {
    this.fieldSettings = merge({}, this.fieldSettings, settings);
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
