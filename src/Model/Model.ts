import Observer from '../Observer/Observer';
import { defaultModel } from '../defaultModel';
import { OnlyNumbers, ModelState, Temp } from '../helpers/interfaces';



class Model extends Observer{
  public state: ModelState = defaultModel;
  private mapOfHandlers: Map<HTMLElement, OnlyNumbers> = new Map();
  private temp: Temp = {};

  constructor(state: ModelState) {
    super();
    this.setState(state);
  }

  public setState(state: ModelState): void {
    console.log('То что приходит в setState' + JSON.stringify(state));

    let tempState = {};

    tempState = {...tempState, ...this.correctMinMax(state)};
    tempState = {...tempState, ...this.correctStep(state)};
    tempState = {...tempState, ...this.correctValues(state)};

    this.state = {...this.state, ...tempState };

    console.log('После обработок в setState' + JSON.stringify(this.state));
  }

  public initialCounting(temp: Temp): void {
    console.log('Пришел initial temp' + JSON.stringify(temp));

    this.temp.tempEdge = temp.tempEdge || this.temp.tempEdge;

    const tempValue = this.correctValueInTheRange(temp.tempValue as number, this.state);
    const tempPxValue = this.countPxValueFromValue(tempValue);

    const tempTarget = temp.tempTarget as HTMLElement;
    this.mapOfHandlers.set(tempTarget, {
      tempPxValue,
      tempValue,
    });
    this.notifyAboutPxValueDone({ tempTarget, tempValue, tempPxValue  });
  }

  public dynamicCounting(temp: Temp): void {
    console.log('Пришел dynamic temp' + JSON.stringify(temp));

    const tempValue = this.countValueFromLeft(temp.left as number);
    const tempPxValue = this.countPxValueFromValue(tempValue);

    const tempTarget = temp.tempTarget as HTMLElement;
    this.mapOfHandlers.set(tempTarget, {
      tempValue,
      tempPxValue,
    });
    this.state = { ...this.state, ...this.updateArrayOfValues() };
    this.notifyAboutPxValueDone({ tempValue, tempPxValue, tempTarget });
  }

  private getAvailableValue(obj: ModelState, prop: keyof typeof state): number | number[] {
    const state = this.state;

    return (obj[prop] === undefined ? state[prop] : obj[prop]);
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

  private countPxValueFromValue(value: number): number {
    const state = this.state;
    return (value - state.min) * (this.getRatio() / state.step);
  }

  private getRatio(): number {
    const state = this.state;
    const edge = this.temp.tempEdge as number;

    return (edge / (state.max - state.min)) * state.step;
  }

  private createArrayOfPxValues(): {} {
    const values = this.state.values;

    return values
      .map(value => this.countPxValueFromValue(value))
      .sort((a, b) => a - b);

  }

  private countValueFromLeft(left: number): number {
    const state = this.state;
    const value = Math.round(left / this.getRatio()) * state.step + state.min;

    return this.correctValueInTheRange(value, this.state);
  }

  private notifyAboutPxValueDone(state: Temp): void {
    console.log('То что отдаем pxValueDone', {
      tempValue: state.tempValue,
      tempPxValue: state.tempPxValue,
      tempPxValues: this.createArrayOfPxValues(),
      arrayOfProgression: this.countArrayOfProgression(this.state),
      values: this.state.values,
      tempTarget: state.tempTarget,
      edge: this.temp.tempEdge,
      ratio: this.getRatio(),
    });
    this.emit('pxValueDone', {
      tempValue: state.tempValue,
      tempPxValue: state.tempPxValue,
      tempPxValues: this.createArrayOfPxValues(),
      arrayOfProgression: this.countArrayOfProgression(this.state),
      values: this.state.values,
      tempTarget: state.tempTarget,
      edge: this.temp.tempEdge,
      ratio: this.getRatio(),
    });
  }

  private correctMinMax(state: ModelState): {} {
    let max = this.getAvailableValue(state, "max");
    let min = this.getAvailableValue(state, "min");

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return { min, max };
  }

  private correctStep(state: ModelState): {} {
    let step = this.getAvailableValue(state, "step");
    const max = this.getAvailableValue(state, "max") as number;
    const min = this.getAvailableValue(state, "min") as number;

    if (step > max) {
      step = max;
    }

    const diff = max - min;
    if (step > diff) {
      step = diff;
    }

    if (step < 1) {
      step = 1;
    }

    return { step };
  }

  private correctValues(state: ModelState): {} {
    let values = this.getAvailableValue(state, 'values') as number[];

    values = values
      .map(value => this.correctValueInTheRange(value, state))
      .sort((a, b) => a - b);

    if (values.length === 1) {
      console.log(state.max);
      values.push(state.max);
    }

    return { values };
  }

  private correctValueInTheRange(value: number, state: ModelState): number {
    const max = this.getAvailableValue(state, "max") as number;
    const min = this.getAvailableValue(state, "min") as number;
    const step = this.getAvailableValue(state, "step") as number;
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

  private countArrayOfProgression(state: ModelState): number[] {
    const max = this.getAvailableValue(state, 'max') as number;
    const min = this.getAvailableValue(state, 'min') as number;
    const step = this.getAvailableValue(state, 'step') as number;

    const arrayOfProgression = [];

    for (let i = min; i <= max; i += step) {
      arrayOfProgression.push(i);
    }

    return arrayOfProgression;
  }
}

export default Model;
