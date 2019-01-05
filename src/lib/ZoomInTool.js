import FieldTool from './FieldTool';

export default class ZoomInTool extends FieldTool {
    constructor(paperScope, onClick) {
        super('zoomIn', paperScope);
        this.onClick = onClick;
        this.tool.onMouseDown = this.onMouseDown;
    }

    get cursor() {
        return 'zoom-in';
    }

    onMouseDown = (event) => {
        console.log(event);
        this.onClick(event.downPoint);
    }

    onMouseDrag = (event) => {
    }

    dispose() {
        this.tool.off('mousedown');
        super.dispose();
    }
}