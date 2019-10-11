import { Observer } from "./Observer/Observer";
import { Controller } from "./Controller/Controller";

const settingsVisualModel = {
  direction: "horizontal",
  skin: "red",
  bar: true,
  tip: true,
  type: "interval",
  scale: true,
  settings: true,
};

const settingsModel = {
  min: 10,
  max: 50,
  values: [20, 40],
  step: 2,
};

export class App extends Observer {
  private controller: Controller;
  constructor(anchor: HTMLElement) {
    super();
    this.controller = new Controller(anchor, settingsVisualModel, settingsModel);
  }
}
