import PositionCalculator from './PositionCalculator';

describe('PositionCalculator', () => {
  describe('stepForward', () => {
    test('forward 1 count', () => {
      const initialState = {
        count: 0,
        position: {
          x: 0,
          y: 0,
          rotation: 90,
        },
        step: {
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 90,
          // dX: 1,
          // dY: 0,
          // dR: 0
        },
      };
      const script = {
        0: {
          type: 'forward',
          strideType: 'sixToFive',
          stepType: 'full',
        },
      };
      const calc = new PositionCalculator();
      const newState = calc.stepForward(initialState, script);

      // should change by 1 unit of x
      expect(newState.count).toBe(1);
      expect(newState.position.x).toBe(1);
      expect(newState.position.y).toBe(0);
      expect(newState.position.rotation).toBe(90);

      console.log('step 1', newState);
    });

    test('E 6 counts, N 6 counts', () => {
      const initialState = {
        count: 0,
        position: {
          x: 0,
          y: 0,
          rotation: 90,
        },
        step: {
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 90,
          // dX: 1,
          // dY: 0,
          // dR: 0
        },
      };
      const script = {
        0: {
          type: 'forward',
          strideType: 'sixToFive',
          stepType: 'full',
        },
        6: {
          type: 'leftFlank',
          strideType: 'sixToFive',
          stepType: 'full',
        },
      };
      const calc = new PositionCalculator();

      const states = [];
      let currentState = initialState;
      for (let i = 0; i < 12; i++) {
        // const { x, y } = currentState.position;
        // const { dX, dY } = currentState.step;
        // console.log('i', i, 'x', x, 'y', y, 'dX', dX, 'dY', dY);
        currentState = calc.stepForward(currentState, script);
        states.push(currentState);
      }

      const stateAtCount6 = states[5];
      expect(stateAtCount6.position.x).toBe(6);
      expect(stateAtCount6.position.y).toBe(0);
      expect(stateAtCount6.position.rotation).toBe(90);

      const stateAtCount12 = states[11];
      expect(stateAtCount12.position.x).toBe(6);
      expect(stateAtCount12.position.y).toBe(-6);
      expect(stateAtCount12.position.rotation).toBe(0);
    });
  });
});
