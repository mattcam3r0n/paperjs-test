
import ActionInterpreter from './ActionInterpreter';

it('should return currentState if not action provided', () => {
    const currentState = createState(0, 0, 0, 90, 'sixToFive', 'full', 90, 1);
    const action = {
        type: 'forward',
        strideType: 'sixToFive',
        stepType: 'full'
    };
    const newState = ActionInterpreter.doAction(currentState, action);
    expect(newState).toEqual(currentState);
});



function createState(count = 0, x = 0, y = 0, r = 0, strideType = 'sixToFive', stepType = 'full', direction = 0, dX = 0, dY = 0, dR = 0) {
    return {
        count: count,
        position: {
            x: x,
            y: y,
            rotation: r 
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