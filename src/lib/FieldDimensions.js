
/*
    In 6-5 steps, field is:

    144 steps wide
    64 steps high

    With a 6 step boundary:

    156 wide
    76 high

*/
export default class FieldDimensions {
    static get widthInSteps() {
        return 156;
    }

    static get heightInSteps() {
        return 76;
    }

    static get fieldRect() {
        return {
            left: 0,
            top: 0,
            right: this.widthInSteps,
            bottom: this.heightInSteps,
            height: this.heightInSteps,
            width: this.widthInSteps
        };
    }

    static get sidelineRect() {
        return {
            left: 6,
            top: 6,
            right: this.widthInSteps - 6,
            bottom: this.heightInSteps - 6,
            height: this.heightInSteps - 12,
            width: this.widthInSteps - 12,
        };
    }

    static get goalLineX() {
        // 6 steps buffer + 12 steps in endzone
        return 18;
    }
}