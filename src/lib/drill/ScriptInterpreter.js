import FieldDimensions from '../field/FieldDimensions';
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

  lastActionCount(script) {
    const counts = Object.keys(script.steps).map(k => Number(k)).sort((a,b) => a - b);
    if (counts.length === 0) return 0;
    return counts[counts.length - 1];
  }

  isEndOfScript(script) {
    const lastActionCount = this.lastActionCount(script);
    const lastAction = script.steps[lastActionCount];
    return (
      this.isAtFieldEdge(script) ||
      (script.currentState.count >= lastActionCount &&
        this.isNonMovingState(lastAction))
    );
  }

  isBeginningOfScript(script) {
    return script.currentState.count === 0;
  }

  isNonMovingState(step) {
    const { deltaX, deltaY } = step;
    return deltaX === 0 && deltaY === 0;
  }

  isAtFieldEdge(script) {
    const { x, y } = script.currentState.position;
    return (
      x > FieldDimensions.widthInSteps ||
      y > FieldDimensions.heightInSteps ||
      x < 0 ||
      y < 0
    );
  }
}
