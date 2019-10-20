interface IState {
  [key: string]: number | number[] | HTMLElement;
}

interface IOnlyNumbers {
  [key: string]: number;
}

interface IVisualModel {
  scale: boolean;
  direction: string;
  skin: string;
  bar: boolean;
  tip: boolean;
  type: string;
  settings: boolean;
}

interface ITemp {
  tempPxValue: number;
  tempPxValues: number[];
  tempValue: number;
  tempTarget: HTMLElement;
  values?: number[];
}

interface GState {
  [key: string]: number | string | number[] | HTMLElement;
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
};
