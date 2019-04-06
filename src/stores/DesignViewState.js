import { observable, action, computed } from 'mobx';
import PathTool from '../lib/PathTool';
import AddMarchersTool from '../lib/AddMarchersTool';
import ZoomAndPanTool from '../lib/ZoomAndPanTool';
import FileSelectorTool from '../lib/FileSelectorTool';
import RectangularSelectionTool from '../lib/RectangularSelectionTool';
import IrregularSelectionTool from '../lib/IrregularSelectionTool';

export default class DesignViewState {
  @observable activeTool;
  @observable cursor;
  @observable drill;
  @observable isPlaying;

  constructor(root) {
    this.rootState = root;
  }

  get fieldState() {
    return this.rootState.fieldState;
  }

  get fieldPaperScope() {
    return this.rootState.fieldState.fieldPaperScope;
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
      new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomIn')
    );
  }

  //@action
  activateZoomOutTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(
      new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomOut')
    );
  }

  @action
  activatePanTool() {
    this.disposeActiveTool(); // needs to come before constructing new tool
    this.setActiveTool(new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'pan'));
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
  fieldInitialized() {
    // TODO: open last drill?
    this.drill = this.createNewDrill();
  }

  @action
  play() {
    this.isPlaying = true;
  }

  @action
  stop() {
    this.isPlaying = false;
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
