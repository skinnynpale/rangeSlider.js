import { Observer } from "../Observer/Observer";

interface IVisualModel {
  direction: string;
  skin: string;
  bar: boolean;
  tip: boolean;
  type: string;
  scale: {
    [key: string]: number | boolean;
  };
}

class VisualModel extends Observer {
  constructor(public state: {} = {}) {
    super();
  }

  public setState(state: {} = {}) {
    Object.assign(this.state, state);

    this.emit("newVisualModel", this.state);
  }
}

export { VisualModel, IVisualModel };
