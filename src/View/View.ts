import { Observer } from "../Observer/Observer";
import { constants } from "../constants";
import { IVisualModel } from "../Model/VisualModel";

interface ITemp {
  tempPxValue: number;
  tempPxValues: number[];
  tempValue: number;
  tempTarget: HTMLElement;
}

class View extends Observer {}

export { View, ITemp };
