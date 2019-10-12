import { IVisualModel } from "../../../../helpers/interfaces";

import { Bar } from "../Bar/Bar";
import { Handler } from "../Handler/Handler";
import { Tip } from "../Tip/Tip";

export interface Template {
  init(obj: IVisualModel, anchor: HTMLElement): void;
  append(component: Handler | Bar | Tip, anchor: HTMLElement): void;
}

export class Template implements Template {
  public templateHTML!: HTMLElement;

  public init({ skin, direction }: IVisualModel, anchor: HTMLElement) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}"></div>
      </div>
    `;

    anchor.insertAdjacentHTML("afterbegin", sliderTemplate);
    this.templateHTML = anchor.querySelector(".wrapper-slider") as HTMLElement;
  }

  public append(component: Handler | Bar, anchor: HTMLElement) {
    component.init(anchor);
  }
}