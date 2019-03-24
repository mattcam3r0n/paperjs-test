import Directions from './Directions';

describe('Directions', () => {
    describe('normalize', () => {
        test('0 - 90 = 270', () => {
            const dir = Directions.normalize(0 - 90);
            expect(dir).toBe(270);
        });
        test('360 + 90 = 270', () => {
            const dir = Directions.normalize(360 + 90);
            expect(dir).toBe(90);
        });
        test('90 - 180 = 270', () => {
            const dir = Directions.normalize(90 - 180);
            expect(dir).toBe(270);
        });
        test('720 = 0', () => {
            const dir = Directions.normalize(720);
            expect(dir).toBe(0);
        });
    });
});