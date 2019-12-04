import Observer from '../Observer/Observer';
import { defaultModel } from '../defaultModel';
import { ModelState, OnlyNumbers, Temp } from '../helpers/interfaces';

class Model extends Observer {
  public state: ModelState = defaultModel;
  mapOfHandles: Map<HTMLElement, OnlyNumbers> = new Map();
  private edge = 0;

  constructor(state: ModelState) {
    super();
    this.setState(state);
  }

  public setState(state: ModelState) {
    this.state = { ...this.state, ...this.correctMinMax(state) };
    this.state = { ...this.state, ...this.correctStep(state) };
    this.state = { ...this.state, ...this.correctValues(state) };
  }

  public counting(temp: Temp) {
    this.edge = temp.edge || this.edge;

    const value = this.findTempValue(temp);
    const pxValue = this.countPxValueFromValue(value);

    const target = temp.target as HTMLElement;
    this.mapOfHandles.set(target, {
      value,
      pxValue,
    });

    if (temp.left !== undefined) {
      this.state = { ...this.state, ...this.updateArrayOfValues() };
    }

    this.notifyAboutPxValueDone({ value, pxValue, target });
  }

  private findTempValue(temp: Temp) {
    if (temp.value !== undefined) {
      return temp.value;
    } else if (temp.left !== undefined) {
      return this.countValueFromLeft(temp.left);
    }
    return 0;
  }

  private updateArrayOfValues(): {} {
    const values = [];

    for (const handleObj of Array.from(this.mapOfHandles.values())) {
      values.push(handleObj.value);
    }

    values.sort((a, b) => a - b);

    if (this.mapOfHandles.size === 1) {
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
      value: state.value,
      pxValue: state.pxValue,
      pxValues: this.createArrayOfPxValues(),
      steps: this.createSteps(),
      values: this.state.values,
      target: state.target,
      edge: this.edge,
      ratio: this.getRatio(),
    });
  }

  private correctMinMax(state: ModelState) {
    const max = state.max === undefined ? this.state.max : state.max;
    const min = state.min === undefined ? this.state.min : state.min;

    if (min >= max) {
      return { min: max, max: min };
    }

    return { min, max };
  }

  private correctStep(state: ModelState) {
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

  private correctValues(state: ModelState) {
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
