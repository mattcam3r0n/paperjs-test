import ScriptInterpreter from './ScriptInterpreter';

describe('ScriptInterpreter', () => {
  describe('stepForward', () => {
    test('forward 1 count', () => {
      const script = {
        initialState: {
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
        },
        currentState: {
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
        },
        steps: {},
      };
      const calc = new ScriptInterpreter();
      const newState = calc.stepForward(script);

      // should change by 1 unit of x
      expect(newState.count).toBe(1);
      expect(newState.position.x).toBe(1);
      expect(newState.position.y).toBe(0);
      expect(newState.position.rotation).toBe(90);
    });

    test('E 6 counts, N 6 counts', () => {
      const script = {
        initialState: {
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
        },
        currentState: {
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
        },
        steps: {
          6: {
            type: 'leftFlank',
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 0,
            dX: 0,
            dY: -1,
            dR: 0,
          },
        },
      };
      const calc = new ScriptInterpreter();

      const states = [];
      for (let i = 0; i < 12; i++) {
        script.currentState = calc.stepForward(script);
        states.push(script.currentState);
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

  describe('stepBackward', () => {
    test('forward EENN, backward 4 counts', () => {
      const script = {
        initialState: {
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
        },
        currentState: {
          count: 4,
          position: {
            x: 2,
            y: -2,
            rotation: 0,
          },
          step: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 90,
          },
        },
        steps: {
          2: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 0,
          },
        },
      };

      const calc = new ScriptInterpreter();

      for (let i = 0; i++; i < 4) {
        script.currentState = calc.stepForward(script);
      }

      expect(script.currentState.count).toBe(4);
      expect(script.currentState.position.x).toBe(2);
      expect(script.currentState.position.y).toBe(-2);
      expect(script.currentState.position.rotation).toBe(0);

      script.currentState = calc.stepBackward(script);
      script.currentState = calc.stepBackward(script);
      script.currentState = calc.stepBackward(script);
      script.currentState = calc.stepBackward(script);

      expect(script.currentState.count).toBe(0);
      expect(script.currentState.position.x).toBe(0);
      expect(script.currentState.position.y).toBe(0);
      expect(script.currentState.position.rotation).toBe(90);
    });

    test('backward 1 count', () => {
      const script = {
        initialState: {
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
        },
        currentState: {
          count: 1,
          position: {
            x: 1,
            y: 0,
            rotation: 90,
          },
          step: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 90,
          },
        },
        steps: {
        },
      };

      const calc = new ScriptInterpreter();
      const newState = calc.stepBackward(script);

      // should change by 1 unit of x
      expect(newState.count).toBe(0);
      expect(newState.position.x).toBe(0);
      expect(newState.position.y).toBe(0);
      expect(newState.position.rotation).toBe(90);
    });
  });
});
