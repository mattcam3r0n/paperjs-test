//import { observable } from 'mobx';

export default class TimelineState {
  timelinePaperScope; 

  constructor(root) {
    this.rootState = root;
  }

  setTimelinePaperScope(paperScope) {
    this.timelinePaperScope = paperScope;
  }
}
