import paper from 'paper';
import { throttle } from 'underscore';

export default class PanTool {
    constructor(onPan) {
        this.onPan = onPan;
        this.panTool = new paper.Tool();
        this.panTool.onMouseDown = this.onMouseDown;
        this.panTool.onMouseDrag = throttle(this.onMouseDrag, 50);
        //this.panTool.onMouseDrag = this.onMouseDrag;
        //this.panTool.minDistance = 1;
        //this.panTool.maxDistance = 600;
    }

    onMouseDown = (event) => {
    }

    onMouseDrag = (event) => {
        // debounce?
        this.onPan(event.delta);
    }
}