import ScriptInterpreter from "./ScriptInterpreter";

export default class DrillInterpreter {
  constructor(drill) {
      this.drill = drill;
      this.scriptInterpreter = new ScriptInterpreter();
      this.count = 0;
  }

  stepForward() {
    if (this.isEndOfDrill()) return;
    this.drill.marchers.forEach(m => {
      m.script.currentState = this.scriptInterpreter.stepForward(m.script);
    });
    this.count++;
  }

  stepBackward() {
    if (this.isBeginningOfDrill()) return;
    this.drill.marchers.forEach(m => {
      m.script.currentState = this.scriptInterpreter.stepBackward(m.script);
    });
    this.count--;
  }

  goToBeginning() {}

  goToEnd() {}

  goToCount() {}

  isBeginningOfDrill() {
    return this.drill.marchers.every(m => this.scriptInterpreter.isBeginningOfScript(m.script));
  }

  isEndOfDrill() {
    return this.drill.marchers.every(m => this.scriptInterpreter.isEndOfScript(m.script));
  }
}
