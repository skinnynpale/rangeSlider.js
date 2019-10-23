import { Tip } from '../Tip/Tip';
import { ITemp } from '../../../../helpers/interfaces';

interface Handler {
  paint({ tempTarget, tempPxValue }: ITemp): void;
  init(anchor: HTMLElement): void;
  append(component: Tip): void;
}

class Handler implements Handler {
  protected anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = '<div class="slider__handler"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handlerTemplate);
  }

  public append(component: Tip) {
    const handlers = this.anchor.querySelectorAll('.slider__handler');

    for (const handler of Array.from(handlers)) {
      component.init(handler as HTMLElement);
    }
  }
}

class SingleHorizontalHandler extends Handler implements Handler {
  public paint({ tempTarget, tempPxValue }: ITemp) {
    if (!tempTarget) return;

    tempTarget.style.left = `${tempPxValue}px`;
  }
}

class SingleVerticalHandler extends Handler implements Handler {
  public paint({ tempTarget, tempPxValue }: ITemp) {
    if (!tempTarget) return;

    tempTarget.style.bottom = `${tempPxValue}px`;
  }
}

class IntervalHorizontalHandler extends Handler implements Handler {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = '<div class="slider__handler"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handlerTemplate);
    slider.insertAdjacentHTML('beforeend', handlerTemplate);
  }

  public paint({ tempTarget, tempPxValue }: ITemp) {
    if (!tempTarget) return;

    tempTarget.style.left = `${tempPxValue}px`;
  }
}

class IntervalVerticalHandler extends Handler implements Handler {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = '<div class="slider__handler"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handlerTemplate);
    slider.insertAdjacentHTML('beforeend', handlerTemplate);
  }

  public paint({ tempTarget, tempPxValue }: ITemp) {
    if (!tempTarget) return;

    tempTarget.style.bottom = `${tempPxValue}px`;
  }
}

export {
  Handler,
  IntervalHorizontalHandler,
  IntervalVerticalHandler,
  SingleHorizontalHandler,
  SingleVerticalHandler,
};
