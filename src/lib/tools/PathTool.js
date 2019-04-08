import PathLine from '../field/PathLine';
import FieldTool from './FieldTool';
import ToolNames from './ToolNames';

export default class PathTool extends FieldTool {
  constructor(paperScope) {
    super(ToolNames.PATH, paperScope);
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
    this.paths = [];
    this.activePath = null;
  }


  dispose() {
    this.disposePaths();
    this.tool.off('mousedown');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    super.dispose();
  }

  disposePaths() {
    if (!this.paths) return;
    this.paths.forEach(p => {
      p.remove();
    });  
  }

  get cursor() {
    return 'crosshair';
  }

  onMouseDown = (event) => {
    const { item } = event;
    const { activePath } = this;

    if (activePath) {
      activePath.add(event.point);
      return;
    }

    if (this.itemIsMarcher(item)) {
      this.startPath();
      return;
    }

    if (this.itemIsPath(item)) {
      this.activatePath(item);
      return;
    }
  };

  onMouseDrag = (event) => {};

  onMouseMove = (event) => {
    const { item } = event;
    const { activePath } = this;

    // ignore mouse moves that originate from other than the canvas
    if (!super.isCanvasEvent(event) && activePath) {
      activePath.hideLastSegment();
      return;
    }

    if (activePath) {
      activePath.setEndPoint(event.point);
    }

    if (this.itemIsMarcher(item)) {
      this.highlightMarcher(item);
      return;
    }

    this.unhighlightMarcher();
  };

  activatePath(item) {
    const path = this.paths.find(p => p.path === item);
    if (!path) return;
    if (this.activePath) 
      this.activePath.deactivate();
    this.activePath = path;
    path.activate();
  }

  newPath() {
    if (this.activePath)
      this.activePath.deactivate();
    this.activePath = null;
  }

  undoLastSegment() {
    if (this.activePath)
      this.activePath.undoLastSegment();
  }

  deleteCurrentPath() {
    if (this.activePath) {
      this.activePath.remove();
    }
    this.activePath = null;
  }

  startPath() {
    this.activePath = new PathLine(this.marcher.position);
    this.paths.push(this.activePath);
  }

  cancel() {
    this.disposePaths();
    this.paths = [];
    this.activePath = null;
  }

  itemIsPath(item) {
    return item && item._itemType === 'path';
  }
}
