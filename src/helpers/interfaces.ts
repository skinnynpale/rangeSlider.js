interface IState {
  [key: string]: number | number[] | HTMLElement;
}

interface IOnlyNumbers {
  [key: string]: number;
}

interface IVisualModel {
  direction: string;
  skin: string;
  bar: boolean;
  tip: boolean;
  type: string;
}

interface ITemp {
  tempPxValue: number;
  tempPxValues: number[];
  tempValue: number;
  tempTarget: HTMLElement;
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

export { IState, IOnlyNumbers, IVisualModel, ITemp, IOnlyBoolean, IOnlyString, IOnlyHTMLElements };
