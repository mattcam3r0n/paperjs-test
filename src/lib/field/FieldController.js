import { reaction } from 'mobx';
import paper from 'paper';
import FieldPainter from './FieldPainter';

export default class FieldController {
  constructor(canvas, designViewState, fieldState) {
    this.designViewState = designViewState;
    this.fieldState = fieldState;
    // init paper js
    this.initializePaperScope(canvas);
    // initial draw
    this.fieldPainter = new FieldPainter(this.fieldState.fieldPaperScope);
    this.fieldPainter.draw();
    // wire up reactions to respond to state changes
    this.configureReactions();
  }

  initializePaperScope(canvas) {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvas);
    this.fieldState.setFieldPaperScope(paperScope);
  }

  resize(width, height) {
    this.fieldPainter.resize(width, height);
    this.fieldState.setFieldContainerSize({
      width: width,
      height: height,
    });
    this.fieldState.zoomToFit();
  }

  configureReactions() {
    // count changed

    // marchers changed

    // drill changed
    reaction(
      () => this.designViewState.drill,
      (drill, reaction) => {
        this.fieldPainter.syncMarchers(drill);
      }
    );

    // change zoom
    reaction(
      () => this.fieldState.zoomFactor,
      (zoomFactor, reaction) => {
        this.fieldPainter.zoom(zoomFactor);
      }
    );

    // change center
    reaction(
      () => this.fieldState.center,
      (center, reaction) => {
        this.fieldPainter.setCenter(center);
      }
    );

    reaction(
      () => this.designViewState.isPlaying,
      (isPlaying, reaction) => {
      }
    )

    // TODO: make this update directly, rather than thru mobx?
    // for sake of efficiency?
    reaction(
      () => this.fieldState.count,
      (count, reaction) => {
        this.fieldPainter.syncMarcherPositions(this.designViewState.drill)
      }
    )

    reaction(
      () => this.fieldState.fieldSettings,
      (settings, reaction) => {
        this.fieldPainter.setColors(settings);
      }
    )
  }

}
