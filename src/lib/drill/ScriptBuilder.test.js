import ScriptBuilder, { defaultOptions } from './ScriptBuilder';

describe('ScriptBuilder', () => {
  describe('createScript', () => {
    test('createScript returns builder', () => {
      const builder = new ScriptBuilder();
      expect(builder.createScript({})).toBe(builder);
    });

    test('createScript defaults initialState', () => {
      const builder = new ScriptBuilder();
      const script = builder.createScript({}).build();
      expect(script.initialState).toEqual(defaultOptions.initialState);
    });

    test('createScript merges initialState', () => {
      const builder = new ScriptBuilder();
      const script = builder
        .createScript({
          initialState: {
            position: {
              x: 2,
              y: 4,
            },
          },
        })
        .build();
      expect(script.initialState.position.x).toEqual(2);
      expect(script.initialState.position.y).toEqual(4);
      expect(script.initialState.position.rotation).toEqual(
        defaultOptions.initialState.position.rotation
      );
    });

    test('createScript.addStepsFromString', () => {
      const builder = new ScriptBuilder();
      const script = builder
        .createScript({})
        .addStepsFromString('EEEESSSS')
        .build();
      expect(script.steps[1]).toEqual({
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 90,
      });
      expect(script.steps[2]).toBeUndefined();
      expect(script.steps[3]).toBeUndefined();
      expect(script.steps[4]).toBeUndefined();
      expect(script.steps[5]).toEqual({
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 180,
      });
    });
  });
});
