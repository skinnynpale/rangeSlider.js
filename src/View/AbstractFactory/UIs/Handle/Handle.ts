import { Tip } from '../Tip/Tip';
import { Temp } from '../../../../helpers/interfaces';
import { constants } from '../../../../helpers/constants';

interface Handle {
  paint({ target, pxValue }: Temp): void;
  init(anchor: HTMLElement): void;
  append(component: Tip): void;
}

class Handle implements Handle {
  protected anchor!: HTMLElement;

  constructor(protected direction: string) {}

  public init(anchor: HTMLElement): void {
    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public append(component: Tip): void {
    const handles = this.anchor.querySelectorAll('.slider__handle');

    for (const handle of Array.from(handles)) {
      component.init(handle as HTMLElement);
    }
  }
}

class SingleHandle extends Handle  {
  public paint({ target, pxValue }: Temp): void {
    if (!target) return;

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      target.style.left = `${pxValue}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      target.style.bottom = `${pxValue}px`;
    }
  }
}

class IntervalHandle extends Handle {
  public init(anchor: HTMLElement): void {
    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handleTemplate);
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public paint({ target, pxValue }: Temp): void {
    if (!target) return;

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      target.style.left = `${pxValue}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      target.style.bottom = `${pxValue}px`;
    }
  }
}

export {
  Handle,
  IntervalHandle,
  SingleHandle
};
