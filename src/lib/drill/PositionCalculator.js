import ActionInterpreter from './actions/ActionInterpreter';

export default class PositionCalculator {

  // calculate new state and position
  stepForward(currentState, script) {
    const action = script[currentState.count];
    const newState = ActionInterpreter.doAction(currentState, action);
    return newState;
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