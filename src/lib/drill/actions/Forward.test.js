import Forward from './Forward';
import StepDeltas from '../StepDeltas';
import { createState } from '../../TestHelpers';

it('forward action maintains current direction', () => {
  const currentState = createState({
      position: {
          rotation: 90
      },
      step: {
          direction: 90
      }
  });
  const action = {
    type: 'forward',
    strideType: 'sixToFive',
    stepType: 'full',
  };
  const forward = new Forward(StepDeltas);
  const newState = forward.do(currentState, action);
  expect(newState.step.direction).toBe(currentState.step.direction);
});

