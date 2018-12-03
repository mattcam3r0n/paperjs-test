import paper from 'paper';
import { throttle } from 'lodash';

export default class PanTool {
    constructor(onPan) {
        this.name = 'pan';
        this.onPan = onPan;
        this.tool = new paper.Tool();
        this.tool.onMouseDown = this.onMouseDown;
        this.tool.onMouseDrag = throttle(this.onMouseDrag, 50);
    }

    onMouseDown = (event) => {
    }

    onMouseDrag = (event) => {
        // debounce?
        this.onPan(event.delta);
    }

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