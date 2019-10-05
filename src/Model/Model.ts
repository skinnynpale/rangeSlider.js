import { Observer } from "../Observer/Observer";

interface IState {
  [key: string]: number | number[];
}
interface IOnlyNumbers {
  [key: string]: number;
}

class Model extends Observer {
  public state: IState = {};
  private mapOfHandlers: Map<any, any> = new Map();

  constructor(state = {}) {
    super();

    this.setState(state);
  }

  public setState(state: any = {}): void {
    Object.assign(this.state, state);

    this._correctMinMaxRange();
    this._correctStep();
    this.state.values = this.state.values
      ? (this.state.values as number[]).map(value => this._correctValue(value)).sort()
      : [];

    if (state.target && state.edge) {
      const pxValue = this._countPxValueFromValue(this.state.value as number);
      const pxValues = (this.state.values as number[]).map(value => this._countPxValueFromValue(value));

      this.mapOfHandlers.set(state.target, { value: state.value, pxValue });

      console.log(this.mapOfHandlers);

      this.emit("pxValueDone", {
        target: state.target,
        value: this.state.value,
        values: this.state.values,
        pxValue,
        pxValues,
      });
    }

    if (state.target && state.left) {
      this.state.value = this._countValueFromLeft(state.left);
      this.state.value = this._correctValue(this.state.value);

      const pxValue = this._countPxValueFromValue(this.state.value as number);

      this.mapOfHandlers.set(state.target, { value: this.state.value, pxValue });

      const pxValues = [];
      for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
        pxValues.push(handlerObj.pxValue);
      }
      pxValues.sort((a, b) => a - b);

      this.emit("pxValueDone", {
        target: state.target,
        value: this.state.value,
        values: this.state.values,
        pxValue,
        pxValues,
      });
    }
  }

  private _countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    return (left / ((state.edge / (state.max - state.min)) * state.step)) * state.step + state.min;
  }

  private _countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    return (value - state.min) * (state.edge / (state.max - state.min));
  }

  private _correctValue(value: number): number {
    value = this._correctValueInTheRange(value);
    value = this._correctValueByStep(value);

    return value;
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
