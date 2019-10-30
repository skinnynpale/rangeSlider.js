import Observer from '../Observer/Observer';
import { IOnlyNumbers, IState } from '../helpers/interfaces';

class Model extends Observer {
  public state: IState = {};
  private mapOfHandlers: Map<HTMLElement, IOnlyNumbers> = new Map();

  constructor(state: IState = {}) {
    super();
    this.setState(state);
  }

  public setState(state: IState = {}): void {
    Object.assign(this.state, state);

    this.correctMainValues(state);
    this.initialCounting(state);
    this.dynamicCounting(state);
  }

  private correctMainValues(state: IState) {
    const isSendMainValues =
      state.min !== undefined || state.max !== undefined || state.step !== undefined || state.values;

    if (!isSendMainValues) return;

    this.correctMinMaxRange();
    this.correctStep();
    this.correctValues();
  }

  private initialCounting(state: IState) {
    const isSendStateForInital = state.tempTarget && state.edge && state.tempValue !== undefined;
    if (!isSendStateForInital) return;

    this.state.tempPxValue = this.countPxValueFromValue(state.tempValue as number);
    this.createArrayOfPxValues(this.state.values as number[]);

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue: state.tempValue as number,
      tempPxValue: this.state.tempPxValue,
    });
  }

  private dynamicCounting(state: IState) {
    if (!(state.tempTarget && state.left)) return;

    this.state.tempValue = this.countValueFromLeft(state.left);
    this.state.tempPxValue = this.countPxValueFromValue(this.state.tempValue);

    this.mapOfHandlers.set(state.tempTarget, {
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
    });
    this.updateArrayOfValues();
    this.createArrayOfPxValues(this.state.values as number[]);
  }

  private correctValues() {
    this.state.values = (this.state.values as number[])
      .map(value => this.correctValueInTheRange(value))
      .sort((a, b) => a - b);
  }

  private updateArrayOfValues(): void {
    this.state.values = [];
    for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
      this.state.values.push(handlerObj.tempValue);
    }
    this.state.values.sort((a, b) => a - b);

    if (this.mapOfHandlers.size === 1) {
      if (this.state.max != null) {
        this.state.values[1] = this.state.max;
      }
    }
  }

  private createArrayOfPxValues(array: number[]): void {
    const tempPxValues = array
      .map(value => this.countPxValueFromValue(value))
      .sort((a, b) => a - b);

    this.emit('pxValueDone', {
      tempPxValues,
      arrayOfProgression: this.countArrayOfProgression(),
      values: this.state.values,
      tempTarget: this.state.tempTarget,
      tempValue: this.state.tempValue,
      tempPxValue: this.state.tempPxValue,
      edge: this.state.edge,
      ratio: this.getRatio(),
    });
  }

  private countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    const value = Math.round(left / this.getRatio()) * state.step + state.min;

    return this.correctValueInTheRange(value);
  }

  private countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private correctMinMaxRange(): void {
    if (!(this.state.min !== undefined && this.state.max !== undefined)) return;

    if (this.state.min > this.state.max) {
      const temp = this.state.min;
      this.state.min = this.state.max;
      this.state.max = temp;
    }
  }

  private correctStep(): void {
    if (!(this.state.max !== undefined && this.state.step !== undefined)) return;

    this.state.step > this.state.max ? (this.state.step = this.state.max) : '';
    this.state.step < 1 ? (this.state.step = 1) : '';
  }

  private correctValueInTheRange(value: number): number {
    if (!(this.state.min !== undefined && this.state.max !== undefined)) return value;

    if (value < this.state.min) {
      return this.state.min;
    }

    if (value > this.state.max) {
      return this.state.max;
    }

    return value;
  }

  private getRatio(): number {
    const state = this.state as IOnlyNumbers;
    return (state.edge / (state.max - state.min)) * state.step;
  }

  private countArrayOfProgression() {
    if (
      !(
        this.state.min !== undefined &&
        this.state.max !== undefined &&
        this.state.step !== undefined
      )
    )
      return;
    this.correctMainValues(this.state);
    const arrayOfProgression = [];

    for (let i = this.state.min; i <= this.state.max; i += this.state.step) {
      arrayOfProgression.push(i);
    }

    return arrayOfProgression;
  }
}

export default Model;
