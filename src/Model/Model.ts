import { Observer } from "../Observer/Observer";
import { VisualModel } from "./VisualModel";

interface IState {
  [key: string]: number | number[];
}
interface IOnlyNumbers {
  [key: string]: number;
}

class Model extends Observer {
  public state: IState = {};
  private mapOfHandlers: Map<HTMLElement, IOnlyNumbers> = new Map();

  constructor(state = {}) {
    super();

    this.setState(state);
  }

  public setState(state: any = {}): void {
    Object.assign(this.state, state);

    // для корректировки основных значений
    if (state.min || state.max || state.step) {
      this._correctMinMaxRange();
      this._correctStep();
      this.state.values = (this.state.values as number[]).map(value => this._correctValue(value)).sort((a, b) => a - b);
    }

    // для начальной отрисовки
    if (state.tempTarget && state.edge && state.tempValue) {
      this.state.tempPxValue = this._countPxValueFromValue(state.tempValue as number);
      this._createArrayOfPxValues(this.state.values as number[]);

      this.mapOfHandlers.set(state.tempTarget, {
        tempValue: state.tempValue,
        tempPxValue: this.state.tempPxValue,
      });
    }

    // для отрисовки от действий пользователя
    if (state.tempTarget && state.left) {
      this.state.tempValue = this._countValueFromLeft(state.left);
      this.state.tempPxValue = this._countPxValueFromValue(this.state.tempValue as number);

      this.mapOfHandlers.set(state.tempTarget, {
        tempValue: this.state.tempValue,
        tempPxValue: this.state.tempPxValue,
      });
      this._updateArrayOfValues();
      this._createArrayOfPxValues(this.state.values as number[]);
    }
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
    });
  }

  private _countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    const value = (left / ((state.edge / (state.max - state.min)) * state.step)) * state.step + state.min;
    return this._correctValue(value);
  }

  private _countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    const tempPxValue = (value - state.min) * (state.edge / (state.max - state.min));
    return tempPxValue;
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
