import ActionHandler from './ActionHandler';

export default class LeftFlank extends ActionHandler {
    do(currentState, action) {
        const { count, position, step } = currentState;
        // calc new direction based on current
        const newDirection = step.direction - 90;
        // calc new step delta based on direction
        const stepDelta = this.stepDeltas.getStepDelta({
            strideType: step.strideType,
            stepType: step.stepType,
            direction: newDirection
        });
        return {
            count: count,
            position: {
                x: position.x,
                y: position.y,
                rotation: newDirection,
            },
            step: {
                strideType: step.strideType,
                stepType: step.stepType,
                direction: newDirection,
                dX: stepDelta.dX,
                dY: stepDelta.dY,
                dR: stepDelta.dR
            }
        };    
    }

    undo() {}
}