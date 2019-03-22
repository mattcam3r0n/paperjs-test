export default class ActionHandler {
  constructor(stepDeltas) {
    this.stepDeltas = stepDeltas;
  }

  /**
   * Increment count and position and position based on given state.
   * @param {object} state 
   * @param {object} action 
   */
  do(state, action) {
    const { dX, dY, dR } = state.step;
    // apply step
    return {
      count: state.count + 1,
      position: {
        x: state.x + dX,
        y: state.y + dY,
        rotation: state.position.rotation + dR,
      },
      step: {
        ...state.step,
      },
    };
  }

  undo(currentState, action, previousState) {}
}
