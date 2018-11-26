import { observable, action, decorate } from 'mobx';
import FieldDimensions from '../lib/FieldDimensions';

export default class AppState {
  authenticated;
  authenticating;
  //   @observable items;
  //   @observable item;
  //   @observable testval;
  zoomFactor;
  center;
  fieldContainerSize;
  lastDelta;
  activeTool;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.activeTool = 'pan';
    this.zoomFactor = 1;
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
    this.fieldContainerSize = {
      width: FieldDimensions.width,
      height: FieldDimensions.height,
    };
  }

  zoomIn() {
    this.zoomFactor *= 1.1;
  }

  zoomOut() {
    this.zoomFactor *= 0.9;
  }

  zoomToFit() {
    // TODO: need better algorithm that takes height into account
    this.zoomFactor =
      this.fieldContainerSize.width / FieldDimensions.widthInSteps;
    this.reCenter();
  }

  reCenter() {
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
  }

  setZoom(newFactor) {
    this.zoomFactor = newFactor;
  }

  setCenter(newCenter) {
    this.center = newCenter;
  }

  setCenterDelta(delta) {
    const newDelta = this.dejitter(delta.multiply(1.5));
    this.center = {
      x: this.center.x - (newDelta.x),
      y: this.center.y - (newDelta.y),
    };
    this.lastDelta = newDelta;
  }

  dejitter(delta) {
    // sometimes the mouse delta jitters between, eg, -1.2 and 1.2 for some reason. 
    // try to detect and modify to smooth panning.
    if (!this.lastDelta) return delta;

    return {
        x: (Math.abs(delta.x + this.lastDelta.x) < 1) ? 0 : delta.x,
        y: (Math.abs(delta.y + this.lastDelta.y) < 1) ? 0 : delta.y
    };
  }

  setFieldContainerSize(newSize) {
    this.fieldContainerSize = newSize;
  }

  //   async fetchData(pathname, id) {
  //     let { data } = await axios.get(
  //       `https://jsonplaceholder.typicode.com${pathname}`
  //     );
  //     console.log(data);
  //     data.length > 0 ? this.setData(data) : this.setSingle(data);
  //   }

  //   @action setData(data) {
  //     this.items = data;
  //   }

  //   @action setSingle(data) {
  //     this.item = data;
  //   }

  //   @action clearItems() {
  //     this.items = [];
  //     this.item = {};
  //   }

  //   @action authenticate() {
  //     return new Promise((resolve, reject) => {
  //       this.authenticating = true;
  //       setTimeout(() => {
  //         this.authenticated = !this.authenticated;
  //         this.authenticating = false;
  //         resolve(this.authenticated);
  //       }, 0);
  //     });
  //   }
}

decorate(AppState, {
  authenticated: observable,
  authenticating: observable,
  zoomFactor: observable,
  center: observable,
  fieldContainerSize: observable,
  activeTool: observable,

  zoomIn: action,
  zoomOut: action,
  zoomToFit: action,
  reCenter: action,
  setZoom: action,
  setCenter: action,
  setCenterDelta: action,
  setFieldContainerSize: action,
});
