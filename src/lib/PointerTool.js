import paper from 'paper';

export default class PointerTool {
  constructor() {
    this.name = 'pointer';
    // this.onPan = onPan;
    this.tool = new paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseMove = this.onMouseMove;
    // this.panTool.onMouseDown = this.onMouseDown;
    // this.panTool.onMouseDrag = throttle(this.onMouseDrag, 50);
    //this.panTool.onMouseDrag = this.onMouseDrag;
    //this.panTool.minDistance = 1;
    //this.panTool.maxDistance = 600;
  }

  onMouseMove = (event) => {
    if (!event.item) return;

    const { item } = event;
    if (item._itemType === 'marcher') {
      this.highlightMarcher(item);
      return;
    }

    this.unhighlightMarcher();
  };

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

  onMouseDown = (event) => {};

  onMouseDrag = (event) => {
  };

  activate() {
    this.tool.activate();
  }

  dispose() {
    this.onMouseDown = null;
    this.onMouseDrag = null;
    this.tool.remove();
    this.tool = null;
  }
}
