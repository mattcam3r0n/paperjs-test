import PlaybackScheduler from "./PlaybackScheduler";
import DrillInterpreter from "./DrillInterpreter";

export default class DrillPlayer {
    constructor(rootState) {
        const { designViewState } = rootState;
        this.rootState = rootState;
        //this.
        // this.fieldPaperScope = designViewState.fieldPaperScope;
        this.view = designViewState.fieldPaperScope.view;
        this.drill = designViewState.drill;
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
        this.isPlaying = false;
        this.view.onFrame = null;
    }

    onFrame(event) {
        const { schedule, count } = this;
        if (!schedule) return this.stop();

        const step = schedule[count];
        if (!step) return this.stop();

        if (event.time >= this.lastStepTime + step.delta) {
            console.log(event.time, this.lastStepTime, step.delta);
            this.count++;
            this.lastStepTime = event.time;
            this.drillInterpreter.stepForward();
            this.rootState.fieldState.setCount(this.count); // update count so field can sync
        }


//        console.log(event);
    }
}