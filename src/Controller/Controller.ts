import { Model } from "../Model/Model";
import { ITemp, View } from "../View/View";
import { IVisualModel, VisualModel } from "../Model/VisualModel";

class Controller {
  private model = new Model();
  private visualModel = new VisualModel();
  private view: View = new View();

  constructor(anchor: HTMLElement) {
    this.view = new View(anchor);
    this._bindEvents();

    this.model.setState({
      min: 10,
      max: 100,
      values: [90],
      step: 2,
    });
    this.visualModel.setState({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "single",
    });
  }

  private _bindEvents() {
    this.visualModel.on("newVisualModel", (state: {}) => this.view.update(state as IVisualModel));
    this.view.on("finishRenderTemplate", (wrapper: HTMLElement) => this._arrangeHandlers(wrapper));
    this.model.on("pxValueDone", (obj: {}) => this.view.update(obj as ITemp));
    this.view.on("onUserMove", (obj: {}) => this.model.setState(obj));
  }

  // Начальная расстановка бегунков
  private _arrangeHandlers({ edge, handlers }: any) {
    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      });
    }
  }
}

export { Controller };
