import './slider.scss';
import './wrapper-slider.scss';

import { VisualState } from '../../../../helpers/interfaces';

class Template {
  public wrapper: HTMLElement | null = null;

  public init({ skin, direction }: VisualState, anchor: HTMLElement) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}">
          <div class="slider__bar-empty">
        </div>
      </div>
    `;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
    this.wrapper = anchor.querySelector('.wrapper-slider');
  }
}

export default Template;
