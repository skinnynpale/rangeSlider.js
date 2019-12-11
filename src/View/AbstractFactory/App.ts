import Settings from './UIs/Settings/Settings';
import Template from './UIs/Template/Template';
import { GUIFactory, IntervalFactory, SingleFactory } from './Factories/Factories';
import Observer from '../../Observer/Observer';
import { constants } from '../../helpers/constants';
import { Directions, ForMouseMove, ViewValues, UIs, VisualState } from '../../helpers/interfaces';

class App extends Observer {
  public UIs: UIs = {};
  public settings?: Settings;
  private template = new Template();

  constructor(private factory: GUIFactory, private anchor: HTMLElement) {
    super();
  }

  public createUI(state: VisualState) {
    const { bar, scale, settings } = state;

    this.template.init(state, this.anchor);
    this.UIs.handle = this.factory.createHandle(this.anchor);
    bar && (this.UIs.bar = this.factory.createBar(this.anchor));
    scale && (this.UIs.scale = this.factory.createScale(this.anchor));
    settings && (this.UIs.settings = new Settings(this.anchor));
  }

  public init(state: VisualState) {
    // Коллаборации
    if (state.tip && this.UIs.handle) {
      this.UIs.tip = this.factory.createTip();
      this.UIs.handle.append(this.UIs.tip);
    }

    // для правильной отрисовки
    const edge = this.getEdge(state);
    const handles = this.anchor.querySelectorAll('.slider__handle');
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;

    this.bindEventListeners({ wrapper, state });
    this.emit('finishInit', { handles, edge });
  }

  public paint(state: ViewValues) {
    const gui = Object.keys(this.UIs);

    for (const UI of gui) {
      if (UI === 'settings') continue;
      (this.UIs as any)[UI].paint(state);
    }
  }

  public removeHTML() {
    if (this.UIs.settings) {
      this.anchor.removeChild(this.UIs.settings.wrapper);
    }
    if (this.template.wrapper) {
      this.anchor.removeChild(this.template.wrapper);
    }
  }

  private getEdge(state: VisualState) {
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;
    const handles = this.anchor.querySelectorAll('.slider__handle');

    if (state.direction === constants.DIRECTION_VERTICAL) {
      return wrapper.clientHeight - (handles[0] as HTMLElement).offsetHeight;
    }

    return wrapper.offsetWidth - (handles[0] as HTMLElement).offsetWidth;
  }

  private bindEventListeners(data: { wrapper: HTMLElement; state: VisualState }) {
    data.wrapper.addEventListener('mousedown', this.handleStartMove.bind(this, data));
  }

  private handleStartMove(data: { wrapper: HTMLElement; state: VisualState }, e: MouseEvent) {
    e.preventDefault();
    if ((e.target as HTMLElement).className !== 'slider__handle') return;

    const target = e.target as HTMLElement;
    const shiftX = e.offsetX;
    const shiftY = target.offsetHeight - e.offsetY;

    const forMouseMove: ForMouseMove = {
      shiftX,
      shiftY,
      target,
      data,
    };

    const handleMouseMove = this.handleMouseMove.bind(this, forMouseMove);

    document.addEventListener('mousemove', handleMouseMove);

    function handleFinishMove() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleFinishMove);
    }

    document.addEventListener('mouseup', handleFinishMove);
  }

  private handleMouseMove(this: App, forMouseMove: ForMouseMove, e: MouseEvent) {
    const shiftY = forMouseMove.shiftY;
    const shiftX = forMouseMove.shiftX;
    const data = forMouseMove.data;
    const target = forMouseMove.target;

    let left;
    if (data.state.direction === constants.DIRECTION_VERTICAL) {
      left = data.wrapper.offsetHeight - e.clientY - shiftY + data.wrapper.getBoundingClientRect().top;
    } else {
      left = e.clientX - shiftX - data.wrapper.offsetLeft;
    }

    this.emit('onUserMove', { left, target });
  }
}

class AppConfigurator {
  public main({ type, direction }: VisualState, anchor: HTMLElement) {
    let factory;

    if (type === constants.TYPE_SINGLE) {
      factory = new SingleFactory(direction as Directions);
    } else if (type === constants.TYPE_INTERVAL) {
      factory = new IntervalFactory(direction as Directions);
    } else {
      throw new Error(`Error! Unknown ${type} or ${direction}`);
    }

    return new App(factory, anchor);
  }
}

export { AppConfigurator, App };
