export default class PlaybackScheduler {
    createSchedule(drill) {
        return [
            // don't include count 0
            {
                count: 1,
                delta: 0.5,
                time: 2
            },
            {
                count: 2,
                delta: 0.5,
                time: 4
            },
            {
                count: 3,
                delta: 0.5,
                time: 6
            },
        ];
    }
}