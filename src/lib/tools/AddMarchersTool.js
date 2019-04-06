import FieldTool from './FieldTool';
import ToolNames from './ToolNames';

export default class AddMarchersTool extends FieldTool {
  constructor(paperScope) {
    super(ToolNames.ADD_MARCHERS, paperScope);
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
  }


  dispose() {
    this.tool.off('mousedown');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    super.dispose();
  }

  onMouseDown = (event) => {};

  onMouseDrag = (event) => {};

  onMouseMove = (event) => {};

  cancel() {
  }
}
