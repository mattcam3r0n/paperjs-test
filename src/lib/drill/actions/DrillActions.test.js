
import ActionInterpreter from './ActionInterpreter';

it('forward action maintains current direction', () => {
    const currentState = createState(0, 0, 0, 90, 'sixToFive', 'full', 90, 1);
    const action = {
        type: 'forward',
        strideType: 'sixToFive',
        stepType: 'full'
    };
    const newState = ActionInterpreter.doAction(currentState, action);
    expect(newState.step.direction).toBe(currentState.step.direction);
});

it('rightFlank action changes direction by +90', () => {
    const currentState = createState(1, 0, 0, 90, 'sixToFive', 'full', 90, 1);
    const action = {
        type: 'rightFlank',
        strideType: 'sixToFive',
        stepType: 'full'
    };
    const newState = ActionInterpreter.doAction(currentState, action);
    expect(newState.step.direction).toBe(currentState.step.direction + 90);
});

function createState(count = 0, x = 0, y = 0, r = 0, strideType = 'sixToFive', stepType = 'full', direction = 0, dX = 0, dY = 0, dR = 0) {
    return {
        count: count,
        position: {
            x: x,
            y: y,
            r: r 
        },
        step: {
            strideType: strideType,
            stepType: stepType,
            direction: direction,
            dX: dX,
            dY: dY,
            dR: dR
        }
    };
}