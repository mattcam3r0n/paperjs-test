import ScriptInterpreter from "./ScriptInterpreter";

export default class DrillInterpreter {
  constructor(drill) {
      this.drill = drill;
      this.scriptInterpreter = new ScriptInterpreter();
      this.count = 0;
  }

  stepForward() {
    const { marchers } = this.drill;
    marchers.forEach(m => {
      m.script.currentState = this.scriptInterpreter.stepForward(m.script);
      this.count++;
    });
  }

  stepBackward() {}

  goToBeginning() {}

  goToEnd() {}

  goToCount() {}

  isBeginningOfDrill() {}

  isEndOfDrill() {}
}
