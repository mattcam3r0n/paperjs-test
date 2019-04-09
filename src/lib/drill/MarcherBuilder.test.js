import MarcherBuilder, { defaultOptions } from './MarcherBuilder';

describe('MarcherBuilder', () => {
  describe('createMarcher', () => {
    test('createMarcher returns builder', () => {
      const builder = new MarcherBuilder();
      expect(builder.createMarcher({})).toBe(builder);
    });

    test('createMarcher defaults initialState', () => {
      const builder = new MarcherBuilder();
      const marcher = builder.createMarcher({}).build();
      expect(marcher.script.initialState).toEqual(defaultOptions.initialState);
    });

    test('createMarcher merges initialState', () => {
      const builder = new MarcherBuilder();
      const marcher = builder
        .createMarcher({
          initialState: {
            position: {
              x: 2,
              y: 4,
            },
          },
        })
        .build();
      expect(marcher.script.initialState.position.x).toEqual(2);
      expect(marcher.script.initialState.position.y).toEqual(4);
      expect(marcher.script.initialState.position.rotation).toEqual(
        defaultOptions.initialState.position.rotation
      );
    });

    test('createMarcher.addStepsFromString', () => {
      const builder = new MarcherBuilder();
      const marcher = builder
        .createMarcher({})
        .addStepsFromString('EEEESSSS')
        .build();
      expect(marcher.script.steps[1]).toEqual({
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 90,
      });
      expect(marcher.script.steps[2]).toBeUndefined();
      expect(marcher.script.steps[3]).toBeUndefined();
      expect(marcher.script.steps[4]).toBeUndefined();
      expect(marcher.script.steps[5]).toEqual({
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 180,
      });
    });
  });
});
