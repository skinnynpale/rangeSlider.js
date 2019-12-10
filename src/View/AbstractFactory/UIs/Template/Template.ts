import { Bar } from '../Bar/Bar';
import { Handle } from '../Handle/Handle';
import { VisualState } from '../../../../helpers/interfaces';

class Template {
  public templateHTML: HTMLElement | null = null;

  public init({ skin, direction }: VisualState, anchor: HTMLElement) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}"></div>
      </div>
    `;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
    this.templateHTML = anchor.querySelector('.wrapper-slider');
  }

  public append(component: Handle | Bar, anchor: HTMLElement) {
    component.init(anchor);
  }
}

export default Template;
