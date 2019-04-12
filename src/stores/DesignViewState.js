import { observable, action, computed } from 'mobx';
import ToolNames from '../lib/tools/ToolNames';
import ToolFactory from '../lib/tools/ToolFactory';
import DrillPlayer from '../lib/drill/DrillPlayer';
import BlockBuilder from '../lib/drill/BlockBuilder';

export default class DesignViewState {
  @observable activeTool;
  @observable cursor;
  @observable drill;
  @observable drillPlayer;

  constructor(root) {
    this.rootState = root;
    this.toolFactory = new ToolFactory(this.rootState);
  }

  get fieldState() {
    return this.rootState.fieldState;
  }

  get fieldPaperScope() {
    return this.rootState.fieldState.fieldPaperScope;
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
    this.drill = this.createNewDrill();
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

  @action.bound
  newDrill() {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    this.drill = this.createNewDrill({ x: x, y: y});
  }

  // temporary helper
  createNewDrill(options = { x: 12, y: 6 }) {
    const drill = {};
    const block = new BlockBuilder()
      .createBlock({
        files: 20,
        ranks: 20,
        initialState: {
          position: {
            x: 12,
            y: 6
          }
        }
      })
      .build();
    drill.marchers = block;
    // for (let i = 0; i < 16; i++) {
    //   const m = {
    //     initialState: {
    //       x: options.x + (i % 4) * 2,
    //       y: options.y + Math.floor(i / 4) * 2,
    //       direction: 90,
    //     },
    //     currentState: {
    //       x: options.x + (i % 4) * 2,
    //       y: options.y + (i % 4) * 2,
    //       direction: 90,
    //     },
    //   };
    //   drill.marchers.push(m);
    // }
    return drill;
  }
}
