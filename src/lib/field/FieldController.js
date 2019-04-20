import { reaction } from 'mobx';
import paper from 'paper';
import FieldPainter from './FieldPainter';

export default class FieldController {
  constructor(canvas, rootState) {
    this.rootState = rootState;
    // init paper js
    this.initializePaperScope(canvas);
    // initial draw
    this.fieldPainter = new FieldPainter(this.fieldState.fieldPaperScope, this.fieldState.fieldSettings);
    // draw field and initial marchers
    this.fieldPainter.draw();
    this.fieldPainter.syncMarchers(this.drillState.currentDrill);
    // wire up reactions to respond to state changes
    this.configureReactions();
  }

  get designViewState() {
    return this.rootState.designViewState;
  }

  get drillState() {
    return this.rootState.drillState;
  }

  get fieldState() {
    return this.rootState.fieldState;
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
      () => this.drillState.currentDrill,
      (drill, reaction) => {
        console.log('FieldController drill reaction');
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
        this.fieldPainter.syncMarcherPositions(this.drillState.currentDrill)
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
