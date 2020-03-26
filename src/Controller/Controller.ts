import { ModelState, ViewValues, VisualState } from '../helpers/interfaces';
import Model from '../Model/Model';
import VisualModel from '../Model/VisualModel';
import App from '../View/AbstractFactory/App';
import AppConfigurator from '../View/AbstractFactory/AppConfigurator/AppConfigurator';

class Controller {
  private model: Model;
  private visualModel: VisualModel;
  private app: App;

  constructor(private anchor: HTMLElement, settingsVisualModel: VisualState, private settingsModel: ModelState) {
    this.model = new Model(settingsModel);
    this.visualModel = new VisualModel(settingsVisualModel);

    this.app = new AppConfigurator().main(this.visualModel.state, this.anchor);
    this.app.createUI(this.visualModel.state);
    this.bindEvents();
    this.app.init(this.visualModel.state);
  }

  private bindEvents() {
    this.app.on('finishInit', obj => this.arrangeHandles(obj));
    this.model.on('pxValueDone', obj => this.app.paint(obj));
    this.app.on('onUserMove', obj => this.model.counting(obj));

    // Синхронизация настроек и состояния
    this.app.UIs.settings &&
      this.app.UIs.settings.on('newSettings', obj => {
        this.model.setState(obj);
        this.arrangeHandles(obj);

        if (obj.step) {
          this.reCreateApplication();
        }
      });

    // Отрисовка настроек
    this.model.on(
      'pxValueDone',
      () => this.app.UIs.settings && this.app.UIs.settings.setState(this.model.state, this.visualModel.state),
    );

    // Пересоздать слайдер
    this.app.UIs.settings &&
      this.app.UIs.settings.on('reCreateApp', newVisualModel => {
        this.visualModel.setState(newVisualModel);
        this.reCreateApplication();
      });

    // События для плагина
    this.model.on('pxValueDone', () =>
      this.anchor.dispatchEvent(new CustomEvent('onChange', { detail: this.model.state })),
    );

    // Нажатия по значениям на шкале
    this.app.UIs.scale &&
      this.app.UIs.scale.on('newValueFromScale', obj => {
        this.model.setState(obj);
        this.arrangeHandles(obj);
      });
  }

  // Расстановка бегунков
  private arrangeHandles({ edge, handles }: ViewValues) {
    if (!handles) return;

    for (let i = 0; i < handles.length; i += 1) {
      this.model.counting({
        edge: edge,
        target: handles[i] as HTMLElement,
        value: this.model.state.values[i],
      });
    }
  }

  private reCreateApplication(newVisualModel: VisualState = this.visualModel.state) {
    this.app.removeHTML();

    const settingsModel = { ...this.settingsModel, ...this.model.state };
    this.model = new Model(settingsModel);
    this.visualModel.setState(newVisualModel);

    this.app = new AppConfigurator().main(this.visualModel.state, this.anchor);
    this.app.createUI(this.visualModel.state);
    this.bindEvents();
    this.app.init(this.visualModel.state);
  }
}

export default Controller;
