import { Handle } from '../View/AbstractFactory/UIs/Handle/Handle';
import { Bar } from '../View/AbstractFactory/UIs/Bar/Bar';
import { Tip } from '../View/AbstractFactory/UIs/Tip/Tip';
import { Scale } from '../View/AbstractFactory/UIs/Scale/Scale';
import Settings from '../View/AbstractFactory/UIs/Settings/Settings';

interface ModelState {
  min: number;
  max: number;
  step: number;
  values: number[];
}

interface CalculatedFromModelState {
  ratio: number;
  steps: number[];
}

interface VisualState {
  scale?: boolean;
  direction?: 'horizontal' | 'vertical';
  skin?: 'green' | 'red';
  bar?: boolean;
  tip?: boolean;
  type?: 'single' | 'interval';
  settings?: boolean;
}

interface Temp {
  tempPxValue?: number;
  tempValue?: number;
  tempEdge?: number;
  left?: number;
  tempTarget?: HTMLElement;
  tempPxValues?: number[];
  values?: number[];

}


interface OnlyNumbers {
  [key: string]: number;
}

interface GState {
  [key: string]: number | string | number[] | HTMLElement;
}

interface UIs {
  handle?: Handle;
  bar?: Bar;
  tip?: Tip;
  scale?: Scale;
  settings?: Settings;
}

type EventCallback = (data?: {}) => void;

interface Events {
  [key: string]: EventCallback[];
}

type forMouseMove = {
  shiftX: number;
  shiftY: number;
  data: { wrapper: HTMLElement; state: VisualState };
  tempTarget: HTMLElement;
};

export {
  OnlyNumbers,
  VisualState,
  GState,
  UIs,
  Events,
  EventCallback,
  ModelState,
  Temp,
  CalculatedFromModelState,
  forMouseMove
};
