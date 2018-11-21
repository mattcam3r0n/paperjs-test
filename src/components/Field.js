import React, { Component } from 'react';
import paper, { Color } from 'paper';

class Field extends Component {

  onResize() {
      console.log(window.innerWidth, window.innerHeight);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    const canvas = document.getElementById('largeBandCanvas');
    paper.setup(canvas);

    const marchers = [];

    // const triangle = new paper.Path.RegularPolygon({
    //   center: new paper.Point(10, 10),
    //   sides: 3,
    //   radius: 5,
    //   rotation: 90,
    //   fillColor: 'red',
    //   strokeColor: 'black',
    //   strokeWidth: 0.5,
    // });
    // const symbol = new paper.Symbol(triangle);

    for (let r = 0; r < 10; r++) {
      for (let f = 0; f < 24; f++) {
        const x = r * 10 * 2;
        const y = f * 10 * 2;

        // const item = symbol.place(new paper.Point(x, y));

        const item = new paper.Path.RegularPolygon({
          center: new paper.Point(10, 10),
          sides: 3,
          radius: 5,
          rotation: 90,
          fillColor: 'red',
          strokeColor: 'black',
          strokeWidth: 0.5,
        });

        item.position = new paper.Point(x, y);
        marchers.push(item);
      }
    }

    const m0 = marchers[0];

    let lastTime = 0;

    // The onFrame function is called up to 60 times a second:
    paper.view.onFrame = function(event) {
      if (event.time - lastTime < 0.5) {
        return;
      }

      // Run through the active layer's children list and change
      // the position of the placed symbols:
      marchers.forEach((m, i) => {
        var item = paper.project.activeLayer.children[i];

        // Move the item 1/20th of its width to the right. This way
        // larger circles move faster than smaller circles:
        //item.position.x += item.bounds.width / 10;

        item.position.x += 5;
        // item.opacity += -0.1;
        // if (item.opacity <= 0) item.opacity = 1;

        //item.fillColor = new Color(
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();
        item.fillColor = new Color(r, g, b, 1);
        //const hue = Math.floor(Math.random() * 255) + 1;
        //item.fillColor.hue = hue;
        //item.fillColor.hue += 20;
        //m0.fillColor.hue += 1;
        //marchers[0].fillColor.hue += 1;
        //         if (lastTime == 0) {
        //           item.fillColor.hue += 50;
        // //          console.log(item, i);
        //         }
        //        triangle.fillColor.hue += 0.1;
        // If the item has left the view on the right, move it back
        // to the left:
        if (item.bounds.left > paper.view.size.width) {
          item.position.x = -item.bounds.width;
        }
      });
      lastTime = event.time;
      // console.log(paper.view.size);
    };

    console.log(paper.project.activeLayer.children[0]);

    // Draw the view now:
    paper.view.draw();
  }

  render() {
    return (
      <div
        name="fieldContainer"
        style={{
          flex: 'auto',
          overflow: 'scroll',
        //   width: 'calc(100vw - 240px)',
        //   height: 'calc((100vw - 240px) / 2)',
        }}
      >
        <canvas
          id="largeBandCanvas"
        //   data-paper-resize="true"
          style={{ width: '100%', height: '100%', border: 'solid 1px black' }}
        />
      </div>
    );
  }
}

export default Field;
