import { Temp } from '../../../../helpers/interfaces';
import { constants } from '../../../../helpers/constants';

interface Bar {
  paint({ tempPxValue, tempPxValues, tempValue, tempTarget }: Temp): void;
  init(anchor: HTMLElement): void;
}

class Bar implements Bar {
  constructor(protected direction: string) {}
  public init(anchor: HTMLElement): void {
    const barTemplate = '<div class="slider__bar"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', barTemplate);
  }
}

class SingleBar extends Bar {
  public paint({ tempPxValue, tempTarget }: Temp): void {
    if (tempPxValue === undefined || tempTarget === undefined) return;

    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar && (bar.style.width = `${tempPxValue + 10}px`);
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar && (bar.style.height = `${tempPxValue + 10}px`);
    }
  }
}

class IntervalBar extends Bar {
  public paint({ tempPxValues, tempTarget }: Temp): void {
    if (tempPxValues === undefined || tempTarget === undefined) return;

    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      bar && (bar.style.left = `${tempPxValues[0]}px`);
      bar && (bar.style.width = `${tempPxValues[1] - tempPxValues[0] + 10}px`);
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      bar && (bar.style.bottom = `${tempPxValues[0]}px`);
      bar && (bar.style.height = `${tempPxValues[1] - tempPxValues[0] + 10}px`);
    }
  }
}

export { Bar, IntervalBar, SingleBar };
