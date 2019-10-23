import { Handler } from '../View/AbstractFactory/UIs/Handler/Handler';
import { Bar } from '../View/AbstractFactory/UIs/Bar/Bar';
import { Tip } from '../View/AbstractFactory/UIs/Tip/Tip';
import { Scale } from '../View/AbstractFactory/UIs/Scale/Scale';
import Settings from '../View/AbstractFactory/UIs/Settings/Settings';

interface IState extends ITemp {
  min?: number;
  max?: number;
  step?: number;
  edge?: number;
  left?: number;
  handlers?: NodeList[];
  arrayOfProgression?: number[];
  ratio?: number;
}

interface IOnlyNumbers {
  [key: string]: number;
}

interface IVisualModel {
  scale?: boolean;
  direction?: 'horizontal' | 'vertical';
  skin?: 'green' | 'red';
  bar?: boolean;
  tip?: boolean;
  type?: 'single' | 'interval';
  settings?: boolean;
}

interface ITemp {
  tempPxValue?: number;
  tempPxValues?: number[];
  tempValue?: number;
  tempTarget?: HTMLElement;
  values?: number[];
}

interface GState {
  [key: string]: number | string | number[] | HTMLElement;
}

interface UIs {
  handler?: Handler;
  bar?: Bar;
  tip?: Tip;
  scale?: Scale;
  settings?: Settings;
}

interface IOnlyBoolean {
  [key: string]: boolean;
}

interface IOnlyString {
  [key: string]: string;
}

interface IOnlyHTMLElements {
  [key: string]: HTMLElement;
}

export {
  IState,
  IOnlyNumbers,
  IVisualModel,
  ITemp,
  IOnlyBoolean,
  IOnlyString,
  IOnlyHTMLElements,
  GState,
  UIs,
};
