import ScriptInterpreter from './ScriptInterpreter';
import ScriptBuilder from './ScriptBuilder';
import FieldDimensions from '../field/FieldDimensions';

describe('ScriptInterpreter', () => {
  describe('stepForward', () => {
    test('forward 1 count', () => {
      const script = new ScriptBuilder().createScript().build();
      const calc = new ScriptInterpreter();
      const newState = calc.stepForward(script);

      // should change by 1 unit of x
      expect(newState.count).toBe(1);
      expect(newState.position.x).toBe(1);
      expect(newState.position.y).toBe(0);
      expect(newState.position.rotation).toBe(90);
    });

    test('E 6 counts, N 6 counts', () => {
      const script = new ScriptBuilder()
        .createScript()
        .addStep(6, {
          type: 'leftFlank',
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 0,
          dX: 0,
          dY: -1,
          dR: 0,
        })
        .build();
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
    test('forward EENN, then backward 4 counts', () => {
      const script = new ScriptBuilder()
        .createScript()
        .addStep(2, {
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 0,
        })
        .build();

      const calc = new ScriptInterpreter();

      for (let i = 0; i < 4; i++) {
        script.currentState = calc.stepForward(script);
      }

      expect(script.currentState.count).toBe(4);
      expect(script.currentState.position.x).toBe(2);
      expect(script.currentState.position.y).toBe(-2);
      expect(script.currentState.position.rotation).toBe(0);

      for (let i = 0; i < 4; i++) {
        script.currentState = calc.stepBackward(script);
      }

      // should be back at beginnin
      expect(script.currentState.count).toBe(0);
      expect(script.currentState.position.x).toBe(0);
      expect(script.currentState.position.y).toBe(0);
      expect(script.currentState.position.rotation).toBe(90);
    });

    test('forward ENWS, then backward 4 counts', () => {
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
          1: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 0,
          },
          2: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 270,
          },
          3: {
            strideType: 'sixToFive',
            stepType: 'full',
            direction: 180,
          },
        },
      };

      const calc = new ScriptInterpreter();

      for (let i = 0; i < 4; i++) {
        script.currentState = calc.stepForward(script);
      }

      // should be back at beginning location, but facing S
      expect(script.currentState.count).toBe(4);
      expect(script.currentState.position.x).toBe(0);
      expect(script.currentState.position.y).toBe(0);
      expect(script.currentState.position.rotation).toBe(180);

      for (let i = 0; i < 4; i++) {
        script.currentState = calc.stepBackward(script);
      }

      // should be back at beginning, but facing E
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
        steps: {},
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

  describe('isEndOfScript', () => {
    test('detects end of script when outside field', () => {
      const script = new ScriptBuilder()
        .createScript({
          initialState: {
            position: {
              x: 6,
              y: 6
            },
          },
          currentState: {
            count: 100,
            position: {
              x: FieldDimensions.widthInSteps + 1,
              y: 6
            } ,
          },
          steps: []
        })
        .build();
      const scriptInterpreter = new ScriptInterpreter();
      expect(scriptInterpreter.isEndOfScript(script)).toBe(true);
    });

    test('detects end of script when last action is non-moving state', () => {
      const script = new ScriptBuilder()
        .createScript()
        .addStep(2, {
          strideType: 'sixToFive',
          stepType: 'halt',
          direction: 90,
          dX: 0,
          dY: 0,
          dR: 0
        })
        .build();
      script.currentState.count = 2; // move to end of script
      const scriptInterpreter = new ScriptInterpreter();

      expect(scriptInterpreter.isEndOfScript(script)).toBe(true);
    });
  });

  describe('isAtFieldEdge', () => {
    test('detects position outside of field', () => {
      const script = {
        currentState: {
          position: {
            x: -2,
            y: 0
          }
        }
      };
      const scriptInterpreter = new ScriptInterpreter();
      expect(scriptInterpreter.isAtFieldEdge(script)).toBe(true);
    });

    test('detects position inside of field', () => {
      const script = {
        currentState: {
          position: {
            x: 2,
            y: 0
          }
        }
      };
      const scriptInterpreter = new ScriptInterpreter();
      expect(scriptInterpreter.isAtFieldEdge(script)).toBe(false);
    });
  });

});
