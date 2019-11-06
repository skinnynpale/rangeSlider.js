import Settings from './UIs/Settings/Settings';
import Template from './UIs/Template/Template';

import {
  GUIFactory,
  IntervalHorizontalFactory,
  IntervalVerticalFactory,
  SingleHorizontalFactory,
  SingleVerticalFactory,
} from './Factories/Factories';

import Observer from '../../Observer/Observer';
import { constants } from '../../helpers/constants';
import { Temp, UIs, VisualState, forMouseMove } from '../../helpers/interfaces';

/**
 * Application
 *
 */

class Application extends Observer {
  public UIs: UIs = {};
  public settings?: Settings;
  private template!: Template;

  constructor(private factory: GUIFactory, private anchor: HTMLElement) {
    super();
  }

  public createUI({ bar, scale, settings }: VisualState): void {
    this.template = this.factory.createTemplate();
    this.UIs.handle = this.factory.createHandle();

    bar && (this.UIs.bar = this.factory.createBar());
    scale && (this.UIs.scale = this.factory.createScale());
    settings && (this.UIs.settings = this.factory.createSettings());
  }

  public init(state: VisualState): void {
    this.template.init(state, this.anchor);

    const gui = Object.keys(this.UIs);
    for (const UI of gui) {
      this.template.append((this.UIs as any)[UI], this.anchor);
    }

    // Коллаборации
    if (state.tip && this.UIs.handle) {
      this.UIs.tip = this.factory.createTip();
      this.UIs.handle.append(this.UIs.tip);
    }
    // Коллаборации

    // для правильной отрисовки
    const edge = this.getEdge(state);
    const handles = this.anchor.querySelectorAll('.slider__handle');
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;

    this.bindUserEvents({ wrapper, state });
    this.emit('finishInit', { handles, edge });
  }

  public paint(state: Temp): void {
    const gui = Object.keys(this.UIs);

    for (const UI of gui) {
      if (UI === 'settings') continue;

      (this.UIs as any)[UI].paint(state);
    }
  }

  public removeHTML(): void {
    this.anchor.removeChild((this.UIs.settings as Settings).settingsHTML);
    this.anchor.removeChild(this.template.templateHTML);
  }

  private getEdge(state: VisualState): number {
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;
    const handles = this.anchor.querySelectorAll('.slider__handle');

    if (state.direction === constants.DIRECTION_VERTICAL) {
      return wrapper.clientHeight - (handles[0] as HTMLElement).offsetHeight;
    }

    return wrapper.offsetWidth - (handles[0] as HTMLElement).offsetWidth;
  }

  private bindUserEvents(data: { wrapper: HTMLElement; state: VisualState }): void {
    data.wrapper.addEventListener('mousedown', this.startListenMove.bind(this, data));
  }

  private startListenMove(data: { wrapper: HTMLElement; state: VisualState }, e: MouseEvent): void {
    e.preventDefault();
    if ((e.target as HTMLElement).className !== 'slider__handle') return;

    const tempTarget = e.target as HTMLElement;
    const shiftX = e.offsetX;
    const shiftY = tempTarget.offsetHeight - e.offsetY;

    const forMouseMove: forMouseMove = {
      shiftX,
      shiftY,
      tempTarget,
      data,
    };

    const onmousemove = this.listenMouseMove.bind(this, forMouseMove);

    document.addEventListener('mousemove', onmousemove);

    function listenMouseUp(): void {
      document.removeEventListener('mousemove', onmousemove);
      document.removeEventListener('mouseup', listenMouseUp);
    }

    document.addEventListener('mouseup', listenMouseUp);
  }

  private listenMouseMove(this: Application, forMouseMove: forMouseMove, e: MouseEvent): void {
    const shiftY = forMouseMove.shiftY;
    const shiftX = forMouseMove.shiftX;
    const data = forMouseMove.data;
    const tempTarget = forMouseMove.tempTarget;

    let left;
    if (data.state.direction === constants.DIRECTION_VERTICAL) {
      left = data.wrapper.offsetHeight - e.clientY - shiftY + data.wrapper.getBoundingClientRect().top;
    } else {
      left = e.clientX - shiftX - data.wrapper.offsetLeft;
    }

    this.emit('onUserMove', { left, tempTarget });
  }
}

/**
 * Application configurator
 */

class ApplicationConfigurator {
  public main({ type, direction }: VisualState, anchor: HTMLElement): Application {
    let factory;

    if (type === constants.TYPE_SINGLE && direction === constants.DIRECTION_HORIZONTAL) {
      factory = new SingleHorizontalFactory();
    } else if (type === constants.TYPE_SINGLE && direction === constants.DIRECTION_VERTICAL) {
      factory = new SingleVerticalFactory();
    } else if (type === constants.TYPE_INTERVAL && direction === constants.DIRECTION_HORIZONTAL) {
      factory = new IntervalHorizontalFactory();
    } else if (type === constants.TYPE_INTERVAL && direction === constants.DIRECTION_VERTICAL) {
      factory = new IntervalVerticalFactory();
    } else {
      throw new Error(`Error! Unknown ${type} or ${direction}`);
    }

    return new Application(factory, anchor);
  }
}

export { ApplicationConfigurator, Application };
