import { observable, action, computed } from 'mobx';
import paper from 'paper';
import FieldDimensions from '../lib/FieldDimensions';
import PathTool from '../lib/PathTool';
import AddMarchersTool from '../lib/AddMarchersTool';
import ZoomAndPanTool from '../lib/ZoomAndPanTool';
import FileSelectorTool from '../lib/FileSelectorTool';
import RectangularSelectionTool from '../lib/RectangularSelectionTool';
import IrregularSelectionTool from '../lib/IrregularSelectionTool';

export default class DesignViewState {
  @observable zoomFactor;
  @observable center;
  @observable fieldContainerSize;
  @observable activeTool;
  @observable cursor;
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

  @computed
  get isPathToolActive() {
    return this.activeTool && this.activeTool.name === 'path';
  }

  @computed
  get isSelectionToolActive() {
    return (
      this.activeTool &&
      (this.activeTool.name === 'rectangularSelection' ||
        this.activeTool.name === 'irregularSelection')
    );
  }

  @computed
  get isRectangularSelectionToolActive() {
    return this.activeTool && this.activeTool.name === 'rectangularSelection';
  }

  @computed
  get isIrregularSelectionToolActive() {
    return this.activeTool && this.activeTool.name === 'irregularSelection';
  }

  @computed
  get isAddMarchersToolActive() {
    return this.activeTool && this.activeTool.name === 'addMarchers';
  }

  @action
  setCursor(cursor) {
    this.cursor = cursor;
  }

  @action
  cancelPathTool() {
    if (this.isPathToolActive()) this.activeTool.cancel();
    this.activateSelectionTool();
  }

  @action
  activateAddMarchersTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new AddMarchersTool(this.fieldPaperScope));
  }

  //@action
  activateZoomInTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(
      new ZoomAndPanTool(this.fieldPaperScope, this, 'zoomIn')
    );
  }

  //@action
  activateZoomOutTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(
      new ZoomAndPanTool(this.fieldPaperScope, this, 'zoomOut')
    );
  }

  @action
  activatePanTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new ZoomAndPanTool(this.fieldPaperScope, this, 'pan'));
  }

  @action
  activateRectangularSelectionTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new RectangularSelectionTool(this.fieldPaperScope));
  }

  activateSelectionTool() {
    this.activateRectangularSelectionTool();
  }

  @action
  activateIrregularSelectionTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new IrregularSelectionTool(this.fieldPaperScope));
  }

  @action
  activatePathTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new PathTool(this.fieldPaperScope));
  }

  @action
  activateFileSelectorTool() {
    this.disposeActiveTool();
    this.setActiveTool(new FileSelectorTool(this.fieldPaperScope));
  }

  @action
  setActiveTool(tool) {
    this.activeTool = tool;
    this.setCursor(tool.cursor);
  }

  disposeActiveTool() {
    if (this.activeTool) {
      this.activeTool.dispose();
      this.activeTool = null;
    }
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

  @action
  fieldInitialized() {
    // TODO: open last drill?
    this.drill = this.createNewDrill();
  }

  @action
  setFieldContainerSize(newSize) {
    this.fieldContainerSize = newSize;
  }

  @action.bound
  newDrill() {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    this.drill = this.createNewDrill({ x: x, y: y});
  }

  // temporary helper
  createNewDrill(options = { x: 12, y: 6 }) {
    const drill = {};
    drill.marchers = [];
    for (let i = 0; i < 16; i++) {
      const m = {
        initialState: {
          x: options.x + (i % 4) * 2,
          y: options.y + Math.floor(i / 4) * 2,
          direction: 90,
        },
        currentState: {
          x: options.x + (i % 4) * 2,
          y: options.y + (i % 4) * 2,
          direction: 90,
        },
      };
      drill.marchers.push(m);
    }
    return drill;
  }
}
