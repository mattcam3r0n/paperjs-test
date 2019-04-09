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
    });
  });
});
