import { Model } from "../Model/Model";
import { View } from "../View/View";
import { IntervalView } from "../View/IntervalView";
import { VisualModel } from "../Model/VisualModel";

class Controller {
  private model = new Model();
  private visualModel = new VisualModel();
  private view: View = new View();
  private intervalView: IntervalView = new IntervalView();

  constructor() {
    this.model.setState({
      min: 11,
      max: 98,
      values: [31, 58],
      step: 5,
    });
    this.visualModel.setState({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "double",
    });

    if (this.visualModel.state.type === "double") {
      this._bindView(this.intervalView);
    } else {
      this._bindView(this.view);
    }

    this.visualModel.setState({});
  }

  private _bindView(ExtendsView: View | IntervalView) {
    this.visualModel.on("newVisualModel", (state: {}) => ExtendsView.renderTemplate(state));
    ExtendsView.on("finishRenderTemplate", (wrapper: HTMLElement) => this._arrangeHandlers(wrapper));
    this.model.on("pxValueDone", (obj: {}) => ExtendsView.renderValues(obj));
  }

  // Начальная расстановка бегунков
  private _arrangeHandlers(wrapper: HTMLElement) {
    const handlers = wrapper.querySelectorAll(".slider__handler");
    const edge = wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;

    for (let i = 0; i < handlers.length; i++) {
      this.model.setState({
        edge,
        tempTarget: handlers[i],
        tempValue: (this.model.state.values as number[])[i],
      });
    }

    this._listenUserEvents(wrapper, edge);
  }

  private _listenUserEvents(wrapper: HTMLElement, edge: number) {
    wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const tempTarget = e.target;
      const shiftX = e.offsetX;

      const mousemove = _onMouseMove.bind(this);
      const mouseup = _onMouseUp;

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function _onMouseMove(this: Controller, e: MouseEvent) {
        const left = e.clientX - shiftX - wrapper.offsetLeft;

        this.model.setState({ left, tempTarget });
      }

      function _onMouseUp() {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    });
  }
}

export { Controller };
