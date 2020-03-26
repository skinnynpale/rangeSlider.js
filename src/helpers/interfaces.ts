import { HandleInterface } from '../View/AbstractFactory/UIs/Handle/Handle';
import { BarInterface } from '../View/AbstractFactory/UIs/Bar/Bar';
import { TipInterface } from '../View/AbstractFactory/UIs/Tip/Tip';
import { Scale } from '../View/AbstractFactory/UIs/Scale/Scale';
import Settings from '../View/AbstractFactory/UIs/Settings/Settings';

interface ModelState {
  min: number;
  max: number;
  step: number;
  values: number[];
}

type Directions = 'horizontal' | 'vertical';
type Types = 'single' | 'interval';
type Steps = Array<{ value: number; px: number }>;

interface VisualState {
  scale: boolean;
  direction: Directions;
  skin: 'green' | 'red';
  bar: boolean;
  tip: boolean;
  type: Types;
  settings: boolean;
}

interface ViewValues {
  pxValue?: number;
  value?: number;
  edge?: number;
  left?: number;
  target?: HTMLElement;
  pxValues?: number[];
  values?: number[];
  handles?: NodeList;
  steps?: Steps;
}

interface OnlyNumbers {
  [key: string]: number;
}

interface GState {
  [key: string]: number | string | number[] | HTMLElement;
}

interface UIs {
  handle?: HandleInterface;
  bar?: BarInterface;
  tip?: TipInterface;
  scale?: Scale;
  settings?: Settings;
}

type EventCallback = (data?: any) => void;

interface Events {
  [key: string]: EventCallback[];
}

type ForMouseMove = {
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
  ForMouseMove,
  Directions,
  Types,
  Steps,
};
