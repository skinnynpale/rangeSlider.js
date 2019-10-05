import { Observer } from "../Observer/Observer";

class View extends Observer {
  constructor(public anchor: HTMLElement = document.body) {
    super();
  }

  public renderTemplate({ direction, skin, bar, tip, type }: any) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}">
          ${bar ? `<div class="slider__bar"></div>` : ""}
          <div class="slider__handler">
            ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ""}
          </div>
          ${
            type === "double"
              ? `<div class="slider__handler">
            ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ""}
          </div>`
              : ""
          }
        </div>
      </div>
    `;

    this.anchor.insertAdjacentHTML("afterbegin", sliderTemplate);
  }
}

export { View };
