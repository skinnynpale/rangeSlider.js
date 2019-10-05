interface IState {
  [key: string]: number | number[];
}

class Model {
  public state: IState = {};

  constructor(state = {}) {
    this.setState(state);
  }

  public setState(state = {}): void {
    Object.assign(this.state, state);

    this._correctMinMaxRange();
    this._correctStep();
    this.state.values = (this.state.values as number[]).map(value => this._correctValueInTheRange(value));
    this.state.values = (this.state.values as number[]).map(value => this._correctValueByStep(value));

    console.log(this.state);
  }

  private _correctMinMaxRange(): void {
    if (this.state.min > this.state.max) {
      const temp = this.state.min;
      this.state.min = this.state.max;
      this.state.max = temp;
    }
  }

  private _correctStep(): void {
    this.state.step < 1 ? (this.state.step = 1) : "";
    this.state.step > this.state.max ? (this.state.step = this.state.max) : "";
  }

  private _correctValueInTheRange(value: number): number {
    return this._isValueInTheRange(value);
  }

  private _isValueInTheRange(value: number): number {
    if (value < this.state.min) {
      return this.state.min as number;
    } else if (value > this.state.max) {
      return this.state.max as number;
    } else {
      return value;
    }
  }

  private _correctValueByStep(value: number): number {
    const step = this.state.step as number;
    const newValue = Math.ceil(value / step) * step;

    if (newValue > this.state.max) {
      return Math.floor(value / step) * step;
    } else {
      return newValue;
    }
  }
}

export { Model, IState };
