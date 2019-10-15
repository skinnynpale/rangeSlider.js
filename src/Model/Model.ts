import Observer from "../Observer/Observer";
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
      this.correctMinMaxRange();
      this.correctStep();
      this.state.values = (this.state.values as number[])
        .map(value => this.correctValue(value))
        .sort((a, b) => a - b);
    }

    // для начальной отрисовки
    if (state.tempTarget && state.edge && state.tempValue) {
      this.initialCounting(state);
    }

    // для отрисовки действий пользователя
    if (state.tempTarget && state.left) {
      this.dynamicCounting(state);
    }

    this.emit("newState", this.state);
  }

  private initialCounting(state: IState) {
    this.state.tempPxValue = this.countPxValueFromValue(state.tempValue as number);
    this.createArrayOfPxValues(this.state.values as number[]);

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue: state.tempValue as number,
      tempPxValue: this.state.tempPxValue,
    });
  }

  private dynamicCounting(state: IState) {
    this.state.tempValue = this.countValueFromLeft(state.left as number);
    this.state.tempPxValue = this.countPxValueFromValue(this.state.tempValue as number);

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
    });
    this.updateArrayOfValues();
    this.createArrayOfPxValues(this.state.values as number[]);
  }

  private updateArrayOfValues(): void {
    this.state.values = [];
    for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
      this.state.values.push(handlerObj.tempValue);
    }
    this.state.values.sort((a, b) => a - b);

    if (this.mapOfHandlers.size === 1) {
      this.state.values[1] = this.state.max as number;
    }
  }

  private createArrayOfPxValues(array: number[]): void {
    const tempPxValues = array
      .map(value => this.countPxValueFromValue(value))
      .sort((a, b) => a - b);

    this.emit("pxValueDone", {
      tempPxValues,
      tempTarget: this.state.tempTarget,
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
      edge: this.state.edge,
      ratio: this.getRatio(),
    });
  }

  private countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    const value = (left / this.getRatio()) * state.step + state.min;
    return this.correctValue(value);
  }

  private countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private correctValue(value: number): number {
    value = this.correctValueInTheRange(value);
    return value;
  }

  private correctMinMaxRange(): void {
    if (this.state.min > this.state.max) {
      const temp = this.state.min;
      this.state.min = this.state.max;
      this.state.max = temp;
    }
  }

  private correctStep(): void {
    this.state.step < 1 ? (this.state.step = 1) : "";
    this.state.step > this.state.max ? (this.state.step = this.state.max) : "";
  }

  private correctValueInTheRange(value: number): number {
    return this.isValueInTheRange(value);
  }

  private isValueInTheRange(value: number): number {
    const min = this.correctValueByStep(+this.state.min, "ceil");
    const max = this.correctValueByStep(+this.state.max, "floor");

    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return this.correctValueByStep(value);

  }

  private correctValueByStep(value: number, how?: string): number {
    const step = this.state.step as number;

    if (how === "ceil") {
      return Math.ceil(value / step) * step;
    }
    if (how === "floor") {
      return Math.floor(value / step) * step;
    }
    return Math.round(value / step) * step;

  }

  private getRatio(): number {
    const state = this.state as IOnlyNumbers;
    return +(state.edge / (state.max - state.min)) * state.step;
  }
}

export { Model, IState };
