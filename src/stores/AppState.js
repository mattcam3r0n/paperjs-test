import { observable, action } from 'mobx';
import FieldDimensions from '../lib/FieldDimensions';
import PanTool from '../lib/PanTool';
import PointerTool from '../lib/PointerTool';
import PathTool from '../lib/PathTool';

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable zoomFactor;
  @observable center;
  @observable fieldContainerSize;
  @observable activeTool;

  lastDelta;

  constructor() {
    this.panTool = new PanTool(this.onPan);
    this.pointerTool = new PointerTool();
    this.pathTool = new PathTool();
    this.pointerTool.activate();
    this.authenticated = false;
    this.authenticating = false;
    this.activeTool = this.pointerTool;
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

  onPan = (delta) => {
    this.setCenterDelta(delta);
  };


  activatePanTool() {
    this.panTool.activate();
    this.activeTool = this.panTool;
  }

  activatePointerTool() {
    // this.pointerTool.activate();
    // this.activeTool = this.pointerTool;
    this.pathTool.activate();
    this.activeTool = this.pathTool;
  }

  @action
  zoomIn() {
    this.zoomFactor *= 1.1;
  }

  @action
  zoomOut() {
    this.zoomFactor *= 0.9;
  }

  @action
  zoomToFit() {
    // TODO: need better algorithm that takes height into account
    this.zoomFactor =
      this.fieldContainerSize.width / FieldDimensions.widthInSteps;
    this.reCenter();
  }

  @action
  reCenter() {
    this.center = {
      x: FieldDimensions.widthInSteps / 2,
      y: FieldDimensions.heightInSteps / 2,
    };
  }

  @action
  setZoom(newFactor) {
    this.zoomFactor = newFactor;
  }

  @action
  setCenter(newCenter) {
    this.center = newCenter;
  }

  @action
  setCenterDelta(delta) {
    const speed = 2;
    const newDelta = this.dejitter(delta.multiply(speed));
    this.center = {
      x: this.center.x - newDelta.x,
      y: this.center.y - newDelta.y,
    };
    this.lastDelta = newDelta;
  }

  dejitter(delta) {
    // sometimes the mouse delta jitters, eg. between -1.2 and 1.2
    // try to detect and modify to smooth panning.
    if (!this.lastDelta) return delta;

    const min = 0.3;
    return {
      x: Math.abs(delta.x + this.lastDelta.x) < min ? 0 : delta.x,
      y: Math.abs(delta.y + this.lastDelta.y) < min ? 0 : delta.y,
    };
  }

  @action
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
