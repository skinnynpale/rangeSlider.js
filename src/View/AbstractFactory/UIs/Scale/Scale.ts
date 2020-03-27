import './scale.scss';

import Observer from '../../../../Observer/Observer';
import { constants } from '../../../../helpers/constants';
import { Steps } from '../../../../helpers/interfaces';

class Scale extends Observer {
  protected slider: HTMLElement;
  protected wrapper: HTMLElement;
  protected steps: Steps = [{ value: 0, px: 0 }];

  constructor(protected direction: string, protected anchor: HTMLElement) {
    super();
    this.handleScaleValue = this.handleScaleValue.bind(this);

    this.slider = anchor.querySelector('.slider') as HTMLElement;

    const scaleWrapper = `<div class="slider__scale"><div class="scale"></div></div>`;
    this.slider.insertAdjacentHTML('afterbegin', scaleWrapper);

    this.wrapper = this.anchor.querySelector('.scale') as HTMLElement;

    this.wrapper.addEventListener('click', this.handleScaleValue);
  }

  public paint({ steps }: { steps: Steps }) {
    this.steps = steps;
    const progression = steps;
    this.wrapper.innerHTML = '';

    for (let i = 0; i < progression.length; i += 1) {
      const template = `<div class="scale__value">${progression[i].value}</div>`;
      this.wrapper.insertAdjacentHTML('beforeend', template);

      const currentCreatedValue = this.wrapper.children[i] as HTMLElement;

      switch (this.direction) {
        case constants.DIRECTION_HORIZONTAL:
          currentCreatedValue.style.left = `${progression[i].px}px`;
          break;
        case constants.DIRECTION_VERTICAL:
          currentCreatedValue.style.bottom = `${progression[i].px}px`;
          break;
      }
    }
  }

  private findClosestHandle(anchor: HTMLElement, value: number) {
    const handles = anchor.querySelectorAll('.slider__handle');
    const tips = anchor.querySelectorAll('.slider__tip');

    const values = Array.from(tips).map(item => Number((item as HTMLElement).dataset.value));

    if (handles.length === 2) {
      const first = Math.abs(values[0] - value);
      const second = Math.abs(values[1] - value);
      const arr = [first, second];
      const desiredIndex = arr.map((item, index, array) => {
        if (item <= array[index + 1]) {
          return index;
        }
        return index + 1;
      });
      values[desiredIndex[0]] = value;
    } else {
      values[0] = value;
      values[1] = this.steps[this.steps.length - 1].value;
    }
    return { handles, values };
  }

  private handleScaleValue(e: MouseEvent) {
    const valueHTML = e.target as HTMLElement;
    if (valueHTML.className !== 'scale__value') return;

    const value = Number(valueHTML && valueHTML.textContent);
    const { handles, values } = this.findClosestHandle(this.anchor, value);

    this.emit('newValueFromScale', {
      handles,
      values,
    });
  }
}

export { Scale };
