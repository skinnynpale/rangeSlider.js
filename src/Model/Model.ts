interface IState {
  [key: string]: number;
}

class Model {
  public state: IState = {};

  constructor(state = {}) {
    this.setState(state);
  }

  public setState(state = {}): void {
    Object.assign(this.state, state);
  }
}

export { Model, IState };
