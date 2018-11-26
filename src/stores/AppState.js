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

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
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
    // if (this.isJittery(delta)) {
    //   console.log('jittery', delta, this.lastDelta);
    //   return;
    // }
    const newDelta = this.dejitter(delta);
    this.center = {
      //     x: this.center.x - (delta.x * delta.length * 1.5),
      //     y: this.center.y - (delta.y * delta.length * 1.5)
      x: this.center.x - newDelta.x,
      y: this.center.y - newDelta.y,
    };
    this.lastDelta = newDelta;
  }

  dejitter(delta) {
    if (!this.lastDelta) return delta;
    const newDelta = {
      x: delta.x,
      y: delta.y,
    };
    if (Math.abs(delta.x + this.lastDelta.x) < 1) {
      newDelta.x = 0;
    }

    if (Math.abs(delta.y + this.lastDelta.y) < 1) {
      newDelta.y = 0;
    }

    return newDelta;
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

  zoomIn: action,
  zoomOut: action,
  zoomToFit: action,
  reCenter: action,
  setZoom: action,
  setCenter: action,
  setCenterDelta: action,
  setFieldContainerSize: action,
});
