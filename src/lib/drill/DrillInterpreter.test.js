import DrillInterpreter from './DrillInterpreter';
import BlockBuilder from './BlockBuilder';

describe('DrillInterpreter', () => {
  describe('stepForward', () => {
    test('all marchers advance', () => {
      const builder = new BlockBuilder();
      const block = builder
        .createBlock()
        .addStepsFromString('EE')
        .build();
      const drill = {
        marchers: block,
      };
      const drillInterpreter = new DrillInterpreter(drill);
      drillInterpreter.stepForward();
      drillInterpreter.stepForward();

      // moved two steps E.  y should not change.
      drill.marchers.forEach((m) => {
        const initial = m.script.initialState.position;
        const current = m.script.currentState.position;
        expect(current.x).toEqual(initial.x + 2);
        expect(current.y).toEqual(initial.y);
      });
      expect(drillInterpreter.count).toBe(2);
    });
  });
  describe('stepBackward', () => {
    test('two steps forward, one step back', () => {
      const builder = new BlockBuilder();
      const block = builder
        .createBlock()
        .addStepsFromString('EE')
        .build();
      const drill = {
        marchers: block,
      };
      const drillInterpreter = new DrillInterpreter(drill);

      // advance two counts
      drillInterpreter.stepForward();
      drillInterpreter.stepForward();
      // back up one
      drillInterpreter.stepBackward();

      // net movement of one step E.  y should not change.
      drill.marchers.forEach((m) => {
        const initial = m.script.initialState.position;
        const current = m.script.currentState.position;
        expect(current.x).toEqual(initial.x + 1);
        expect(current.y).toEqual(initial.y);
      });
      expect(drillInterpreter.count).toBe(1);
    });
  });
});
