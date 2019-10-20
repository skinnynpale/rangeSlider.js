import Settings from './UIs/Settings/Settings';
import Template from './UIs/Template/Template';
import { Tip } from './UIs/Tip/Tip';
import { Bar } from './UIs/Bar/Bar';
import { Handler } from './UIs/Handler/Handler';
import { Scale } from './UIs/Scale/Scale';

import {
  GUIFactory,
  IntervalHorizontalFactory,
  IntervalVerticalFactory,
  SingleHorizontalFactory,
  SingleVerticalFactory,
} from './Factories/Factories';

import Observer from '../../Observer/Observer';
import { constants } from '../../helpers/constants';
import { IOnlyBoolean, IOnlyString, ITemp, IVisualModel } from '../../helpers/interfaces';

/**
 * Application
 *
 */

interface UIs {
  handler?: Handler;
  bar?: Bar;
  tip?: Tip;
  scale?: Scale;
}

class Application extends Observer {
  // tslint:disable-next-line:variable-name
  public UIs: {
    handler?: Handler;
    bar?: Bar;
    tip?: Tip;
    scale?: Scale;
    settings?: Settings;
  } = {};
  public settings?: Settings;
  private template!: Template;

  constructor(private factory: GUIFactory, private anchor: HTMLElement) {
    super();
  }

  public createUI({ bar, scale, settings }: IOnlyBoolean) {
    this.template = this.factory.createTemplate();
    this.UIs.handler = this.factory.createHandler();

    bar && (this.UIs.bar = this.factory.createBar());
    scale && (this.UIs.scale = this.factory.createScale());
    settings && (this.UIs.settings = this.factory.createSettings());
  }

  public init(state: IVisualModel) {
    this.template.init(state, this.anchor);

    const gui = Object.keys(this.UIs);
    for (const UI of gui) {
      this.template.append((this.UIs as any)[UI], this.anchor);
    }

    // Коллаборации
    if (state.tip && this.UIs.handler) {
      this.UIs.tip = this.factory.createTip();
      this.UIs.handler.append(this.UIs.tip);
    }
    // Коллаборации

    // для правильной отрисовки
    const edge = this.getEdge(state);
    const handlers = this.anchor.querySelectorAll('.slider__handler');
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;

    this.listenUserEvents(wrapper, state);
    this.emit('finishInit', { handlers, edge });
  }

  public paint(state: ITemp) {
    const gui = Object.keys(this.UIs);

    for (const UI of gui) {
      if (UI === 'settings') continue;

      (this.UIs as any)[UI].paint(state);
    }
  }

  public removeHTML() {
    this.anchor.removeChild((this.UIs.settings as Settings).settingsHTML);
    this.anchor.removeChild(this.template.templateHTML);
  }

  private getEdge(state: IVisualModel) {
    const wrapper = this.anchor.querySelector('.wrapper-slider') as HTMLElement;
    const handlers = this.anchor.querySelectorAll('.slider__handler');

    if (state.direction === constants.DIRECTION_VERTICAL) {
      return wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight;
    }
    return wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;
  }

  private listenUserEvents(wrapper: HTMLElement, state: IVisualModel) {
    wrapper.addEventListener('mousedown', e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== 'slider__handler') return;

      const tempTarget = e.target as HTMLElement;
      const shiftX = e.offsetX;
      const shiftY = tempTarget.offsetHeight - e.offsetY;

      const onmousemove = onMouseMove.bind(this);
      const onmouseup = onMouseUp;

      document.addEventListener('mousemove', onmousemove);
      document.addEventListener('mouseup', onmouseup);

      function onMouseMove(this: Application, e: MouseEvent) {
        let left;
        if (state.direction === constants.DIRECTION_VERTICAL) {
          left = wrapper.offsetHeight - e.clientY - shiftY + wrapper.getBoundingClientRect().top;
        } else {
          left = e.clientX - shiftX - wrapper.offsetLeft;
        }

        this.emit('onUserMove', { left, tempTarget });
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onmousemove);
        document.removeEventListener('mouseup', onmouseup);
      }
    });
  }
}

/**
 * Application configurator
 */

class ApplicationConfigurator {
  public main({ type, direction }: IOnlyString, anchor: HTMLElement) {
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
