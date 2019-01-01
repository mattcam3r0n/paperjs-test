import { reaction } from 'mobx';
import paper from 'paper';
import FieldPainter from '../lib/FieldPainter';

export default class FieldController {
  constructor(canvas, designViewState) {
    this.canvas = canvas; // do I need to keep this?
    this.viewState = designViewState;
    // init paper js
    this.initializePaperScope(canvas);
    // initial draw
    this.fieldPainter = new FieldPainter(this.viewState.fieldPaperScope);
    this.fieldPainter.draw();
    // wire up reactions to respond to state changes
    this.configureReactions();
  }

  initializePaperScope(canvas) {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas);
    this.viewState.setFieldPaperScope(paperScope);
  }

  configureReactions() {
    // drill changed
    reaction(
      () => this.viewState.drill,
      (drill, reaction) => {
        this.fieldPainter.syncMarchers(drill);
      }
    );

    // change zoom
    reaction(
      () => this.viewState.zoomFactor,
      (zoomFactor, reaction) => {
        this.fieldPainter.zoom(zoomFactor);
      }
    );

    // change center
    reaction(
      () => this.viewState.center,
      (center, reaction) => {
        this.fieldPainter.setCenter(center);
      }
    );
  }

  resize(width, height) {
    this.fieldPainter.resize(width, height);
    this.viewState.setFieldContainerSize({
      width: width,
      height: height,
    });
    this.viewState.zoomToFit();
  }
}
