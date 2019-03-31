import StepInterpreter from './StepInterpreter';

export default class ScriptInterpreter {

  constructor(stepInterpreter = new StepInterpreter()) {
    this.stepInterpreter = stepInterpreter;
  }

  // calculate new state and position
  stepForward(currentState, script) {
    const step = script[currentState.count] || currentState.step;
    return this.stepInterpreter.do(currentState, step);
  }

  stepBackward() {}

  seekPreviousAction(fromCount) {
    // look for action at fromCount - 1
    // keep looking until prev action is found
  }

  seekNextAction(fromCount) {
    // look for action at fromCount + 1
    // keep looking until next action is found
  }
}
