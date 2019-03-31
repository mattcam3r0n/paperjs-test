import ScriptInterpreter from './ScriptInterpreter';

describe('ScriptInterpreter', () => {
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
        },
      };
      const script = {
        0: {
          type: 'forward',
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 90
        },
      };
      const calc = new ScriptInterpreter();
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
        },
      };
      const script = {
        0: {
          type: 'forward',
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 90,
          dX: 1,
          dY: 0,
          dR: 0
        },
        6: {
          type: 'leftFlank',
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 0,
          dX: 0,
          dY: -1,
          dR: 0
        },
      };
      const calc = new ScriptInterpreter();

      const states = [];
      let currentState = initialState;
      for (let i = 0; i < 12; i++) {
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
