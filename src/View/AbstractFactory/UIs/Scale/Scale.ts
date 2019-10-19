import { IState } from '../../../../helpers/interfaces';
import Observer from '../../../../Observer/Observer';

interface Scale {
  init(anchor: HTMLElement): void;
  paint(state: {}): void;
}

class Scale extends Observer implements Scale {
  protected slider!: HTMLElement;
  protected scaleHTML!: HTMLElement;
  protected anchor!: HTMLElement;
  protected arrayOfProgression!: number[];

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    this.slider = anchor.querySelector('.slider') as HTMLElement;

    const scaleTemplate = '<div class="slider__scale scale"></div>';
    this.slider.insertAdjacentHTML('afterbegin', scaleTemplate);
    this.scaleHTML = this.anchor.querySelector('.slider__scale') as HTMLElement;

    this.scaleHTML.addEventListener('click', e => {
      const valueHTML = e.target as HTMLElement;
      if (valueHTML.className !== 'scale__value') return;

      const value = Number(valueHTML && valueHTML.textContent);
      const { handlers, values } = this.findClosestHandler(anchor, value);

      this.emit('newValueFromScale', {
        handlers,
        values,
      });
    });
  }

  private findClosestHandler(anchor: HTMLElement, value: number) {
    const handlers = anchor.querySelectorAll('.slider__handler');
    const tips = anchor.querySelectorAll('.slider__tip');

    const values = (Array.from(tips).map(
      item => (item as HTMLElement).dataset.value,
    ) as unknown) as number[];

    if (handlers.length === 2) {
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
      values[1] = this.arrayOfProgression[this.arrayOfProgression.length - 1];
    }
    return { handlers, values };
  }
}

class HorizontalScale extends Scale implements Scale {
  protected arrayOfProgression!: number[];

  public paint({ ratio, arrayOfProgression }: IState) {
    this.arrayOfProgression = arrayOfProgression as number[];
    const progression = arrayOfProgression as number[];
    let ratioProgressive = 0;

    if (this.scaleHTML.children.length >= progression.length) {
      this.scaleHTML.innerHTML = '';
    }

    for (let i = 0; i < progression.length; i += 1) {
      const template = `<div class="scale__value">${progression[i]}</div>`;
      this.scaleHTML.insertAdjacentHTML('beforeend', template);

      const currentCreatedValue = this.scaleHTML.children[i] as HTMLElement;

      if (i === 0) {
        currentCreatedValue.style.left = `${0}px`;
      } else {
        ratioProgressive += ratio as number;
        const offset = currentCreatedValue.clientWidth / 8;
        currentCreatedValue.style.left = `${ratioProgressive - offset}px`;
      }
    }

    const handler = this.slider.querySelector('.slider__handler') as HTMLElement;
    this.scaleHTML.style.marginLeft = `${handler.offsetWidth / 4 - 1}px`;
  }
}

class VerticalScale extends Scale implements Scale {
  protected arrayOfProgression!: number[];

  public paint({ ratio, arrayOfProgression }: IState) {
    this.arrayOfProgression = arrayOfProgression as number[];
    const progression = arrayOfProgression as number[];
    let ratioProgressive = 0;

    if (this.scaleHTML.children.length >= progression.length) {
      this.scaleHTML.innerHTML = '';
    }

    for (let i = 0; i < progression.length; i += 1) {
      const template = `<div class="scale__value">${progression[i]}</div>`;
      this.scaleHTML.insertAdjacentHTML('beforeend', template);

      const currentCreatedValue = this.scaleHTML.children[i] as HTMLElement;

      if (i === 0) {
        currentCreatedValue.style.bottom = `${0}px`;
      } else {
        ratioProgressive += ratio as number;
        const offset = currentCreatedValue.clientWidth / 8;
        currentCreatedValue.style.bottom = `${ratioProgressive - offset}px`;
      }
    }

    const handler = this.slider.querySelector('.slider__handler') as HTMLElement;
    this.scaleHTML.style.marginBottom = `${handler.offsetWidth / 4 - 1}px`;
  }
}

export { Scale, HorizontalScale, VerticalScale };
