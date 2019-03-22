import { defaultState, createState } from './TestHelpers';

describe('TestHelpers', () => {
  describe('createState', () => {
    test('should return defaults', () => {
      const state = createState({});
      expect(state).toEqual(defaultState);
    });

    test('should override count', () => {
      const state = createState({ count: 1 });
      expect(state.count).toBe(1);
      expect(state.position).toEqual(defaultState.position);
      expect(state.step).toEqual(defaultState.step);
    });

    test('should override position', () => {
      const stateOptions = { position: { x: 1, y: 1, rotation: 90 } };
      const state = createState(stateOptions);
      expect(state.count).toBe(defaultState.count);
      expect(state.position).toEqual(stateOptions.position);
      expect(state.step).toEqual(defaultState.step);
    });

    test('should override step', () => {
      const stateOptions = {
        step: {
          strideType: 'eightToFive',
          stepType: 'half',
          direction: 90,
          dX: 1,
          dY: 1,
          dR: 1,
        },
      };
      const state = createState(stateOptions);
      expect(state.count).toBe(defaultState.count);
      expect(state.position).toEqual(defaultState.position);
      expect(state.step).toEqual(stateOptions.step);
    });
  });
});
