export default class PlaybackScheduler {
    createSchedule(drill) {
        return [
            // don't include count 0
            {
                count: 1,
                delta: 0.1,
                time: 0.3
            },
            {
                count: 2,
                delta: 0.1,
                time: 0.6
            },
            {
                count: 3,
                delta: 0.1,
                time: 0.9
            },
            {
                count: 4,
                delta: 0.1,
                time: 0.9
            },
            {
                count: 5,
                delta: 0.1,
                time: 0.9
            },
            {
                count: 6,
                delta: 0.1,
                time: 0.9
            },
        ];
    }
}