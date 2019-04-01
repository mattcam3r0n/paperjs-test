import StepInterpreter from './StepInterpreter';

export default class ScriptInterpreter {
  constructor(stepInterpreter = new StepInterpreter()) {
    this.stepInterpreter = stepInterpreter;
  }

  // calculate new state and position
  stepForward(script) {
    const { steps, currentState } = script;
    const step = steps[currentState.count] || currentState.step;
    return this.stepInterpreter.do(currentState, step);
  }

  stepBackward(script) {
    const { currentState } = script;
    const previousStep = this.seekPreviousStep(script);
    return this.stepInterpreter.undo(currentState, previousStep);
  }

  seekPreviousStep(script) {
    const { steps, currentState, initialState } = script;
    // look for action at fromCount - 2
    let i = currentState.count - 2;
    while (!steps[i] && i > 0) {
      i--;
    }
    return steps[i] || initialState.step;
  }

  seekNextStep(fromCount) {
    // look for action at fromCount + 1
    // keep looking until next action is found
  }
}
