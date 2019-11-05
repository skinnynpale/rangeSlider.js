import { Temp } from '../../../../helpers/interfaces';

interface Bar {
  paint({ tempPxValue, tempPxValues, tempValue, tempTarget }: Temp): void;
  init(anchor: HTMLElement): void;
}

class Bar implements Bar {
  public init(anchor: HTMLElement) {
    const barTemplate = '<div class="slider__bar"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', barTemplate);
  }
}

class SingleHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: Temp) {
    if (!(tempTarget !== undefined && tempPxValue !== undefined)) return;

    const bar =
      tempTarget.parentElement &&
      (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    bar && (bar.style.width = `${tempPxValue + 10}px`);
  }
}

class SingleVerticalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: Temp) {
    if (!(tempTarget !== undefined && tempPxValue !== undefined)) return;

    const bar =
      tempTarget.parentElement &&
      (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    bar && (bar.style.height = `${tempPxValue + 10}px`);
  }
}

class IntervalHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: Temp) {
    if (!(tempTarget !== undefined && tempPxValues !== undefined)) return;

    const bar =
      tempTarget.parentElement &&
      (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    bar && (bar.style.left = `${tempPxValues[0]}px`);
    bar && (bar.style.width = `${tempPxValues[1] - tempPxValues[0] + 10}px`);
  }
}

class IntervalVerticalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: Temp) {
    if (!(tempTarget !== undefined && tempPxValues !== undefined)) return;

    const bar =
      tempTarget.parentElement &&
      (tempTarget.parentElement.querySelector('.slider__bar') as HTMLElement);

    bar && (bar.style.bottom = `${tempPxValues[0]}px`);
    bar && (bar.style.height = `${tempPxValues[1] - tempPxValues[0] + 10}px`);
  }
}

export { Bar, IntervalHorizontalBar, IntervalVerticalBar, SingleHorizontalBar, SingleVerticalBar };
