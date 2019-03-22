import StepDeltas from '../StepDeltas';
import RightFlank from './RightFlank';
import Forward from './Forward';

const actionsMap = {
    'forward': new Forward(StepDeltas),
    'backward': null,
    'rightFlank': new RightFlank(StepDeltas),
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