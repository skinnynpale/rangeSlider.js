import Observer from '../Observer/Observer';
import { IOnlyNumbers, IState, ITemp } from '../helpers/interfaces';

class Model extends Observer {
  public state: IState = {};
  private mapOfHandlers: Map<HTMLElement, IOnlyNumbers> = new Map();

  constructor(state: IState = {}) {
    super();
    this.setState(state);
  }

  public setState(state: IState = {}): void {
    const tempState = {};

    Object.assign(tempState, this.correctMinMaxRange(state));
    Object.assign(tempState, this.correctStep(state));
    Object.assign(tempState, this.correctValues(state));

    this.initialCounting(state);
    this.dynamicCounting(state);

    Object.assign(this.state, tempState);
  }

  private getAvailableValue(obj: IState, prop: keyof typeof state) {
    const state = this.state;

    return (obj[prop] === undefined ? this.state[prop] : obj[prop]);
  }

  private correctMinMaxRange(state: IState): {} | undefined {
    if (!(state.min !== undefined || state.max !== undefined)) return;

    let max = this.getAvailableValue(state, 'max') as number;
    let min = this.getAvailableValue(state, 'min') as number;

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return { min, max };
  }

  private correctStep(state: IState): {} | undefined {
    if (!(state.max !== undefined || state.step !== undefined)) return;

    let step = this.getAvailableValue(state, 'step') as number;
    const max = this.getAvailableValue(state, 'max') as number;
    if (step > max) {
      step = max;
    }
    if (step < 1) {
      step = 1;
    }

    return { step };
  }

  private correctValues(state: IState): {} | undefined {
    if (!(state.values)) return;

    const values = (state.values as number[])
      .map(value => this.correctValueInTheRange(value, state))
      .sort((a, b) => a - b);

    return { values };
  }

  private correctValueInTheRange(value: number, state: IState): number {
    const max = this.getAvailableValue(state, 'max') as number;
    const min = this.getAvailableValue(state, 'min') as number;

    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    const step = this.getAvailableValue(state, 'step') as number;
    const offset = min - Math.round(min / step) * step;

    return Math.round(value / step) * step + offset;
  }

  private countArrayOfProgression(state: IState) {
    const max = this.getAvailableValue(state, 'max') as number;
    const min = this.getAvailableValue(state, 'min') as number;
    const step = this.getAvailableValue(state, 'step') as number;

    const arrayOfProgression = [];

    for (let i = min; i <= max; i += step) {
      arrayOfProgression.push(i);
    }

    return arrayOfProgression;
  }

  private initialCounting(state: IState) {
    const isSendStateForInital = state.tempTarget && state.edge && state.tempValue !== undefined;
    if (!isSendStateForInital) return;

    Object.assign(this.state, { edge: state.edge }); // todo fix

    const tempTarget = state.tempTarget as HTMLElement;

    let oldTempValue = this.getAvailableValue(state, 'tempValue') as number;
    oldTempValue = this.correctValueInTheRange(oldTempValue, this.state);
    const oldTempPxValue = this.countPxValueFromValue(oldTempValue);

    const tempValue = this.countValueFromLeft(oldTempPxValue as number);
    const tempPxValue = this.countPxValueFromValue(tempValue);

    this.mapOfHandlers.set(tempTarget, {
      tempPxValue,
      tempValue,
    });

    this.notifyAboutPxValueDone({ tempTarget, tempValue, tempPxValue  });
  }

  private countPxValueFromValue(value: number): number {
    const state = this.state as IOnlyNumbers;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private getRatio(): number {
    const state = this.state as IOnlyNumbers;
    return (state.edge / (state.max - state.min)) * state.step;
  }

  private createArrayOfPxValues(state: IState): {} {
    const values = this.getAvailableValue(state, 'values') as number[];

    return values
      .map(value => this.countPxValueFromValue(value))
      .sort((a, b) => a - b);
  }

  private dynamicCounting(state: IState) {
    const isSendForDynamicCounting = state.tempTarget && state.left;
    if (!isSendForDynamicCounting) return;

    const tempValue = this.countValueFromLeft(state.left as number);
    const tempPxValue = this.countPxValueFromValue(tempValue);
    const tempTarget = state.tempTarget;

    this.mapOfHandlers.set(state.tempTarget as HTMLElement, {
      tempValue,
      tempPxValue,
    });

    Object.assign(this.state, this.updateArrayOfValues()); // todo fix

    this.notifyAboutPxValueDone({ tempValue, tempPxValue, tempTarget });
  }

  private countValueFromLeft(left: number): number {
    const state = this.state as IOnlyNumbers;
    const value = Math.round(left / this.getRatio()) * state.step + state.min;

    return this.correctValueInTheRange(value, this.state);
  }

  private updateArrayOfValues(): {} {
    const values = [];

    for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
      values.push(handlerObj.tempValue);
    }

    values.sort((a, b) => a - b);

    if (this.mapOfHandlers.size === 1) {
      if (this.state.max != null) {
        values[1] = this.state.max;
      }
    }

    return { values };
  }

  private notifyAboutPxValueDone(state: ITemp) {
    this.emit('pxValueDone', {
      tempValue: state.tempValue,
      tempPxValue: state.tempPxValue,
      tempPxValues: this.createArrayOfPxValues(this.state),
      arrayOfProgression: this.countArrayOfProgression(this.state),
      values: this.state.values,
      tempTarget: state.tempTarget,
      edge: this.state.edge,
      ratio: this.getRatio(),
    });
  }
}

export default Model;
