import { Tip } from '../Tip/Tip';
import { Bar } from '../Bar/Bar';
import { Handle } from '../Handle/Handle';
import { VisualState } from '../../../../helpers/interfaces';

interface Template {
  init(obj: VisualState, anchor: HTMLElement): void;
  append(component: Handle | Bar | Tip, anchor: HTMLElement): void;
}

class Template implements Template {
  public templateHTML!: HTMLElement;

  public init({ skin, direction }: VisualState, anchor: HTMLElement) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}"></div>
      </div>
    `;

    anchor.insertAdjacentHTML('afterbegin', sliderTemplate);
    this.templateHTML = anchor.querySelector('.wrapper-slider') as HTMLElement;
  }

  public append(component: Handle | Bar, anchor: HTMLElement) {
    component.init(anchor);
  }
}

export default Template;
