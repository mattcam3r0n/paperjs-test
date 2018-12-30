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
    this.tool.off('mousedown');
    this.tool.off('mousedrag');
    this.tool.off('mousemove');
    this.tool.remove();
    this.tool = null;
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

  newPath() {
    if (this.activePath)
      this.activePath.deactivate();
    this.activePath = null;
  }

  startPath() {
    this.activePath = new PathLine(this.marcher.position);
    this.paths.push(this.activePath);
  }

  itemIsMarcher(item) {
    return item && item._itemType === 'marcher';
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
