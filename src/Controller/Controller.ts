import Model from '../Model/Model';
import VisualModel from '../Model/VisualModel';
import { Application, ApplicationConfigurator } from '../View/AbstractFactory/Application';
import { IState, ITemp, IVisualModel } from '../helpers/interfaces';

class Controller {
  private model!: Model;
  private visualModel!: VisualModel;
  private app!: Application;

  constructor(
    private anchor: HTMLElement,
    private settingsVisualModel: IVisualModel,
    private settingsModel: IState,
  ) {
    this.initMVC(settingsVisualModel, settingsModel);
  }

  private initMVC(settingsVisualModel: IVisualModel, settingsModel: IState) {
    this.model = new Model();
    this.visualModel = new VisualModel();
    this.visualModel.setState(settingsVisualModel);
    this.model.setState(settingsModel);

    this.app = new ApplicationConfigurator().main(this.visualModel.state, this.anchor);
    this.app.createUI(this.visualModel.state);
    this.bindEvents();
    this.app.init(this.visualModel.state as IVisualModel);
  }

  private bindEvents() {
    this.app.on('finishInit', (obj: {}) => this.arrangeHandlers(obj));

    this.model.on('pxValueDone', (obj: ITemp) => this.app.paint(obj));
    this.app.on('onUserMove', (obj: {}) => this.model.setState(obj));

    // Синхронизация настроек и состояния
    this.app.UIs.settings &&
      this.app.UIs.settings.on('newSettings', (obj: IState) => {
        this.model.setState(obj);
        this.arrangeHandlers(obj);

        if (obj.step) {
          this.reCreateApplication(this.visualModel.state as IVisualModel);
        }
      });

    // Отрисовка настроек
    this.model.on(
      'pxValueDone',
      () =>
        this.app.UIs.settings &&
        this.app.UIs.settings.paint({ ...this.model.state, ...this.visualModel.state }),
    );

    // Пересоздать слайдер
    this.app.UIs.settings &&
      this.app.UIs.settings.on('reCreateApp', (newVisualModel: IVisualModel) =>
        this.reCreateApplication(newVisualModel),
      );

    // События для плагина
    this.model.on('pxValueDone', () =>
      this.anchor.dispatchEvent(new CustomEvent('onChange', { detail: this.model.state })),
    );

    // Нажатия по значениям на шкале
    this.app.UIs.scale &&
      this.app.UIs.scale.on('newValueFromScale', (obj: IState) => {
        this.model.setState(obj);
        this.arrangeHandlers(obj);
      });
  }

  // Расстановка бегунков
  private arrangeHandlers({ edge, handlers }: any) {
    for (let i = 0; i < handlers.length; i += 1) {
      this.model.setState({
        edge: edge ? edge : this.model.state.edge,
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

  private saveOldModel(target: IState, obj: IState) {
    for (const prop in target) {
      target[prop] = obj[prop];
    }
    return target;
  }
}

export default Controller;
