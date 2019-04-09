import { merge } from 'lodash';
import MarcherBuilder from './MarcherBuilder';

export const defaultOptions = {
  files: 2,
  ranks: 2,
  fileSpacing: 2,
  rankSpacing: 2,
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

export default class BlockBuilder {
  createBlock(options = {}) {
    options = merge({}, defaultOptions, options);
    this.marchers = [];
    const { files, ranks, fileSpacing, rankSpacing } = options;
    const { x: x0, y: y0, r: r0 } = options.initialState.position;
    for (let r = 0; r < ranks; r++) {
      for (let f = 0; f < files; f++) {
        const x = x0 + (fileSpacing * f);
        const y = y0 + (rankSpacing * r);
        const marcher = new MarcherBuilder()
          .createMarcher({
            initialState: {
              ...options.initialState,
              position: {
                x: x,
                y: y,
                rotation: r0,
              },
            },
          });
        this.marchers.push(marcher);
      }
    }
    return this;
  }

  addStepsFromString(scriptString) {
    this.marchers.forEach(m => {
        m.addStepsFromString(scriptString);
    });
    return this;
  }

  build() {
    return this.marchers.map(m => m.build());
  }
}

/*
builder
  .createBlock({
      files: 2,
      ranks: 2,
      initialState: {}
  })
  .addStepsFromString(scriptString)
  .build()
*/
