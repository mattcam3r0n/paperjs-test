import paper from 'paper';
import PathLine from './PathLine';

export default class PathTool {
  constructor(paperScope) {
    this.paperScope = paperScope;
    paperScope.activate();
    this.name = 'path';
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
    this.paths = [];
    this.activePath = null;
  }

  activate() {
    this.tool.activate();
  }

  dispose() {
    this.disposePaths();
    this.tool.off('mousedown');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    this.tool.remove();
    this.tool = null;
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
    }

    if (this.itemIsMarcher(item)) {
      this.startPath();
    }

    if (this.itemIsPath(item)) {
      this.activatePath(item);
    }
  };

  onMouseDrag = (event) => {};

  onMouseMove = (event) => {
    const { item } = event;
    const { activePath } = this;

    // ignore mouse moves that originate from other than the canvas
    if (!this.isCanvasEvent(event) && activePath) {
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
    if (path) {
      if (this.activePath) 
        this.activePath.deactivate();
      this.activePath = path;
      path.activate();
    }
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

  itemIsMarcher(item) {
    return item && item._itemType === 'marcher';
  }

  itemIsPath(item) {
    return item && item._itemType === 'path';
  }

  isCanvasEvent(event) {
    const targetNodeName = event.event.target.nodeName;
    return targetNodeName === 'CANVAS';
  }

  highlightMarcher = (item) => {
    // highlight
    this.marcher = item;
    item.strokeColor = 'yellow';
  };

  unhighlightMarcher = () => {
    if (!this.marcher) return;

    this.marcher.strokeColor = 'black';
    this.marcher = null;
  };
}
