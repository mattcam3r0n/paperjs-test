import { observable, action, computed } from 'mobx';
import FieldDimensions from '../lib/FieldDimensions';
import PanTool from '../lib/PanTool';
import PointerTool from '../lib/PointerTool';
import PathTool from '../lib/PathTool';

export default class DesignViewState {
  @observable zoomFactor;
  @observable center;
  @observable fieldContainerSize;
  @observable activeTool;

  lastDelta;
  fieldPaperScope;
  timelinePaperScope;
  

  constructor() {
    // this.pointerTool = new PointerTool();
    // this.pathTool = new PathTool();
    // this.pointerTool.activate();
    // this.activeTool = this.pointerTool;
    this.zoomFactor = 1;
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
    this.fieldContainerSize = {
      width: FieldDimensions.width,
      height: FieldDimensions.height,
    };
  }

  onPan = (delta) => {
    this.setCenterDelta(delta);
  };

  disposeActiveTool() {
    if (this.activeTool) {
      this.activeTool.dispose();
    }
  }

  @computed
  get isPathToolActive() {
    return this.activeTool && this.activeTool.name === 'path';
  }

  @action
  activatePanTool() {
    this.disposeActiveTool();
    this.activeTool = new PanTool(this.fieldPaperScope, this.onPan);
  }

  @action
  activatePointerTool() {
    this.disposeActiveTool();
    this.activeTool = new PointerTool(this.fieldPaperScope);
  }

  @action
  activatePathTool() {
    this.disposeActiveTool();
    this.activeTool = new PathTool(this.fieldPaperScope);
  }

  @action
  cancelPathTool() {
    if (this.isPathToolActive())
      this.activeTool.cancel();
    this.activatePointerTool();
  }

  @action
  newPath() {
    if (!this.activeTool.name === 'path') return;
    this.activeTool.newPath();
  }

  @action
  zoomIn() {
    this.zoomFactor *= 1.1;
  }

  @action
  zoomOut() {
    this.zoomFactor *= 0.9;
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

  setTimelinePaperScope(paperScope) {
    this.timelinePaperScope = paperScope;
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
    const speed = 2;
    const newDelta = this.dejitter(delta.multiply(speed));
    this.center = {
      x: this.center.x - newDelta.x,
      y: this.center.y - newDelta.y,
    };
    this.lastDelta = newDelta;
  }

  dejitter(delta) {
    // sometimes the mouse delta jitters, eg. between -1.2 and 1.2
    // try to detect and modify to smooth panning.
    if (!this.lastDelta) return delta;

    const min = 0.3;
    return {
      x: Math.abs(delta.x + this.lastDelta.x) < min ? 0 : delta.x,
      y: Math.abs(delta.y + this.lastDelta.y) < min ? 0 : delta.y,
    };
  }

  @action
  setFieldContainerSize(newSize) {
    this.fieldContainerSize = newSize;
  }

}
