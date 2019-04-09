import ScriptInterpreter from "./ScriptInterpreter";

export default class DrillInterpreter {
  constructor(drill) {
      this.drill = drill;
      this.scriptInterpreter = new ScriptInterpreter();
      this.count = 0;
  }

  stepForward() {
    // TODO: guard against end of drill
    this.drill.marchers.forEach(m => {
      m.script.currentState = this.scriptInterpreter.stepForward(m.script);
    });
    this.count++;
  }

  stepBackward() {
    // TODO: guard against beginning of drill
    this.drill.marchers.forEach(m => {
      m.script.currentState = this.scriptInterpreter.stepBackward(m.script);
    });
    this.count--;
  }

  goToBeginning() {}

  goToEnd() {}

  goToCount() {}

  isBeginningOfDrill() {}

  isEndOfDrill() {}
}
