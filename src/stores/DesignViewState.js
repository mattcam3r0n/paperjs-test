import { observable, action, computed } from 'mobx';
import ToolNames from '../lib/tools/ToolNames';
import ToolFactory from '../lib/tools/ToolFactory';
import DrillPlayer from '../lib/drill/DrillPlayer';

export default class DesignViewState {
  @observable activeTool;
  @observable cursor;
  @observable drill;
  @observable drillPlayer;

  constructor(root) {
    this.rootState = root;
    this.toolFactory = new ToolFactory(this.rootState);
  }

  @computed
  get isSelectionToolActive() {
    return (
      this.activeTool &&
      (this.activeTool.name === ToolNames.RECTANGULAR_SELECTION ||
        this.activeTool.name === ToolNames.IRREGULAR_SELECTION)
    );
  }

  //@computed
  isToolActive(toolName) {
    return this.activeTool && this.activeTool.name === toolName;
  }

  activateTool(toolName) {
    this.disposeActiveTool();
    const tool = this.toolFactory.create(toolName);
    this.setActiveTool(tool);
  }

  @action
  setCursor(cursor) {
    this.cursor = cursor;
  }

  @action
  setActiveTool(tool) {
    this.activeTool = tool;
    this.setCursor(tool.cursor);
  }

  @action
  disposeActiveTool() {
    if (this.activeTool) {
      this.activeTool.dispose();
      this.activeTool = null;
    }
  }

  @action
  newPath() {
    if (!this.isToolActive(ToolNames.PATH)) return;
    this.activeTool.newPath();
  }

  @action
  fieldInitialized() {
    // TODO: open last drill?
  }

  @action
  play() {
    this.drillPlayer = new DrillPlayer(this.rootState);
    this.drillPlayer.play();
  }

  @action
  stop() {
    this.drillPlayer.stop();
    this.drillPlayer = null;
  }

  @computed
  get isPlaying() {
    return this.drillPlayer && this.drillPlayer.isPlaying;
  }

}
