import Observer from '../../../../Observer/Observer';
import { IOnlyNumbers } from '../../../../helpers/interfaces';

interface Scale {
  init(anchor: HTMLElement): void;
  paint(state: {}): void;
}

class Scale extends Observer implements Scale {
  protected slider!: HTMLElement;
  protected scaleHTML!: HTMLElement;
  protected anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    this.slider = anchor.querySelector('.slider') as HTMLElement;

    const scaleTemplate = '<div class="slider__scale scale"></div>';
    this.slider.insertAdjacentHTML('afterbegin', scaleTemplate);
  }
}

class HorizontalScale extends Scale implements Scale {
  public paint({ edge, ratio }: IOnlyNumbers) {
    this.scaleHTML = this.anchor.querySelector('.slider__scale') as HTMLElement;
    const dashTemplate = '<div class="scale__dash"></div>';
    const amount = edge / ratio;

    if (this.scaleHTML.children.length !== amount + 1) {
      this.scaleHTML.innerHTML = '';
    }

    if (this.scaleHTML.children.length === 0) {
      for (let i = this.scaleHTML.children.length; i < amount + 1; i++) {
        this.scaleHTML.insertAdjacentHTML('beforeend', dashTemplate);
      }
    }

    this.scaleHTML.style.width = edge + 'px';
    const handler = this.slider.querySelector('.slider__handler') as HTMLElement;
    this.scaleHTML.style.marginLeft = '11px';
  }
}

class VerticalScale extends Scale implements Scale {
  public paint({ edge, ratio }: IOnlyNumbers) {
    this.scaleHTML = this.anchor.querySelector('.slider__scale') as HTMLElement;
    const dashTemplate = '<div class="scale__dash"></div>';
    const amount = edge / ratio;

    if (this.scaleHTML.children.length === 0) {
      for (let i = 0; i < amount + 1; i++) {
        this.scaleHTML.insertAdjacentHTML('beforeend', dashTemplate);
      }
    }

    this.scaleHTML.style.height = edge + 'px';
    const handler = this.slider.querySelector('.slider__handler') as HTMLElement;
    this.scaleHTML.style.marginTop = '11px';
  }
}

export { Scale, HorizontalScale, VerticalScale };
