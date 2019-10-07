import { Observer } from "../Observer/Observer";

class View extends Observer {
  private wrapper!: HTMLElement;
  private state: any = {};

  constructor(public anchor: HTMLElement = document.body) {
    super();
  }

  public update(state: any) {
    if (state.direction && state.skin && state.type) {
      Object.assign(this.state, arguments[0]);
      this._renderTemplate(state);
    } else {
      this._renderValues(state);
    }
  }

  private _recreateTemplate() {
    if (this.wrapper !== undefined) {
      (this.wrapper.parentElement as HTMLElement).removeChild(this.wrapper);
    }
  }

  private _renderTemplate({ direction, skin, bar, tip, type }: any) {
    this._recreateTemplate();

    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}">
          <div class="slider__dashes">
            <div class="slider__dash"></div>
            <div class="slider__dash"></div>
            <div class="slider__dash"></div>
            <div class="slider__dash"></div>
            <div class="slider__dash"></div>
            <div class="slider__dash"></div>
          </div>
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
    const handlers = this.wrapper.querySelectorAll(".slider__handler");

    let edge;
    if (this.state.direction === "vertical") {
      edge = this.wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight;
    } else {
      edge = this.wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;
    }

    this._listenUserEvents();
    this.emit("finishRenderTemplate", { handlers, edge });
  }

  private _renderValues({ tempPxValue, tempPxValues, tempValue, tempTarget }: any) {
    if (!tempTarget) return;

    let tip;
    if (this.state.tip === true) {
      tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
      tip.setAttribute("data-value", `${tempValue}`);
    }
    let bar;
    if (this.state.bar === true) {
      bar = tempTarget.parentElement.querySelector(".slider__bar");

      if (this.state.direction === "vertical") {
        if (this.state.type === "double") {
          console.log(tempPxValues);
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
    }

    if (this.state.direction === "vertical") {
      tempTarget.style.bottom = tempPxValue + "px";
    } else {
      tempTarget.style.left = tempPxValue + "px";
    }
  }

  private _listenUserEvents() {
    this.wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const tempTarget = e.target as HTMLElement;
      const shiftX = e.offsetX;
      const shiftY = tempTarget.offsetHeight - e.offsetY;

      const mousemove = _onMouseMove.bind(this);
      const mouseup = _onMouseUp;

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function _onMouseMove(this: View, e: MouseEvent) {
        let left;
        if (this.state.direction === "vertical") {
          left = this.wrapper.offsetHeight - e.clientY - shiftY + this.wrapper.getBoundingClientRect().top;
        } else {
          left = e.clientX - shiftX - this.wrapper.offsetLeft;
        }

        this.emit("onUserMove", { left, tempTarget });
      }

      function _onMouseUp() {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    });
  }
}

export { View };
