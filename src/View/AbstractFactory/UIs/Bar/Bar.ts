import { ViewValues } from '../../../../helpers/interfaces';
import { constants } from '../../../../helpers/constants';

interface Bar {
  paint({ pxValue, pxValues, value, target }: ViewValues): void;
  init(anchor: HTMLElement): void;
}

class Bar implements Bar {
  constructor(protected direction: string, anchor: HTMLElement) {
    const barTemplate = '<div class="slider__bar"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', barTemplate);
  }
}

class SingleBar extends Bar {
  public paint({ pxValue, target }: ViewValues) {
    if (pxValue === undefined || target === undefined) return;

    const bar = target.parentElement && (target.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar && (bar.style.width = `${pxValue + 10}px`);
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar && (bar.style.height = `${pxValue + 10}px`);
    }
  }
}

class IntervalBar extends Bar {
  public paint({ pxValues, target }: ViewValues) {
    if (pxValues === undefined || target === undefined) return;

    const bar = target.parentElement && (target.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar && (bar.style.left = `${pxValues[0]}px`);
      bar && (bar.style.width = `${pxValues[1] - pxValues[0] + 10}px`);
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar && (bar.style.bottom = `${pxValues[0]}px`);
      bar && (bar.style.height = `${pxValues[1] - pxValues[0] + 10}px`);
    }
  }
}

export { Bar, IntervalBar, SingleBar };
