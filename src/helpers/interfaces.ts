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

type directions = 'horizontal' | 'vertical';
type types = 'single' | 'interval';

interface VisualState {
  scale?: boolean;
  direction?: directions;
  skin?: 'green' | 'red';
  bar?: boolean;
  tip?: boolean;
  type?: types;
  settings?: boolean;
}

interface ViewValues {
  pxValue?: number;
  value?: number;
  edge?: number;
  left?: number;
  target?: HTMLElement;
  pxValues?: number[];
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

type EventCallback = (data?: any) => void;

interface Events {
  [key: string]: EventCallback[];
}

type forMouseMove = {
  shiftX: number;
  shiftY: number;
  data: { wrapper: HTMLElement; state: VisualState };
  target: HTMLElement;
};

export {
  OnlyNumbers,
  VisualState,
  GState,
  UIs,
  Events,
  EventCallback,
  ModelState,
  ViewValues,
  forMouseMove,
  directions,
  types,
};
