
export default class Directions {
    static nameAngle = {
        'N': 0,
        'E': 90,
        'S': 180,
        'W': 270
    };
    static angleName = {
        '0': 'N',
        '90': 'E',
        '180': 'S',
        '270': 'W'
    };
    static get N() {
        return 0;
    }

    static get E() {
        return 90;
    }

    static get S() {
        return 180;
    }

    static get W() {
        return 270;
    }

    static normalize(dir) {
        if (dir >= 0 && dir < 360) return dir;

        return dir - (Math.floor(dir / 360) * 360);
    }

    static leftOf(from) {
        let newDir = from - 90;
        return newDir < 0 ? 360 + newDir : newDir;
    }

    static rightOf(from) {
        let newDir = (from + 90);
        return newDir >= 360 ? newDir - 360 : newDir;
    }

    static aboutFaceFrom(fromDir) {
        return this.rotate180(fromDir);
    }

    static rotate180(fromDir) {
        let newDir = (fromDir + 180);
        return newDir >= 360 ? newDir - 360 : newDir;
    }

}