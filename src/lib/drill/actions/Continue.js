import ActionHandler from './ActionHandler';

export default class Continue extends ActionHandler {
    constructor(stepDeltas) {
        super(stepDeltas);
        this.type = 'continue';
        this.stepDeltas = stepDeltas;
      }

      do(currentState, action) {
        return super.do(currentState, action);
    };
}