import StepDeltas from '../StepDeltas';
import Continue from './Continue';
import RightFlank from './RightFlank';
import Forward from './Forward';

const actionsMap = {
    'forward': new Forward(StepDeltas),
    'backward': null,
    'rightFlank': new RightFlank(StepDeltas),
    'leftFlank': null,
    'default': new Continue(StepDeltas)
};

export default class ActionInterpreter {
    static doAction(currentState, action) {
        const actionHandler = this.getActionHandler(action);
        return actionHandler.do(currentState, action);
    }

    static undoAction(currentState, previousState, action) {

    }

    static getActionHandler(action) {
        if (!action || !actionsMap[action.type]) return actionsMap['default'];
        return actionsMap[action.type];
    }
}