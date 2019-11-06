import { Tip } from '../Tip/Tip';
import { Temp } from '../../../../helpers/interfaces';

interface Handle {
  paint({ tempTarget, tempPxValue }: Temp): void;
  init(anchor: HTMLElement): void;
  append(component: Tip): void;
}

class Handle implements Handle {
  protected anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public append(component: Tip) {
    const handles = this.anchor.querySelectorAll('.slider__handle');

    for (const handle of Array.from(handles)) {
      component.init(handle as HTMLElement);
    }
  }
}

class SingleHorizontalHandle extends Handle  {
  public paint({ tempTarget, tempPxValue }: Temp) {
    if (!tempTarget) return;

    tempTarget.style.left = `${tempPxValue}px`;
  }
}

class SingleVerticalHandle extends Handle {
  public paint({ tempTarget, tempPxValue }: Temp) {
    if (!tempTarget) return;

    tempTarget.style.bottom = `${tempPxValue}px`;
  }
}

class IntervalHorizontalHandle extends Handle {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handleTemplate);
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public paint({ tempTarget, tempPxValue }: Temp) {
    if (!tempTarget) return;

    tempTarget.style.left = `${tempPxValue}px`;
  }
}

class IntervalVerticalHandle extends Handle {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider') as HTMLElement;
    slider.insertAdjacentHTML('beforeend', handleTemplate);
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public paint({ tempTarget, tempPxValue }: Temp) {
    if (!tempTarget) return;

    tempTarget.style.bottom = `${tempPxValue}px`;
  }
}

export {
  Handle,
  IntervalHorizontalHandle,
  IntervalVerticalHandle,
  SingleHorizontalHandle,
  SingleVerticalHandle,
};
