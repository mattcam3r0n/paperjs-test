import paper, { PaperScope } from 'paper';

export default class Marcher {
    constructor(paperScope, options) {
        this.paperScope = paperScope;
        this.options = options || {};
        this.draw();
    }

    draw() {
        this.paperScope.activate();

        // const marcher = new paper.Path.RegularPolygon({
        //     center: [6, 6],
        //     sides: 3,
        //     radius: 1,
        //     rotation: 0,
        //     strokeColor: 'black',
        //     strokeWidth: 0.1,
        //     fillColor: 'red'
        // });

        //marcher.skew([0, 40]);
        //marcher.shear(0, 0.5);

        const marcherDimensions = {
            width: 1.5,
            height: 1.5
        };

        const center = {
            x: 6,
            y: 6
        };

        const halfWidth = marcherDimensions.width / 2;
        const halfHeight = marcherDimensions.height / 2;
        const segments = [
            new paper.Point(center.x - halfWidth, center.y + halfHeight),
            new paper.Point(center.x, center.y + halfHeight / 2),
            new paper.Point(center.x + halfWidth, center.y + halfHeight),
            new paper.Point(center.x, center.y - halfHeight),
            new paper.Point(center.x - halfWidth, center.y + halfHeight),
        ];

        const marcher = new paper.Path({
            segments,
            position: center,
            rotation: this.options.rotation || 0,
            strokeColor: 'black',
            strokeWidth: 0.1,
            fillColor: 'red'
        });
        //marcher.selected = true;
        marcher.closed = true;
        marcher.position = this.options.position;
        //marcher.scale(2, 1)
    }
}