import { observable, action, computed } from 'mobx';
import paper from 'paper';
import FieldDimensions from '../lib/FieldDimensions';
import PanTool from '../lib/PanTool';
import PointerTool from '../lib/PointerTool';
import PathTool from '../lib/PathTool';
import AddMarchersTool from '../lib/AddMarchersTool';
import ZoomInTool from '../lib/ZoomAndPanTool';

export default class DesignViewState {
  @observable zoomFactor;
  @observable center;
  @observable fieldContainerSize;
  @observable activeTool;
  @observable drill;

  lastDelta;
  fieldPaperScope;
  timelinePaperScope;
  

  constructor() {
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
    const speed = 2;
    const newDelta = this.dejitter(delta.multiply(speed));
    this.lastDelta = newDelta;
    this.setCenterDelta(newDelta);
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

  @computed
  get isSelectionToolActive() {
    return this.activeTool && this.activeTool.name === 'pointer';
  }

  @computed
  get isAddMarchersToolActive() {
    return this.activeTool && this.activeTool.name === 'addMarchers';
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
  activateAddMarchersTool() {
    this.disposeActiveTool();
    this.activeTool = new AddMarchersTool(this.fieldPaperScope);
  }

  @action
  activateZoomInTool() {
    this.disposeActiveTool();
    this.activeTool = new ZoomInTool(this.fieldPaperScope, this, 'zoomIn');
  }

  @action
  activateZoomOutTool() {
    this.disposeActiveTool();
    this.activeTool = new ZoomInTool(this.fieldPaperScope, this, 'zoomOut');
  }

  @action
  newPath() {
    if (!this.activeTool.name === 'path') return;
    this.activeTool.newPath();
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
    this.center = {
      x: this.center.x - delta.x,
      y: this.center.y - delta.y,
    };
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
  fieldInitialized() {
    // TODO: open last drill?
    this.drill = this.createNewDrill();
  }

  @action
  setFieldContainerSize(newSize) {
    this.fieldContainerSize = newSize;
  }

  // temporary helper
  createNewDrill() {
    const drill = {};
    drill.marchers = [];
    for(let i=0; i < 16; i++) {
      const m = {
        initialState: {
          x: 12 + ((i % 4) * 2),
          y: 6 + (Math.floor(i / 4) * 2),
          direction: 90
        },
        currentState: {
          x: 12 + ((i % 4) * 2),
          y: 6 + ((i % 4) * 2),
          direction: 90
        }
      };
      drill.marchers.push(m);
    }
    return drill;
  }
}
