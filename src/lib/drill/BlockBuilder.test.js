import BlockBuilder, { defaultOptions } from './BlockBuilder';

describe('BlockBuilder', () => {
  describe('createBlock', () => {
    test('createBlock returns builder', () => {
      const builder = new BlockBuilder();
      expect(builder.createBlock({})).toBe(builder);
    });

    test('build 2 x 2 block', () => {
      const builder = new BlockBuilder();
      const block = builder.createBlock({}).build();
      block.forEach((m) => console.log(m.script.initialState.position));
      expect(block.length).toBe(4);
      const actual = block.map((m) => {
        const { x, y } = m.script.initialState.position;
        return [x, y];
      });
      const expected = [[0, 0], [2, 0], [0, 2], [2, 2]];
      expect(actual).toEqual(expected);
    });

    test('build 4 x 4 block', () => {
      const builder = new BlockBuilder();
      const block = builder.createBlock({ files: 4, ranks: 4 }).build();
      block.forEach((m) => console.log(m.script.initialState.position));
      expect(block.length).toBe(16);
      const actual = block.map((m) => {
        const { x, y } = m.script.initialState.position;
        return [x, y];
      });
      const expected = [[0, 0], [2, 0], [4, 0], [6, 0],
                        [0, 2], [2, 2], [4, 2], [6, 2],
                        [0, 4], [2, 4], [4, 4], [6, 4],
                        [0, 6], [2, 6], [4, 6], [6, 6],
        ];
      expect(actual).toEqual(expected);
    });
  });
});
