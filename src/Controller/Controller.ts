import { Model } from "../Model/Model";
import { VisualModel } from "../Model/VisualModel";
import { ApplicationConfigurator, Application } from "../View/AbstractFactory/Application";
import { IVisualModel, ITemp } from "../helpers/interfaces";

class Controller {
  private model = new Model();
  private visualModel = new VisualModel();
  private app!: Application;

  constructor(public anchor: HTMLElement) {
    this.visualModel.setState({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "interval",
    });

    this.model.setState({
      min: 10,
      max: 100,
      values: [50, 85],
      step: 2,
    });

    this.app = new ApplicationConfigurator().main(this.visualModel.state, anchor);
    this.app.createUI(this.visualModel.state);

    this._bindEvents();

    this.visualModel.setState({}); // для катализатора запуска
  }

  private _bindEvents() {
    this.visualModel.on("newVisualModel", (state: {}) => this.app.init(state as IVisualModel));
    this.app.on("finishInit", (obj: {}) => this._arrangeHandlers(obj));
    this.model.on("pxValueDone", (obj: ITemp) => this.app.paint(obj));
    this.app.on("onUserMove", (obj: {}) => this.model.setState(obj));
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
