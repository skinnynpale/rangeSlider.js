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

    this.anchor.insertAdjacentHTML("beforeend", sliderTemplate);

    this.emit("finishRenderTemplate", this.anchor.querySelector(".wrapper-slider"));
  }

  public renderValues({ pxValue, value, target, pxValues }: any) {
    const tip = target.querySelector(".slider__tip") as HTMLElement;
    const bar = this.anchor.querySelector(".slider__bar") as HTMLElement;

    target.style.left = pxValue + "px";
    bar.style.width = pxValue + 10 + "px";
    // bar.style.left = pxValues[0] + "px";
    // bar.style.width = pxValues[1] - pxValues[0] + 10 + "px";
    tip.setAttribute("data-value", `${value}`);
  }
}

export { View };
