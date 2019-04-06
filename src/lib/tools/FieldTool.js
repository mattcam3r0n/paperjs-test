import paper from 'paper';

export default class FieldTool {
  constructor(name, paperScope) {
    this.name = name;
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

  get cursor() {
    return 'default';
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
