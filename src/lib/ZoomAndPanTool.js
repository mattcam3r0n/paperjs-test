import FieldTool from './FieldTool';

export default class ZoomAndPanTool extends FieldTool {
    constructor(paperScope, viewState, mode) {
        super('zoomIn', paperScope);
        this.viewState = viewState;
        this.mode = mode || 'zoomIn';
        this.tool.onMouseDown = this.onMouseDown;
    }

    get cursor() {
        if (this.mode === 'zoomIn')
            return 'zoom-in';
        if (this.mode === 'zoomOut')
            return 'zoom-out'
        if (this.mode === 'pan')
            return 'grab';
        return 'default';
    }

    onMouseDown = (event) => {
        if (this.mode === 'zoomIn')
            return this.viewState.zoomIn(event.downPoint);

        if (this.mode === 'zoomOut')
            return this.viewState.zoomOut(event.downPoint);        
    }

    onMouseDrag = (event) => {
    }

    dispose() {
        this.tool.off('mousedown');
        super.dispose();
    }
}