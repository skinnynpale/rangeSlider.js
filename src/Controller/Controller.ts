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
      max: 91,
      values: [30],
      step: 5,
    });
    this.view.renderTemplate({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "single",
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
  }
}

export { Controller };
