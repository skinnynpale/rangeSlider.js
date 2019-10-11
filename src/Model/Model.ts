import { Observer } from "../Observer/Observer";
import { IOnlyNumbers, IState } from "../helpers/interfaces";

class Model extends Observer {
  public state: IState = {};
  private mapOfHandlers: Map<HTMLElement, IOnlyNumbers> = new Map();

  constructor(state: IState = {}) {
    super();
    this.setState(state);
  }

  public setState(state: IState = {}): void {
    Object.assign(this.state, state);

    // для корректировки основных значений
    if (state.min || state.max || state.step || state.values) {
      this._correctMinMaxRange();
      this._correctStep();
      this.state.values = (this.state.values as number[]).map(value => this._correctValue(value)).sort((a, b) => a - b);
    }

    // для начальной отрисовки
    if (state.tempTarget && state.edge && state.tempValue) {
      this._initialCounting(state);
    }

    // для отрисовки действий пользователя
    if (state.tempTarget && state.left) {
      this._dynamicCounting(state);
    }

    console.log(this.state);

    this.emit("newState", this.state);
  }

  private _initialCounting(state: IState) {
    this.state.tempPxValue = this._countPxValueFromValue(state.tempValue as number);
    this._createArrayOfPxValues(this.state.values as number[]);

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue: state.tempValue as number,
      tempPxValue: this.state.tempPxValue,
    });
  }

  private _dynamicCounting(state: IState) {
    this.state.tempValue = this._countValueFromLeft(state.left as number);
    this.state.tempPxValue = this._countPxValueFromValue(this.state.tempValue as number);

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
    });
    this._updateArrayOfValues();
    this._createArrayOfPxValues(this.state.values as number[]);
  }

  private _updateArrayOfValues(): void {
    this.state.values = [];
    for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
      this.state.values.push(handlerObj.tempValue);
    }
    this.state.values.sort((a, b) => a - b);
  }

  private _createArrayOfPxValues(array: number[]): void {
    const tempPxValues = array.map(value => this._countPxValueFromValue(value)).sort((a, b) => a - b);

    this.emit("pxValueDone", {
      tempTarget: this.state.tempTarget,
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
      tempPxValues,
      edge: this.state.edge,
      ratio: this._getRatio(),
    });
  }

  private _countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    const value = (left / this._getRatio()) * state.step + state.min;
    return this._correctValue(value);
  }

  private _countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    return (value - state.min) * (this._getRatio() / state.step);
  }

  private _correctValue(value: number): number {
    value = this._correctValueInTheRange(value);

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
    const min = this._correctValueByStep(+this.state.min, "ceil");
    const max = this._correctValueByStep(+this.state.max, "floor");

    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return this._correctValueByStep(value);
    }
  }

  private _correctValueByStep(value: number, how?: string): number {
    const step = this.state.step as number;

    if (how === "ceil") {
      return Math.ceil(value / step) * step;
    }
    if (how === "floor") {
      return Math.floor(value / step) * step;
    } else {
      return Math.round(value / step) * step;
    }
  }

  private _getRatio(): number {
    const state = this.state as IOnlyNumbers;
    return +(state.edge / (state.max - state.min)) * state.step;
  }
}

export { Model, IState };
