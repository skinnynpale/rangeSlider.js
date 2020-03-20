import Settings from './UIs/Settings/Settings';
import Template from './UIs/Template/Template';
import { GUIFactory } from './Factories/Factories';
import Observer from '../../Observer/Observer';
import { constants } from '../../helpers/constants';
import { ForMouseMove, ViewValues, UIs, VisualState } from '../../helpers/interfaces';

class App extends Observer {
  public UIs: UIs = {};
  public settings?: Settings;
  private template = new Template();
  private closestHandle: HTMLElement | null = null;

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

    if (!wrapper) throw new Error('.wrapper-slider - не было найдено!');
    this.bindEventListeners({ wrapper, state });
    this.emit('finishInit', { handles, edge });
  }

  public paint(state: ViewValues) {
    const UIs = Object.entries(this.UIs);

    for (const [UIName, UIInstance] of UIs) {
      if (UIName === 'settings') continue;
      UIInstance.paint(state);
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

    if (!wrapper) throw new Error('.wrapper-slider - не было найдено!');

    const handles = this.anchor.querySelectorAll('.slider__handle');

    if (!handles) throw new Error('.slider__handle - не было найдено!');

    if (state.direction === constants.DIRECTION_VERTICAL) {
      return wrapper.clientHeight;
    }

    return wrapper.offsetWidth;
  }

  private bindEventListeners(data: { wrapper: HTMLElement; state: VisualState }) {
    data.wrapper.addEventListener('mousedown', this.handleStartMove.bind(this, data));
  }

  private handleStartMove(data: { wrapper: HTMLElement; state: VisualState }, e: MouseEvent) {
    e.preventDefault();
    let target = e.target as HTMLElement;
    if (!target.className.match(/(slider__handle|slider__tip|slider__bar)/g)) return;

    const isTip = target.className.includes('slider__tip');
    if (isTip) {
      target = target.parentElement as HTMLElement;
    }

    if (!target) throw new Error('event.target - не найден!');

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
    document.addEventListener('mousedown', handleMouseMove);

    const handleFinishMove = () => {
      this.closestHandle = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseMove);
      document.removeEventListener('mouseup', handleFinishMove);
    };

    document.addEventListener('mouseup', handleFinishMove);
  }

  private handleMouseMove(this: App, forMouseMove: ForMouseMove, e: MouseEvent) {
    const target = forMouseMove.target;
    const isBar = target.className.includes('slider__bar');

    const shiftY = isBar ? 0 : forMouseMove.shiftY * 0.5;
    const shiftX = isBar ? 0 : forMouseMove.shiftX * 0.5;
    const data = forMouseMove.data;

    let left: number;
    if (data.state.direction === constants.DIRECTION_VERTICAL) {
      left = data.wrapper.offsetHeight - e.clientY - shiftY + data.wrapper.getBoundingClientRect().top;
    } else {
      left = e.clientX - shiftX - data.wrapper.offsetLeft;
    }

    if (isBar && !this.closestHandle) {
      const handlesNodes = Array.from(data.wrapper.querySelectorAll('.slider__handle'));
      const handles = handlesNodes.map(handle => {
        let value: number;

        if (data.state.direction === constants.DIRECTION_VERTICAL) {
          value = parseInt((handle as HTMLElement).style.bottom || '');
        } else {
          value = parseInt((handle as HTMLElement).style.left || '');
        }

        return {
          value,
          handle: handle as HTMLElement,
        };
      });

      if (handles.length === 2) {
        const first = Math.abs(handles[0].value - left);
        const second = Math.abs(handles[1].value - left);
        const arr = [first, second];
        const desiredIndex = arr.map((item, index, array) => {
          if (item <= array[index + 1]) {
            return index;
          }
          return index + 1;
        });
        this.closestHandle = handles[desiredIndex[0]].handle;
      } else {
        this.closestHandle = handles[0].handle;
      }
    }

    this.emit('onUserMove', { left, target: isBar ? this.closestHandle : target });
  }
}

export default App;
