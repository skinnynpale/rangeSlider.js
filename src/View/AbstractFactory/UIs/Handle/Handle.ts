import { Tip } from '../Tip/Tip';
import { ViewValues } from '../../../../helpers/interfaces';
import { constants } from '../../../../helpers/constants';

interface HandleInterface {
  paint({ target, pxValue }: ViewValues): void;
  append(component: Tip): void;
}

class Handle {
  constructor(protected anchor: HTMLElement) {}

  public append(component: Tip) {
    const handles = this.anchor.querySelectorAll('.slider__handle');

    for (const handle of Array.from(handles)) {
      component.init(handle as HTMLElement);
    }
  }
}

class SingleHandle extends Handle implements HandleInterface {
  constructor(protected direction: string, anchor: HTMLElement) {
    super(anchor);

    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider');

    if (slider === null) throw new Error('.slider - не было найдено!');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public paint({ target, pxValue }: ViewValues) {
    if (!target) return;

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      target.style.left = `${pxValue}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      target.style.bottom = `${pxValue}px`;
    }
  }
}

class IntervalHandle extends Handle implements HandleInterface {
  constructor(protected direction: string, anchor: HTMLElement) {
    super(anchor);

    this.anchor = anchor;
    const handleTemplate = '<div class="slider__handle"></div>';
    const slider = anchor.querySelector('.slider');

    if (slider === null) throw new Error('.slider - не было найдено!');

    slider.insertAdjacentHTML('beforeend', handleTemplate);
    slider.insertAdjacentHTML('beforeend', handleTemplate);
  }

  public paint({ target, pxValue }: ViewValues) {
    if (!target) return;

    if (this.direction === constants.DIRECTION_HORIZONTAL) {
      target.style.left = `${pxValue}px`;
    } else if (this.direction === constants.DIRECTION_VERTICAL) {
      target.style.bottom = `${pxValue}px`;
    }
  }
}

export { Handle, IntervalHandle, SingleHandle, HandleInterface };
