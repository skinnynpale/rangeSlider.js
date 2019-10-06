import { Observer } from "../Observer/Observer";

class View extends Observer {
  private wrapper!: HTMLElement;
  constructor(public anchor: HTMLElement = document.body) {
    super();
  }

  public renderTemplate({ direction, skin, bar, tip, type }: any) {
    // если уже создавали, то удалить и заново создать
    if (this.wrapper !== undefined) {
      (this.wrapper.parentElement as HTMLElement).removeChild(this.wrapper);
    }

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
    this.wrapper = this.anchor.querySelector(".wrapper-slider") as HTMLElement;

    this.emit("finishRenderTemplate", this.wrapper);
  }

  public renderValues({ tempPxValue, tempPxValues, tempValue, tempTarget }: any) {
    const tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
    const bar = tempTarget.parentElement.querySelector(".slider__bar");

    console.log(arguments[0]);

    tempTarget.style.left = tempPxValue + "px";
    bar.style.left = tempPxValues[0] + "px";
    bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + "px";
    tip.setAttribute("data-value", `${tempValue}`);

    // tempTarget.style.left = tempPxValue + "px";
    // bar.style.width = tempPxValue + 10 + "px";
    // tip.setAttribute("data-value", `${tempValue}`);
  }
}

export { View };
