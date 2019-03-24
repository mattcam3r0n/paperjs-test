// TODO: account for different strides and step types
const deltas = {
    "0": {
        dX: 0,
        dY: -1,
        dR: 0
    },
    "90": {
        dX: 1,
        dY: 0,
        dR: 0
    },
    "180": {
        dX: 0,
        dY: 1,
        dR: 0
    },
    "270": {
        dX: -1,
        dY: 0,
        dR: 0
    },
};

export default class StepDelta {
    static getStepDelta(step) {
        if (!deltas[step.direction]) {
            console.log('unknown direction', step.direction);
        }
        return deltas[step.direction];
    }
}