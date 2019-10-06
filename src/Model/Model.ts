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

    if (state.min || state.max || state.step) {
      this._correctMinMaxRange();
      this._correctStep();
    }

    if (state.values) {
      this.state.values = (this.state.values as number[]).map(value => this._correctValue(value)).sort();
    }

    // для начальной отрисовки
    if (state.tempTarget && state.edge && state.tempValue) {
      // высчитываем tempPxValue от переданного value
      const tempPxValue = this._countPxValueFromValue(this.state.tempValue as number);

      // высчитываем массив tempPxValues для правильного отображения bar
      const tempPxValues = (this.state.values as number[]).map(value => this._countPxValueFromValue(value));

      // записываем результаты в нашу карту
      this.mapOfHandlers.set(state.tempTarget, {
        tempValue: state.tempValue,
        tempPxValue,
      });

      this.emit("pxValueDone", {
        tempTarget: this.state.tempTarget,
        tempValue: this.state.tempValue,
        tempPxValue,
        tempPxValues,
      });
    }

    // для отрисовки от действий пользователя
    if (state.tempTarget && state.left) {
      // высчитываем tempValue от переданного userLeft
      this.state.tempValue = this._countValueFromLeft(state.left);

      // Корректируем его
      this.state.tempValue = this._correctValue(this.state.tempValue);

      // Высчитываем сколько px для этого value нужно
      const tempPxValue = this._countPxValueFromValue(this.state.tempValue as number);

      // записываем новый результат в нашу карту заменяя старые значения
      this.mapOfHandlers.set(state.tempTarget, { tempValue: this.state.tempValue, tempPxValue });

      // берем из карты из всех бегунков value и перезаписываем массив значений
      this.state.values = [];
      for (const handlerObj of Array.from(this.mapOfHandlers.values())) {
        this.state.values.push(handlerObj.tempValue);
      }
      this.state.values.sort((a, b) => a - b);

      // высчитываем массив tempPxValues для правильного отображения bar
      const tempPxValues = (this.state.values as number[]).map(value => this._countPxValueFromValue(value));

      this.emit("pxValueDone", {
        tempTarget: state.tempTarget,
        tempValue: this.state.tempValue,
        tempPxValue,
        tempPxValues,
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
