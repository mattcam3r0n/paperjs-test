import StepDelta from '../StepDelta';
import RightFlank from './RightFlank';
import Forward from './Forward';

const backward = (currentState, action) => {};
const leftFlank = (currentState, action) => {};

const actionsMap = {
    'forward': new Forward(StepDelta),
    'backward': null,
    'rightFlank': new RightFlank(StepDelta),
    'leftFlank': null,
};

export default class ActionInterpreter {
    static doAction(currentState, action) {
        if (!action) return currentState;
        const actionFunc = actionsMap[action.type];
        if (!actionFunc) return currentState;
        return actionFunc.do(currentState, action);
    }

    static undoAction(currentState, previousState, action) {

    }
}