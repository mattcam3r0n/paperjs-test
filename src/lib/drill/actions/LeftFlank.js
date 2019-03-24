import ActionHandler from './ActionHandler';
import Directions from '../Directions';

export default class LeftFlank extends ActionHandler {
    constructor(stepDeltas) {
        super(stepDeltas);
        this.type = 'leftFlank';
        this.stepDeltas = stepDeltas;
      }

      do(currentState, action) {
        const { count, position, step } = currentState;
        // calc new direction based on current
        const newDirection = Directions.normalize(step.direction - 90);
        // calc new step delta based on direction
        const stepDelta = this.stepDeltas.getStepDelta({
            strideType: step.strideType,
            stepType: step.stepType,
            direction: newDirection
        });
        return super.do({
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
        });    
    }

    undo() {}
}