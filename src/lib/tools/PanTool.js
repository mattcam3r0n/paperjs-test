import paper from 'paper';
import { throttle } from 'lodash';

export default class PanTool {
    constructor(paperScope, onPan) {
        this.paperScope = paperScope;
        this.name = 'pan';
        this.onPan = onPan;
        paperScope.activate();
        this.tool = new paper.Tool();
        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseDrag = throttle(this.onMouseDrag, 50);
    }

    get cursor() {
        return 'grab';
    }

    onMouseDown = (event) => {
    }

    onMouseDrag = (event) => {
        // debounce?
        this.onPan(event.delta);
    }

    activate() {
        this.paperScope.activate();
        this.tool.activate();
    }

    dispose() {
        this.tool.off('mousedown');
        this.tool.off('mousedrag');
        this.tool.remove();
        this.tool = null;
    }
}