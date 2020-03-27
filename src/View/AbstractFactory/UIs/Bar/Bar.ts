import { ViewValues } from '../../../../helpers/interfaces';
import { constants } from '../../../../helpers/constants';

interface BarInterface {
  paint({ pxValue, pxValues, value, target }: ViewValues): void;
}

class Bar {
  constructor(protected direction: string, anchor: HTMLElement) {
    const barTemplate = '</div><div class="slider__bar"></div>';
    const slider = anchor.querySelector('.slider');

    if (!slider) throw new Error('.slider - не было найдено!');

    slider.insertAdjacentHTML('beforeend', barTemplate);
  }
}

class SingleBar extends Bar implements BarInterface {
  public paint({ pxValue, target }: ViewValues) {
    if (pxValue === undefined || target === undefined) throw new Error('pxValue или target не был передан!');

    const bar = target.parentElement && (target.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (!bar) throw new Error('.slider__bar - не было найдено!');

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar.style.width = `${pxValue + 10}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar.style.height = `${pxValue + 10}px`;
    }
  }
}

class IntervalBar extends Bar implements BarInterface {
  public paint({ pxValues, target }: ViewValues) {
    if (pxValues === undefined || target === undefined) throw new Error('pxValues или target не был передан!');

    const bar = target.parentElement && (target.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (!bar) throw new Error('.slider__bar - не было найдено!');

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar.style.left = `${pxValues[0]}px`;
      bar.style.width = `${pxValues[1] - pxValues[0] + 10}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar.style.bottom = `${pxValues[0]}px`;
      bar.style.height = `${pxValues[1] - pxValues[0] + 10}px`;
    }
  }
}

export { Bar, IntervalBar, SingleBar, BarInterface };
