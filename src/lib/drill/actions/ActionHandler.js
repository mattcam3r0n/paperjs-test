export default class ActionHandler {
  constructor(stepDeltas) {
    this.stepDeltas = stepDeltas;
  }

  getStepDelta(step) {
    return this.stepDeltas.getStepDelta({
      strideType: step.strideType,
      stepType: step.stepType,
      direction: step.direction,
    });
  }

  ensureStepDeltas(step) {
    const stepDeltaDefault = this.getStepDelta({
      strideType: step.strideType,
      stepType: step.stepType,
      direction: step.direction,
    });
    return { ...stepDeltaDefault, ...step };
  }

  /**
   * Increment count and position and position based on given state.
   * @param {object} state
   * @param {object} action
   */
  do(state, action) {
        const step = this.ensureStepDeltas(state.step);
    // apply step
    return {
      count: state.count + 1,
      position: {
        x: state.position.x + step.dX,
        y: state.position.y + step.dY,
        rotation: state.position.rotation + step.dR,
      },
      step: {
        ...step,
      },
    };
  }

  undo(currentState, action, previousState) {}
}
