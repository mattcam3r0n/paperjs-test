export const defaultState = {
  count: 0,
  position: {
    x: 0,
    y: 0,
    rotation: 0,
  },
  step: {
    strideType: 'sixToFive',
    stepType: 'full',
    direction: 0,
    dX: 0,
    dY: -1,
    dR: 0,
  },
};

export const defaultStep = {
    strideType: 'sixToFive',
    stepType: 'full',
    direction: 90,
    dX: 1,
    dY: 0,
    dR: 0,
};

export function createState(stateOptions) {
  return {
    ...defaultState,
    ...stateOptions,
    position: {
      ...defaultState.position,
      ...stateOptions.position,
    },
    step: {
      ...defaultState.step,
      ...stateOptions.step,
    },
  };
}

export function createStep(stepOptions) {
    return {
        ...defaultStep,
        ...stepOptions
    };
}
