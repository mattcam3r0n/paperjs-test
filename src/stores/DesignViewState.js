import { observable, action, computed } from 'mobx';
import paper from 'paper';
import FieldDimensions from '../lib/FieldDimensions';
import PanTool from '../lib/PanTool';
import PointerTool from '../lib/PointerTool';
import PathTool from '../lib/PathTool';
import AddMarchersTool from '../lib/AddMarchersTool';
import ZoomInTool from '../lib/ZoomInTool';

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
    console.log('activateZoomInTool');
    this.activeTool = new ZoomInTool(this.fieldPaperScope, (point) => this.zoomIn(point));
  }

  @action
  newPath() {
    if (!this.activeTool.name === 'path') return;
    this.activeTool.newPath();
  }

  @action
  zoomIn(point) {
    // based on https://matthiasberth.com/tech/stable-zoom-and-pan-in-paperjs 
    const c = new paper.Point(this.center);
    const oldZoom = this.zoomFactor;
    const newZoom = this.zoomFactor * 1.1;
    const beta = oldZoom / newZoom;
    const pc = point.subtract(this.center);
    const a = point.subtract(pc.multiply(beta)).subtract(c);
    this.zoomFactor = newZoom;
    this.setCenter(c.add(a));
    // this.zoomFactor *= 1.1;
    // console.log(this.center, delta);
    // const point = {
    //   x: this.center.x - delta.x,
    //   y: this.center.y - delta.y
    // };
    // this.setCenter(point);
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
    // const speed = 2;
    // const newDelta = this.dejitter(delta.multiply(speed));
    console.log('setCenterDelta', delta, this.center);
    this.center = {
      x: this.center.x - delta.x,
      y: this.center.y - delta.y,
    };
    // this.lastDelta = newDelta;
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
