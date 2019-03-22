import ActionInterpreter from './ActionInterpreter';
import Continue from './Continue';

describe('ActionInterpreter', () => {
  describe('getActionHandler', () => {
    test('should return Continue handler if no action given', () => {
        const handler = ActionInterpreter.getActionHandler(null);
        expect(handler).toBeInstanceOf(Continue);
    });

    test('should return Continue handler if action.type not found', () => {
        const handler = ActionInterpreter.getActionHandler({ type: 'foo'});
        expect(handler).toBeInstanceOf(Continue);
    });
  });
});
