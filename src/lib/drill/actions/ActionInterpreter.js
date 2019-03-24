import StepDeltas from '../StepDeltas';
import Continue from './Continue';
import RightFlank from './RightFlank';
import Forward from './Forward';
import LeftFlank from './LeftFlank';
import ToTheRear from './ToTheRear';

const actionsMap = {
    'default': new Continue(StepDeltas),
    'halt': null,
    'markTime': null,
    'forward': new Forward(StepDeltas),
    'backward': null,
    'rightFlank': new RightFlank(StepDeltas),
    'leftFlank': new LeftFlank(StepDeltas),
    'rightWrap': null,
    'leftWrap': null,
    'toTheRear': new ToTheRear(StepDeltas),
    'leftCountermarch': null,
    'rightCountermarch': null,
    'leftOblique': null,
    'rightOblique': null,
};

export default class ActionInterpreter {
    static doAction(currentState, action) {
        const actionHandler = this.getActionHandler(action);
        // console.log('actionHandler', actionHandler);
        return actionHandler.do(currentState, action);
    }

    static undoAction(currentState, previousState, action) {

    }

    static getActionHandler(action) {
        if (!action || !actionsMap[action.type]) return actionsMap['default'];
        return actionsMap[action.type];
    }
}