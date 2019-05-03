import ToolNames from './ToolNames';
import PathTool from './PathTool';
import AddMarchersTool from './AddMarchersTool';
import ZoomAndPanTool from './ZoomAndPanTool';
import FileSelectorTool from './FileSelectorTool';
import RectangularSelectionTool from './RectangularSelectionTool';
import IrregularSelectionTool from './IrregularSelectionTool';
import StepsTool from './StepsTool';

export default class ToolFactory {
  toolMap = {
    [ToolNames.STEPS]: () => new StepsTool(),
    [ToolNames.ADD_MARCHERS]: () => new AddMarchersTool(this.fieldPaperScope),
    [ToolNames.ZOOM_IN]: () =>
      new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomIn'),
    [ToolNames.ZOOM_OUT]: () =>
      new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'zoomOut'),
    [ToolNames.PAN]: () =>
      new ZoomAndPanTool(this.fieldPaperScope, this.fieldState, 'pan'),
    [ToolNames.PATH]: () => new PathTool(this.fieldPaperScope),
    [ToolNames.IRREGULAR_SELECTION]: () =>
      new IrregularSelectionTool(this.fieldPaperScope),
    [ToolNames.RECTANGULAR_SELECTION]: () =>
      new RectangularSelectionTool(this.fieldPaperScope),
    [ToolNames.FILE_SELECTOR]: () => new FileSelectorTool(this.fieldPaperScope),
  };

  get fieldPaperScope() {
    return this.rootState.fieldState.fieldPaperScope;
  }

  get fieldState() {
    return this.rootState.fieldState;
  }

  constructor(rootState) {
    this.rootState = rootState;
  }

  create(toolName) {
    const createTool = this.toolMap[toolName];
    if (!createTool) {
      throw new Error('Unable to create tool ' + toolName);
    }
    return createTool();
  }
}
