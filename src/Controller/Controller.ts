import { Model } from "../Model/Model";
import { View } from "../View/View";

class Controller {
  private model = new Model();
  private view = new View();

  constructor() {
    this.view.on("finishRenderTemplate", (wrapper: HTMLElement) => this._arrangeHandlers(wrapper));
    this.model.on("pxValueDone", (obj: {}) => this.view.renderValues(obj));

    this.model.setState({
      min: 11,
      max: 98,
      values: [30, 60],
      step: 5,
    });
    this.view.renderTemplate({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "double",
    });
  }

  private _arrangeHandlers(wrapper: HTMLElement) {
    const handlers = wrapper.querySelectorAll(".slider__handler");
    const edge = wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;

    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        target: handlers[i],
        value: (this.model.state.values as number[])[i],
      });
    }

    this._addListener(wrapper, edge);
  }

  private _addListener(wrapper: HTMLElement, edge: number) {
    wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const target = e.target;
      const shiftX = e.offsetX;

      const mousemove = _onMouseMove.bind(this);
      const mouseup = _onMouseUp;

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function _onMouseMove(this: Controller, e: MouseEvent) {
        let left = e.clientX - shiftX - wrapper.offsetLeft;

        left = left < 0 ? 0 : left;
        left = left > edge ? edge : left;

        this.model.setState({ left, target });
      }

      function _onMouseUp() {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    });
  }
}

export { Controller };
