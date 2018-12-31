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
}
