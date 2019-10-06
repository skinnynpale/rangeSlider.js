import { Observer } from "../Observer/Observer";

class View extends Observer {
  private wrapper!: HTMLElement;
  private state: any = {};
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

    Object.assign(this.state, arguments[0]);

    this.anchor.insertAdjacentHTML("afterbegin", sliderTemplate);
    this.wrapper = this.anchor.querySelector(".wrapper-slider") as HTMLElement;

    this.emit("finishRenderTemplate", this.wrapper);
  }

  public renderValues({ tempPxValue, tempPxValues, tempValue, tempTarget }: any) {
    const tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
    const bar = tempTarget.parentElement.querySelector(".slider__bar");

    if (this.state.direction === "vertical") {
      if (this.state.type === "double") {
        bar.style.bottom = tempPxValues[0] + "px";
        bar.style.height = tempPxValues[1] - tempPxValues[0] + 10 + "px";
      } else {
        bar.style.height = tempPxValue + 10 + "px";
      }
    } else {
      if (this.state.type === "double") {
        bar.style.left = tempPxValues[0] + "px";
        bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + "px";
      } else {
        bar.style.width = tempPxValue + 10 + "px";
      }
    }
    if (this.state.direction === "vertical") {
      tempTarget.style.bottom = tempPxValue + "px";
    } else {
      tempTarget.style.left = tempPxValue + "px";
    }
    tip.setAttribute("data-value", `${tempValue}`);
  }
}

export { View };
