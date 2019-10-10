import { Model } from "../Model/Model";
import { ITemp, View } from "../View/View";
import { IVisualModel, VisualModel } from "../Model/VisualModel";
import { ApplicationConfigurator, Application } from "../View/AbstractFactory/AbstractFactory";

class Controller {
  private model = new Model();
  private visualModel = new VisualModel();
  private app!: Application;
  private view: View = new View();

  constructor(anchor: HTMLElement) {
    this.view = new View(anchor);

    this.visualModel.setState({
      direction: "vertical",
      skin: "green",
      bar: true,
      tip: true,
      type: "double",
    });

    this.model.setState({
      min: 10,
      max: 100,
      values: [50, 100],
      step: 2,
    });

    this.app = new ApplicationConfigurator().main(this.visualModel.state);
    this.app.createUI(this.visualModel.state, anchor);
    this.app.init(this.visualModel.state as IVisualModel, anchor);

    this._bindEvents();

    this.visualModel.setState({}); // для катализатора запуска
  }

  private _bindEvents() {
    this.visualModel.on("newVisualModel", (state: {}) => this.view.update(state as IVisualModel));
    this.view.on("finishRenderTemplate", (wrapper: HTMLElement) => this._arrangeHandlers(wrapper));
    this.model.on("pxValueDone", (obj: {}) => this.app.paint(obj));
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
