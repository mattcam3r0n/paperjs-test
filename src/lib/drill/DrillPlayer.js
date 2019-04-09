import PlaybackScheduler from "./PlaybackScheduler";

export default class DrillPlayer {
    constructor(fieldPaperScope, drill) {
        this.fieldPaperScope = fieldPaperScope;
        this.view = fieldPaperScope.view;
        this.drill = drill;
    }

    play() {
        const scheduler = new PlaybackScheduler();
        this.schedule = scheduler.createSchedule();

        this.count = 0;
        this.isPlaying = true;
        this.lastStepTime = 0;

        // this will start playback
        this.view.onFrame = this.onFrame.bind(this);
    }

    stop() {
        console.log('stop');
        this.isPlaying = false;
        this.view.onFrame = null;
    }

    onFrame(event) {
        const { schedule, count } = this;
        if (!schedule) return this.stop();

        const step = schedule[count];
        if (!step) return this.stop();

        if (event.time >= this.lastStepTime + step.delta) {
            console.log('count ', count, step.time, this.lastStepTime);
            this.count++;
            this.lastStepTime = event.time;
        }


//        console.log(event);
    }
}