import { merge } from 'lodash';
import Directions from './Directions';

export const defaultOptions = {
  initialState: {
    position: {
      x: 0,
      y: 0,
      rotation: 90,
    },
    step: {
      strideType: 'sixToFive',
      stepType: 'full',
      direction: 90,
      dX: 1,
      dY: 0,
      dR: 0
    },
  },
};

export default class ScriptBuilder {
  createScript(options = {}) {
    options = merge({}, defaultOptions, options);
    this.script = {
        initialState: merge({}, options.initialState),
        currentState: merge({ count: 0 }, options.initialState, options.currentState),
        steps: {},
    };
    this.nextInsertCount = 1;
    return this;
  }

  addStepsFromString(scriptString) {
    let lastStepChar = '';
    for (let index = 0; index < scriptString.length; index++) {
      const stepChar = scriptString[index];
      if (stepChar !== lastStepChar) {
        const step = this.createStep(stepChar);
        this.script.steps[this.nextInsertCount] = step;
      }
      this.nextInsertCount++;
      lastStepChar = stepChar;
    }
    return this;
  }

  addStep(count, step) {
    this.script.steps[count] = step;
    return this;
  }

  build() {
    return this.script;
  }

  createStep(stepChar) {
    return {
      strideType: 'sixToFive',
      stepType: 'full',
      direction: Directions.nameAngle[stepChar],
    };
  }
}
