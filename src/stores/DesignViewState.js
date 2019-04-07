import { observable, action, computed } from 'mobx';
import PathTool from '../lib/tools/PathTool';
import AddMarchersTool from '../lib/tools/AddMarchersTool';
import ZoomAndPanTool from '../lib/tools/ZoomAndPanTool';
import FileSelectorTool from '../lib/tools/FileSelectorTool';
import RectangularSelectionTool from '../lib/tools/RectangularSelectionTool';
import IrregularSelectionTool from '../lib/tools/IrregularSelectionTool';
import ToolNames from '../lib/tools/ToolNames';

export default class DesignViewState {
  @observable activeTool;
  @observable cursor;
  @observable drill;
  @observable isPlaying;

  toolMap = {
    [ToolNames.ADD_MARCHERS]: () => new AddMarchersTool(this.fieldPaperScope),
    [ToolNames.ZOOM_IN]: () => new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomIn'),
    [ToolNames.ZOOM_OUT]: () => new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomOut'),
    [ToolNames.PAN]: () => new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'pan'),
    [ToolNames.PATH]: () => new PathTool(this.fieldPaperScope),
    [ToolNames.IRREGULAR_SELECTION]: () => new IrregularSelectionTool(this.fieldPaperScope),
    [ToolNames.RECTANGULAR_SELECTION]: () => new RectangularSelectionTool(this.fieldPaperScope),
    [ToolNames.FILE_SELECTOR]: () => new FileSelectorTool(this.fieldPaperScope)
  };

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
  get isSelectionToolActive() {
    return (
      this.activeTool &&
      (this.activeTool.name === ToolNames.RECTANGULAR_SELECTION ||
        this.activeTool.name === ToolNames.IRREGULAR_SELECTION)
    );
  }

  //@computed
  isToolActive(toolName) {
    return this.activeTool && this.activeTool.name === toolName;
  }

  activateTool(toolName) {
    this.disposeActiveTool();
    const createTool = this.toolMap[toolName];
    this.setActiveTool(createTool());
  }

  @action
  setCursor(cursor) {
    this.cursor = cursor;
  }

  @action
  setActiveTool(tool) {
    this.activeTool = tool;
    this.setCursor(tool.cursor);
  }

  @action
  disposeActiveTool() {
    if (this.activeTool) {
      this.activeTool.dispose();
      this.activeTool = null;
    }
  }

  @action
  newPath() {
    if (!this.isToolActive(ToolNames.PATH)) return;
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
