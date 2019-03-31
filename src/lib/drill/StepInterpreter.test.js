import StepInterpreter from './StepInterpreter';
import StepDeltas from './StepDeltas';
import { createState, createStep } from '../TestHelpers';

// TODO: mock StepDeltas?  is it worth it?

describe('StepInterpreter', () => {
  describe('do', () => {
    it('increments count', () => {
      const currentState = createState({
        count: 1,
      });
      const step = createStep({
        direction: 90,
        dX: 1,
        dY: 0,
        dR: 0
      });
      const stepInterpreter = new StepInterpreter(StepDeltas);
      const newState = stepInterpreter.do(currentState, step);

      expect(newState.count).toBe(currentState.count + 1);
    });

    it('increments position by given step deltas', () => {
      const state = createState({
        count: 1,
        position: {
          x: 1,
          y: 1,
          rotation: 90,
        }
      });
      const step = createStep({
        direction: 90,
        dX: 1,
        dY: 0,
        dR: 0
      });

      const actionHandler = new StepInterpreter(StepDeltas);
      const newState = actionHandler.do(state, step);

      expect(newState.position.x).toBe(state.position.x + step.dX);
      expect(newState.position.y).toBe(state.position.y + step.dY);
      expect(newState.position.rotation).toBe(
        state.position.rotation + step.dR
      );
    });

    test('stepDeltas are defaulted', () => {
      const currentState = createState({
        count: 0,
        step: {
          strideType: 'sixToFive',
          stepType: 'full',
          direction: 90,
          dX: 1,
          dY: 0,
          dR: 0
        }
      });

      const actionHandler = new StepInterpreter(StepDeltas);
            const newState = actionHandler.do(currentState, null);
      expect(newState.step.dX).toBe(1);
      expect(newState.step.dY).toBe(0);
      expect(newState.step.dY).toBe(0);

    });
  });

  describe('ensureStepDeltas', () => {
    test('stepDeltas are defaulted', () => {
      const step = {
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 90
      };
      const actionHandler = new StepInterpreter(StepDeltas);
      const newStep = actionHandler.ensureStepDeltas(step);

      expect(newStep.dX).toBe(1);
      expect(newStep.dY).toBe(0);
      expect(newStep.dR).toBe(0);
    });
  });
});
