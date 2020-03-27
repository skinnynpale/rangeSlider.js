import Observer from '../Observer/Observer';
import { defaultModel } from './defaultModel';
import { ModelState, OnlyNumbers, ViewValues } from '../helpers/interfaces';

class Model extends Observer {
  public state: ModelState = defaultModel;
  private mapOfHandles: Map<HTMLElement, OnlyNumbers> = new Map();
  private edge = 0;

  constructor(state: ModelState) {
    super();
    this.setState(state);
  }

  public setState(state: ModelState) {
    const { min, max } = this.correctMinMax({ min: state.min, max: state.max });
    const step = this.correctStep({ step: state.step, min, max });
    const values = this.correctValues({ values: state.values, min, max, step });
    this.state = { ...this.state, min, max, step, values };
  }

  public counting(viewValues: ViewValues) {
    this.edge = viewValues.edge || this.edge;
    const value = this.findViewValue(viewValues);
    const pxValue = this.countPxValueFromValue(value);
    const target = viewValues.target;

    if (!target) throw new Error('Не был передан target!');

    this.mapOfHandles.set(target, {
      value,
      pxValue,
    });

    if (viewValues.value === undefined) {
      this.state = { ...this.state, ...this.updateArrayOfValues() };
    }

    this.notifyAboutPxValueDone({ value, pxValue, target });
  }

  private findViewValue(viewValues: ViewValues) {
    let value = 0;

    if (viewValues.value !== undefined) {
      value = viewValues.value;
    } else if (viewValues.left !== undefined) {
      value = this.countValueFromLeft(viewValues.left);
    }

    return value;
  }

  private updateArrayOfValues() {
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

  private countPxValueFromValue(value: number) {
    const state = this.state;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private getRatio() {
    const state = this.state;
    const edge = this.edge;

    const ratio = (edge / (state.max - state.min)) * state.step;

    if (!isFinite(ratio)) {
      return 0;
    }
    return ratio;
  }

  private createArrayOfPxValues() {
    const values = this.state.values;
    return values.map(value => this.countPxValueFromValue(value)).sort((a, b) => a - b);
  }

  private countValueFromLeft(left: number) {
    const state = this.state;
    const value = Math.round(left / this.getRatio()) * state.step + state.min;

    if (left >= this.edge) {
      return this.state.max;
    }

    return this.correctValueInTheRange(value);
  }

  private notifyAboutPxValueDone(state: ViewValues) {
    this.emit('pxValueDone', {
      value: state.value,
      pxValue: state.pxValue,
      pxValues: this.createArrayOfPxValues(),
      steps: this.createSteps(),
      values: this.state.values,
      target: state.target,
      edge: this.edge,
    });
  }

  private correctMinMax(state: { min: number; max: number }) {
    const max = state.max === undefined ? this.state.max : state.max;
    const min = state.min === undefined ? this.state.min : state.min;

    if (min >= max) {
      return { min: max, max: min };
    }

    return { min, max };
  }

  private correctStep(state: { min: number; max: number; step: number }) {
    const step = state.step === undefined ? this.state.step : state.step;
    const { min, max } = state;

    const diff = Math.abs(max - min) || 1;

    if (step > diff) {
      return diff;
    }

    if (step < 1) {
      return 1;
    }

    return step;
  }

  private correctValues(state: { min: number; max: number; values: number[]; step: number }) {
    const values = state.values === undefined ? this.state.values : state.values;
    const newValues = values.map(value => this.correctValueInTheRange(value, state)).sort((a, b) => a - b);

    const { max } = state;
    if (newValues.length === 1) {
      newValues.push(max);
    }

    return newValues;
  }

  private correctValueInTheRange(value: number, state: ModelState = this.state) {
    const { step, min, max } = state;
    const offset = min - Math.round(min / step) * step;
    const newValue = Math.round(value / step) * step + offset;

    if (newValue < min) {
      return min;
    }

    if (newValue > max) {
      return max;
    }

    if (value === max) {
      return max;
    }

    return newValue;
  }

  private createSteps() {
    const { min, max, step } = this.state;
    const pieces = (max - min) / step;
    const result = new Set([min, max]);

    if (pieces >= 15) {
      const percent = (max - min) * 0.2;
      for (let i = min; i <= max; i += percent) {
        result.add(this.correctValueInTheRange(i));
      }
    } else {
      for (let i = min + step; i <= max; i += step) {
        result.add(i);
      }
    }

    return Array.from(result)
      .sort((a, b) => a - b)
      .map(value => ({ value, px: this.countPxValueFromValue(value) }));
  }
}

export default Model;
