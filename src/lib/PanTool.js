import paper from 'paper';

export default class PanTool {
    constructor(onPan) {
        this.onPan = onPan;
        this.panTool = new paper.Tool();
        this.panTool.onMouseDown = this.onMouseDown;
        this.panTool.onMouseDrag = this.onMouseDrag;
    }

    onMouseDown = (event) => {
    }

    onMouseDrag = (event) => {
        // debounce?
        this.onPan(event.delta);
    }
}