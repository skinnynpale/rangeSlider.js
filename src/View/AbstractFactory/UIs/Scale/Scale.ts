import { Observer } from "../../../../Observer/Observer";
import { IOnlyNumbers } from "../../../../helpers/interfaces";

export interface Scale {
  init(anchor: HTMLElement): void;
  paint({ amount, edge }: IOnlyNumbers): void;
}

export class Scale extends Observer implements Scale {
  protected slider!: HTMLElement;
  protected scaleHTML!: HTMLElement;
  protected anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    this.slider = anchor.querySelector(".slider") as HTMLElement;

    const scaleTemplate = `<div class="slider__scale scale"></div>`;
    this.slider.insertAdjacentHTML("afterbegin", scaleTemplate);
  }
}

export class HorizontalScale extends Scale implements Scale {
  public paint({ amount, edge, ratio }: IOnlyNumbers) {
    this.scaleHTML = this.anchor.querySelector(".slider__scale") as HTMLElement;
    const dashTemplate = `<div class="scale__dash"></div>`;

    for (let i = 0; i < amount + 1; i++) {
      this.scaleHTML.insertAdjacentHTML("beforeend", dashTemplate);
    }

    this.scaleHTML.style.width = edge + "px";
    const handler = this.slider.querySelector(".slider__handler") as HTMLElement;
    this.scaleHTML.style.marginLeft = `${handler.offsetWidth / 2}px`;
  }
}

export class VerticalScale extends Scale implements Scale {
  public paint({ amount, edge, ratio }: IOnlyNumbers) {
    this.scaleHTML = this.anchor.querySelector(".slider__scale") as HTMLElement;
    const dashTemplate = `<div class="scale__dash"></div>`;

    for (let i = 0; i < amount + 1; i++) {
      this.scaleHTML.insertAdjacentHTML("beforeend", dashTemplate);
    }

    this.scaleHTML.style.height = edge + "px";
    const handler = this.slider.querySelector(".slider__handler") as HTMLElement;
    this.scaleHTML.style.marginTop = `${handler.offsetWidth / 2}px`;
  }
}
