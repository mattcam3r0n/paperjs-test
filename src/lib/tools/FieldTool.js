import paper from 'paper';
import Tool from './Tool';

export default class FieldTool extends Tool {
  constructor(name, paperScope) {
    super(name);
    this.paperScope = paperScope;
    this.paperScope.activate();
    this.tool = new paper.Tool();
  }

  dispose() {
    this.tool.remove();
    this.tool = null;
  }

  activate() {
    this.tool.activate();
  }

  isCanvasEvent(event) {
    const targetNodeName = event.event.target.nodeName;
    return targetNodeName === 'CANVAS';
  }

  itemIsMarcher(item) {
    return item && item._itemType === 'marcher';
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
