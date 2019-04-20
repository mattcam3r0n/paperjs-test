import { observable } from 'mobx';
import PlaybackScheduler from "./PlaybackScheduler";
import DrillInterpreter from "./DrillInterpreter";

/*
    Who should be in charge of tracking current count?
    How should I communicate with FieldController to update marcher position?
    Right now, DrillPlayer is tracking count, as well as DesignViewState.  Mobx
    is facilitating the communication.
    Is there a place for a DrillState store?
      * Hold current drill, count, etc?  FieldController observes?
    Or, should FieldController be stored in state, so we can directly
    communicate without mobx observing?  (May be faster for animation purposes)
*/
export default class DrillPlayer {
    @observable isPlaying = false;

    constructor(rootState) {
        const { fieldState, drillState } = rootState;
        this.rootState = rootState;
        this.view = fieldState.fieldPaperScope.view;
        this.drill = drillState.currentDrill;
    }

    play() {
        const scheduler = new PlaybackScheduler();
        this.schedule = scheduler.createSchedule();

        this.drillInterpreter = new DrillInterpreter(this.drill);
        this.count = 0;
        this.isPlaying = true;
        this.lastStepTime = 0;

        // this will start playback
        this.view.onFrame = this.onFrame.bind(this);
    }

    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        this.view.onFrame = null; // stops playback
    }

    onFrame(event) {
        const { schedule, count, drillInterpreter } = this;
        const { fieldState } = this.rootState;
        if (!schedule) return this.stop();

        const step = schedule[count];
        if (!step) return this.stop();

        if (event.time >= this.lastStepTime + step.delta) {
            this.count++;
            this.lastStepTime = event.time;
            drillInterpreter.stepForward();
            fieldState.setCount(this.count); // update count so field can sync
            fieldState.syncMarcherPositions();
        }


//        console.log(event);
    }
}