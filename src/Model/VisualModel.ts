import { Observer } from "../Observer/Observer";

class VisualModel extends Observer {
  constructor(public state: any = {}) {
    super();
  }

  public setState(state: {} = {}) {
    Object.assign(this.state, state);

    this.emit("newVisualModel", this.state);
  }
}

export { VisualModel };
