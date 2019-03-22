* actions (commands?) cause changes in state
    * change direction, change step type
* current state dictates what a marcher does / is doing
    * x, y, rotation - location and direction
    * deltaX, deltaY, deltaR - change that will take place at each count
    * dX, dY, dR are dictated by combination of strideType and stepType
* can i make stride and step type mathematical, so that state can be changed with simple addition/subtraction, like position does?
    * add/subtract a delta necessary to get to right state?
    * use bit mask?

// action
{
    type: 'forward',
    dR: 0,
    step: {
        strideType: 'sixToFive',
        stepType: 'full'
    }
}
{
    type: 'leftFlank',
    dR: -90,
    step: {
        strideType: 'sixToFive',
        stepType: 'full',
    }
}
{
    type: 'leftCM1',
    dR: -90,
    stepType: 'half'
}
{
    type: 'leftCM2',
    dR: -90,
    stepType: 'full'
}
{ 
    type: 'rightFlank',
    dR: 90,
    stepType: 'full'
}

// marcher state
{
    count: 0,
    position: {
        x: 0,
        y: 0,
        r: 90 // the direction the marcher is facing (may not match dir of travel)
    },
    step: {
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 90, // the direction of travel
        dX: 1,
        dY: 0,
        dR: 0 // change in position.rotation (not dir of travel)
    }
}

{
    initialState: {
        x: 0,
        y: 0,
        rotation: 90,
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 90,
        dX: 1,  // change in X
        dY: 0,  // change in Y
        dR: 0,  // chaing in R (rotation / direction)
    },
    currentState: {
        // count
        count: 0, // necessary?
        // position
        x: 0,
        y: 0,
        rotation: 90,
        // action type
        strideType: 'sixToFive',
        stepType: 'full',
        direction: 0,
        // position delta - dictated by action type
        dX: 1,  // change in X
        dY: 0,  // change in Y
        dR: 0,  // chaing in R (rotation / direction)
    },
    script: {
        "6": {
            action: 'wrap',
            strideType: 'sixToFive',
            stepType: 'full'
        },
        "12": {
            action: 'countermarch1",
            strideType: 'sixToFive',
            stepType: 'half'
        }
        "14": { // do we need to store this second turn explicitly or can we infer?
            action: 'countermarch2',
            strideType: 'sixToFive',
            stepType: 'full'
        },
        "18": {
            action: 'pinwheel',
            strideType:'n/a',
            stepType: 'n/a',
            counts: 8,
            radius: 0,
            pinwheelDirection: 'clockwise',
            pinwheelRotation: 'full' // quarter, half, three quarter
        },
        "26": {
            action: 'forward',
            strideType: 'sixToFive',
            stepType: 'full'
        },
        "30": {
            action: 'halt'
        }
    }
}