import FieldTool from './FieldTool';

export default class AddMarchersTool extends FieldTool {
  constructor(paperScope) {
    super('addMarchers', paperScope);
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
