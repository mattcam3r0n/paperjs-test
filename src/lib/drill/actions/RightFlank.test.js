import RightFlank from './RightFlank';
import StepDeltas from '../StepDeltas';
import { createState } from '../../TestHelpers';

// TODO: mock StepDeltas?  is it worth it?

describe('RightFlank', () => {
  describe('do', () => {
    it('changes direction by +90', () => {
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

      // direction of travel should be +90
      expect(newState.step.direction).toBe(currentState.step.direction + 90);
      // marcher facing direction (rotation) should equal travel direction
      expect(newState.position.rotation).toBe(newState.step.direction);
    });
  });

  it('preserves current stride and step type', () => {
    // Flank should change direction but continue using current
    // stride and step type.
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

    expect(newState.step.strideType).toBe(currentState.step.strideType);
    expect(newState.step.stepType).toBe(currentState.step.stepType);
  });
});