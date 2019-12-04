import Model from '../Model/Model';
import VisualModel from '../Model/VisualModel';
import { Application, ApplicationConfigurator } from '../View/AbstractFactory/Application';
import { ModelState, Temp, VisualState } from '../helpers/interfaces';

class Controller {
  private model!: Model;
  private visualModel!: VisualModel;
  private app!: Application;

  constructor(
    private anchor: HTMLElement,
    private settingsVisualModel: VisualState,
    private settingsModel: ModelState,
  ) {
    this.initMVC(settingsVisualModel, settingsModel);
  }

  private initMVC(settingsVisualModel: VisualState, settingsModel: ModelState) {
    this.model = new Model(settingsModel);
    this.visualModel = new VisualModel();
    this.visualModel.setState(settingsVisualModel);

    this.app = new ApplicationConfigurator().main(this.visualModel.state, this.anchor);
    this.app.createUI(this.visualModel.state);
    this.bindEvents();
    this.app.init(this.visualModel.state);
  }

  private bindEvents(): void {
    this.app.on('finishInit', obj => this.arrangeHandles(obj as { edge: number; handles: NodeList }));

    this.model.on('pxValueDone', obj => this.app.paint(obj as Temp));
    this.app.on('onUserMove', obj => this.model.counting(obj as Temp));

    // Синхронизация настроек и состояния
    this.app.UIs.settings &&
      this.app.UIs.settings.on('newSettings', obj => {
        this.model.setState(obj as ModelState);
        this.arrangeHandles(obj as { edge: number; handles: NodeList });

        if ((obj as ModelState).step) {
          this.reCreateApplication();
        }
      });

    // Отрисовка настроек
    this.model.on(
      'pxValueDone',
      () =>
        this.app.UIs.settings && this.app.UIs.settings.paint({ ...this.model.state, ...this.visualModel.state } as any),
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
        this.model.setState(obj as ModelState);
        this.arrangeHandles(obj as { edge: number; handles: NodeList });
      });
  }

  // Расстановка бегунков
  private arrangeHandles({ edge, handles }: { edge: number; handles: NodeList }) {
    for (let i = 0; i < handles.length; i += 1) {
      this.model.counting({
        tempEdge: edge,
        tempTarget: handles[i] as HTMLElement,
        tempValue: this.model.state.values[i],
      });
    }
  }

  private reCreateApplication(newVisualModel: VisualState = this.visualModel.state) {
    const settingsModel = { ...this.settingsModel, ...this.model.state };

    this.app.removeHTML();
    this.initMVC(newVisualModel, settingsModel);
  }
}

export default Controller;
