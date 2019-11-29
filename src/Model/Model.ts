import Observer from '../Observer/Observer';
import { defaultModel } from '../defaultModel';
import { ModelState, OnlyNumbers, Temp } from '../helpers/interfaces';

class Model extends Observer {
  public state: ModelState = defaultModel;
  private mapOfHandless: Map<HTMLElement, OnlyNumbers> = new Map();
  private edge = 0;

  constructor(state: ModelState) {
    super();
    this.setState(state);
  }

  public setState(state: ModelState): void {
    this.state = { ...this.state, ...this.correctMinMax(state) };
    this.state = { ...this.state, ...this.correctStep(state) };
    this.state = { ...this.state, ...this.correctValues(state) };
  }

  public counting(temp: Temp) {
    this.edge = temp.tempEdge || this.edge;

    const tempValue = this.findTempValue(temp);
    const tempPxValue = this.countPxValueFromValue(tempValue);

    const tempTarget = temp.tempTarget as HTMLElement;
    this.mapOfHandless.set(tempTarget, {
      tempValue,
      tempPxValue,
    });

    if (temp.left !== undefined) {
      this.state = { ...this.state, ...this.updateArrayOfValues() };
    }

    this.notifyAboutPxValueDone({ tempValue, tempPxValue, tempTarget });
  }

  private findTempValue(temp: Temp) {
    if (temp.tempValue !== undefined) {
      return temp.tempValue;
    } else if (temp.left !== undefined) {
      this.state = { ...this.state, ...this.updateArrayOfValues() };
      return this.countValueFromLeft(temp.left);
    }
    return 0;
  }

  private updateArrayOfValues(): {} {
    const values = [];

    for (const handleObj of Array.from(this.mapOfHandless.values())) {
      values.push(handleObj.tempValue);
    }

    values.sort((a, b) => a - b);

    if (this.mapOfHandless.size === 1) {
      if (this.state.max != null) {
        values[1] = this.state.max;
      }
    }

    return { values };
  }

  private countPxValueFromValue(value: number): number {
    const state = this.state;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private getRatio(): number {
    const state = this.state;
    const edge = this.edge;

    const ratio = (edge / (state.max - state.min)) * state.step;

    if (!isFinite(ratio)) {
      return 0;
    }
    return ratio;
  }

  private createArrayOfPxValues(): {} {
    const values = this.state.values;
    return values.map(value => this.countPxValueFromValue(value)).sort((a, b) => a - b);
  }

  private countValueFromLeft(left: number): number {
    const state = this.state;
    const value = Math.round(left / this.getRatio()) * state.step + state.min;

    return this.correctValueInTheRange(value);
  }

  private notifyAboutPxValueDone(state: Temp): void {
    this.emit('pxValueDone', {
      tempValue: state.tempValue,
      tempPxValue: state.tempPxValue,
      tempPxValues: this.createArrayOfPxValues(),
      steps: this.createSteps(),
      values: this.state.values,
      tempTarget: state.tempTarget,
      edge: this.edge,
      ratio: this.getRatio(),
    });
  }

  private correctMinMax(state: ModelState): {} {
    let max = state.max === undefined ? this.state.max : state.max;
    let min = state.min === undefined ? this.state.min : state.min;

    if (min >= max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return { min, max };
  }

  private correctStep(state: ModelState): {} {
    const step = state.step === undefined ? this.state.step : state.step;
    const { min, max } = this.state;

    const diff = Math.abs(max - min) || 1;

    if (step > diff) {
      return { step: diff };
    }

    if (step < 1) {
      return { step: 1 };
    }

    return { step };
  }

  private correctValues(state: ModelState): {} {
    const values = state.values === undefined ? this.state.values : state.values;
    const newValues = values.map(value => this.correctValueInTheRange(value)).sort((a, b) => a - b);

    const { max } = this.state;
    if (newValues.length === 1) {
      newValues.push(max);
    }

    return { values: newValues };
  }

  private correctValueInTheRange(value: number): number {
    const { step, min, max } = this.state;
    const offset = min - Math.round(min / step) * step;
    const newValue = Math.round(value / step) * step + offset;

    if (newValue < min) {
      return min;
    }

    if (newValue > max) {
      return max;
    }

    return newValue;
  }

  private createSteps(): number[] {
    const { min, max, step } = this.state;
    const steps = [];

    for (let i = min; i <= max; i += step) {
      steps.push(i);
    }

    return steps;
  }
}

export default Model;
