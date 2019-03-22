import ActionInterpreter from './actions/ActionInterpreter';

export default class PositionCalculator {

  getNextState(currentState, script) {
    const action = script[currentState.count];
    if (!action) return currentState;
    const newState = ActionInterpreter.doAction(currentState, action);
    return newState;
  }

  // calculate new state and position
  stepForward(currentState, script) {
    // apply action (if necessary)
    const state = this.getNextState(currentState, script);
    const { dX, dY, dR } = state.step;
    // apply step
    return {
        count: state.count + 1,
        position: {
            x: state.x + dX,
            y: state.y + dY,
            rotation: state.rotation + dR
        },
        step: {
            ...state.step
        }
    }; 
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
