import ActionHandler from './ActionHandler';

export default class Forward extends ActionHandler {
    do(currentState, action) {
        const { count, position, step } = currentState;
        // calc new step delta based on direction
        const stepDelta = this.stepDeltas.getStepDelta({
            strideType: step.strideType,
            stepType: step.stepType,
            direction: step.direction
        });
        // call super.do() to increment count and position based on new state.
        return super.do({
            count: count,
            position: {
                x: position.x,
                y: position.y,
                rotation: step.direction,
            },
            step: {
                strideType: step.strideType,
                stepType: step.stepType,
                direction: step.direction,
                dX: stepDelta.dX,
                dY: stepDelta.dY,
                dR: stepDelta.dR
            }
        });    
    }

    undo() {}
}