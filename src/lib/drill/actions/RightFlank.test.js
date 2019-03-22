import RightFlank from './RightFlank';
import StepDeltas from '../StepDeltas';
import { createState } from '../../TestHelpers';

// TODO: mock StepDeltas?  is it worth it?

describe('RightFlank', () => {
  describe('do', () => {
    it('rightFlank changes direction by +90', () => {
      const currentState = createState({
        count: 1,
        position: {
          rotation: 90,
        },
        step: {
          direction: 90,
          dX: 1,
        },
      });

      const action = {
        type: 'rightFlank',
        strideType: 'sixToFive',
        stepType: 'full',
      };

      const rightFlank = new RightFlank(StepDeltas);
      const newState = rightFlank.do(currentState, action);

      expect(newState.step.direction).toBe(currentState.step.direction + 90);
    });
  });
});
