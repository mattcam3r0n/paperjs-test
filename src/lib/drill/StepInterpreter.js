import StepDeltas from './StepDeltas';

export default class StepInterpreter {
  constructor(stepDeltas = StepDeltas) {
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
  do(state, step) {
    if (!step) return state; // or throw? counts could get out of sync
    step = this.ensureStepDeltas(step);
    return {
      count: state.count + 1,
      position: {
        x: state.position.x + step.dX,
        y: state.position.y + step.dY,
        rotation: step.direction
      },
      step: {
        ...step,
      },
    };
  }

  undo(currentState, previousStep) {
    const step = this.ensureStepDeltas(currentState.step);
    return {
      count: currentState.count - 1,
      position: {
        x: currentState.position.x - step.dX,
        y: currentState.position.y - step.dY,
        rotation: previousStep.direction
      },
      step: {
        ...previousStep
      }
    }
  }
}
