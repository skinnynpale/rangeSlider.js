import { Observer } from "../Observer/Observer";

class VisualModel extends Observer {
  constructor(public state: {} = {}) {
    super();
  }

  public setState(state: {} = {}) {
    this.correctState(state);
    Object.assign(this.state, state);

    this.emit("newVisualModel", this.state);
  }

  private correctState(state: {}) {
    state.bar = JSON.parse(state.bar);
    state.scale = JSON.parse(state.scale);
    state.settings = JSON.parse(state.settings);
    state.tip = JSON.parse(state.tip);
  }
}

export { VisualModel };
