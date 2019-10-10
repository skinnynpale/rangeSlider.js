import { Observer } from "../Observer/Observer";
import { constants } from "../constants";
import { IVisualModel } from "../Model/VisualModel";

interface ITemp {
  tempPxValue: number;
  tempPxValues: number[];
  tempValue: number;
  tempTarget: HTMLElement;
}

class View extends Observer {
  protected state: any = {};
  private wrapper!: HTMLElement;

  constructor(public anchor: HTMLElement = document.body) {
    super();
  }

  public update(state: IVisualModel) {
    if (state.direction && state.skin && state.type) {
      Object.assign(this.state, arguments[0]);
      this._renderTemplate(state);
    }
  }

  private _recreateTemplate() {
    if (this.wrapper !== undefined) {
      (this.wrapper.parentElement as HTMLElement).removeChild(this.wrapper);
    }
  }

  private _renderTemplate({ direction, skin, bar, tip, type }: IVisualModel) {
    // this._recreateTemplate();

    // const sliderTemplate = `
    //   <div class="wrapper-slider wrapper-slider--${direction}">
    //     <div class="slider slider--${direction} slider--${skin}">
    //       ${bar ? `<div class="slider__bar"></div>` : ""}
    //       <div class="slider__handler">
    //         ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ""}
    //       </div>
    //       ${
    //         type === "double"
    //           ? `<div class="slider__handler">
    //         ${tip ? `<div class="slider__tip">  <div class="slider__tongue"></div></div>` : ""}
    //       </div>`
    //           : ""
    //       }
    //     </div>
    //   </div>
    // `;

    // this.anchor.insertAdjacentHTML("afterbegin", sliderTemplate);
    this.wrapper = this.anchor.querySelector(".wrapper-slider") as HTMLElement;
    const handlers = this.wrapper.querySelectorAll(".slider__handler");

    let edge;
    if (direction === constants.DIRECTION_VERTICAL) {
      edge = this.wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight;
    } else {
      edge = this.wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;
    }

    this._listenUserEvents();
    this.emit("finishRenderTemplate", { handlers, edge });
  }

  private _listenUserEvents() {
    this.wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const tempTarget = e.target as HTMLElement;
      const shiftX = e.offsetX;
      const shiftY = tempTarget.offsetHeight - e.offsetY;

      const onmousemove = _onMouseMove.bind(this);
      const onmouseup = _onMouseUp;

      document.addEventListener("mousemove", onmousemove);
      document.addEventListener("mouseup", onmouseup);

      function _onMouseMove(this: View, e: MouseEvent) {
        let left;
        if (this.state.direction === constants.DIRECTION_VERTICAL) {
          left = this.wrapper.offsetHeight - e.clientY - shiftY + this.wrapper.getBoundingClientRect().top;
        } else {
          left = e.clientX - shiftX - this.wrapper.offsetLeft;
        }

        this.emit("onUserMove", { left, tempTarget });
      }

      function _onMouseUp() {
        document.removeEventListener("mousemove", onmousemove);
        document.removeEventListener("mouseup", onmouseup);
      }
    });
  }
}

export { View, ITemp };
