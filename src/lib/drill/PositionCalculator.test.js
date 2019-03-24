import PositionCalculator from './PositionCalculator';

describe('PositionCalculator', () => {

    describe('stepForward', () => {

        test('forward 1 count', () => {
            const initialState = {
                count: 0,
                position: {
                    x: 0,
                    y: 0,
                    rotation: 90
                },
                step: {
                    strideType: 'sixToFive',
                    stepType: 'full',
                    direction: 90,
                    // dX: 1,
                    // dY: 0,
                    // dR: 0
                }
            };
            const script = {
                0: {
                    type: 'forward',
                    strideType: 'sixToFive',
                    stepType: 'full'
                }
            };
            const calc = new PositionCalculator();
            const newState = calc.stepForward(initialState, script);

            // should change by 1 unit of x
            expect(newState.position.x).toBe(1);
            expect(newState.position.y).toBe(0);
            expect(newState.position.rotation).toBe(90);
        });

    });

});

