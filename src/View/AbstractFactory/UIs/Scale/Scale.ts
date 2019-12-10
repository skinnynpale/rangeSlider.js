import Observer from '../../../../Observer/Observer';
import { constants } from '../../../../helpers/constants';

class Scale extends Observer implements Scale {
  protected slider!: HTMLElement;
  protected scaleHTML!: HTMLElement;
  protected anchor!: HTMLElement;
  protected steps!: number[];
  private ratio!: number;

  constructor(protected direction: string) {
    super();
    this.handleScaleValue = this.handleScaleValue.bind(this);
  }

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    this.slider = anchor.querySelector('.slider') as HTMLElement;

    const scaleWrapper = `<div class="slider__scale"><div class="scale"></div></div>`;
    this.slider.insertAdjacentHTML('afterbegin', scaleWrapper);
    this.scaleHTML = this.anchor.querySelector('.scale') as HTMLElement;

    this.scaleHTML.addEventListener('click', this.handleScaleValue);
  }

  public paint({ ratio, steps }: { ratio: number; steps: number[] }) {
    this.steps = steps;
    const progression = steps;
    let ratioProgressive = 0;

    if (this.scaleHTML.childElementCount === progression.length) {
      if (ratio === this.ratio) {
        return;
      }
    }

    this.scaleHTML.innerHTML = '';
    if (ratio !== undefined) {
      this.ratio = ratio;
    }

    for (let i = 0; i < progression.length; i += 1) {
      const template = `<div class="scale__value">${progression[i]}</div>`;
      this.scaleHTML.insertAdjacentHTML('beforeend', template);

      const currentCreatedValue = this.scaleHTML.children[i] as HTMLElement;

      if (i === 0) {
        switch (this.direction) {
          case constants.DIRECTION_HORIZONTAL:
            currentCreatedValue.style.left = `${0}px`;
            break;
          case constants.DIRECTION_VERTICAL:
            currentCreatedValue.style.bottom = `${0}px`;
            break;
        }
      } else {
        ratioProgressive += ratio;
        const offset = currentCreatedValue.clientWidth / 8;

        switch (this.direction) {
          case constants.DIRECTION_HORIZONTAL:
            currentCreatedValue.style.left = `${ratioProgressive - offset}px`;
            break;
          case constants.DIRECTION_VERTICAL:
            currentCreatedValue.style.bottom = `${ratioProgressive - offset}px`;
            break;
        }
      }
    }

    const handle = this.slider.querySelector('.slider__handle') as HTMLElement;

    switch (this.direction) {
      case constants.DIRECTION_HORIZONTAL:
        this.scaleHTML.style.marginLeft = `${handle.offsetWidth / 4 - 1}px`;
        break;
      case constants.DIRECTION_VERTICAL:
        this.scaleHTML.style.marginBottom = `${handle.offsetWidth / 4 - 1}px`;
        break;
    }
  }

  private findClosestHandle(anchor: HTMLElement, value: number) {
    const handles = anchor.querySelectorAll('.slider__handle');
    const tips = anchor.querySelectorAll('.slider__tip');

    const values = (Array.from(tips).map(item => (item as HTMLElement).dataset.value) as unknown) as number[];

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
      values[1] = this.steps[this.steps.length - 1];
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
