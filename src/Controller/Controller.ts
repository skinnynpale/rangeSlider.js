import { Model } from "../Model/Model";
import { VisualModel } from "../Model/VisualModel";
import { ApplicationConfigurator, Application } from "../View/AbstractFactory/Application";
import { IVisualModel, ITemp, IState } from "../helpers/interfaces";

class Controller {
  private model!: Model;
  private visualModel!: VisualModel;
  private app!: Application;

  constructor(private anchor: HTMLElement, private settingsVisualModel: IVisualModel, private settingsModel: IState) {
    this.initMVC(settingsVisualModel, settingsModel);
  }

  private initMVC(settingsVisualModel: IVisualModel, settingsModel: IState) {
    this.model = new Model();
    this.visualModel = new VisualModel();
    this.visualModel.setState(settingsVisualModel);
    this.model.setState(settingsModel);

    this.app = new ApplicationConfigurator().main(this.visualModel.state, this.anchor);
    this.app.createUI(this.visualModel.state);
    this._bindEvents();
    this.app.init(this.visualModel.state as IVisualModel);
  }

  private _bindEvents() {
    // Начальная расстановка бегунков
    this.app.on("finishInit", (obj: {}) => this._arrangeHandlers(obj));

    // Основая отрисовка
    this.app.on("onUserMove", (obj: {}) => this.model.setState(obj));
    this.model.on("pxValueDone", (obj: ITemp) => this.app.paint(obj));

    // События для плагина
    this.model.on("pxValueDone", (obj: ITemp) => this.anchor.dispatchEvent(
      new CustomEvent("onChange", { detail: this.model.state }),
    ));

    // Синхронизация настроек и состояния
    this.app.settings &&
    this.app.settings.on("newSettings", (obj: {}) => {
      this.model.setState(obj);
      this._arrangeHandlers(obj);
    });

    // Отрисовка настроек
    this.model.on(
      "newState",
      (state: {}) => this.app.settings &&
        this.app.settings.paint({ ...state, ...this.visualModel.state }),
    );

    // Пересоздать слайдер
    this.app.settings &&
    this.app.settings.on("reCreateApp", (newVisualModel: IVisualModel) => this.reCreateApplication(newVisualModel));
  }

  // Начальная расстановка бегунков
  private _arrangeHandlers({ edge, handlers }: any) {
    for (let i = 0; i < handlers.length; i += 1) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      });
    }
  }

  private reCreateApplication(newVisualModel: IVisualModel) {
    const settingsVisualModel = Object.assign(this.settingsVisualModel, newVisualModel);
    const settingsModel = this.saveOldModel(this.settingsModel, this.model.state);

    this.app.removeHTML();
    this.initMVC(settingsVisualModel, settingsModel);
  }

  private saveOldModel(target: any, obj: any) {
    for (const prompt in target) {
      target[prompt] = obj[prompt];
    }
    return target;
  }
}

export { Controller };
