import ToTheRear from './ToTheRear';
import StepDeltas from '../StepDeltas';
import { createState } from '../../TestHelpers';

// TODO: mock StepDeltas?  is it worth it?

describe('ToTheRear', () => {
  describe('do', () => {
    it('changes direction by +180', () => {
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
        type: 'toTheRear',
        strideType: 'sixToFive',
        stepType: 'full',
      };

      const rightFlank = new ToTheRear(StepDeltas);
      const newState = rightFlank.do(currentState, action);

      // direction of travel should be +180
      expect(newState.step.direction).toBe(currentState.step.direction + 180);
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
      type: 'toTheRear',
      strideType: 'sixToFive',
      stepType: 'full',
    };

    const rightFlank = new ToTheRear(StepDeltas);
    const newState = rightFlank.do(currentState, action);

    expect(newState.step.strideType).toBe(currentState.step.strideType);
    expect(newState.step.stepType).toBe(currentState.step.stepType);
  });
});
