import { merge } from 'lodash';
import ScriptBuilder from './ScriptBuilder';

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
    },
  },
};

export default class MarcherBuilder {
  createMarcher(options = {}) {
    options = merge({}, defaultOptions, options);
    this.script = new ScriptBuilder().createScript({
      initialState: merge({}, options.initialState),
      currentState: merge({ count: 0 }, options.initialState),
      steps: {},
    });
    this.marcher = {
      id: '',
    };
    return this;
  }

  addStepsFromString(scriptString) {
    this.script.addStepsFromString(scriptString);
    return this;
  }

  build() {
    return {
      ...this.marcher,
      script: this.script.build()
    };
  }
}
