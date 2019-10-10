import { Observer } from "../../Observer/Observer";
import { constants } from "../../helpers/constants";
import { ITemp, IVisualModel, IOnlyBoolean, IOnlyString } from "../../helpers/interfaces";

/**
 * Bar
 */

interface Bar {
  paint({ tempPxValue, tempPxValues, tempValue, tempTarget }: ITemp): void;
  init(anchor: HTMLElement): void;
}

class Bar implements Bar {
  public init(anchor: HTMLElement) {
    const barTemplate = `<div class="slider__bar"></div>`;
    const slider = anchor.querySelector(".slider") as HTMLElement;
    slider.insertAdjacentHTML("beforeend", barTemplate);
  }
}

class SingleHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.width = tempPxValue + 10 + "px");
  }
}

class SingleVerticalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.height = tempPxValue + 10 + "px");
  }
}

class IntervalHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.left = tempPxValues[0] + "px");
    bar && (bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + "px");
  }
}

class IntervalVerticalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.bottom = tempPxValues[0] + "px");
    bar && (bar.style.height = tempPxValues[1] - tempPxValues[0] + 10 + "px");
  }
}

/**
 * Tip
 */

class Tip {
  public paint({ tempTarget, tempValue }: ITemp) {
    const tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
    tip.setAttribute("data-value", `${tempValue}`);
  }

  public init(handler: HTMLElement) {
    const tipTemplate = `<div class="slider__tip"><div class="slider__tongue"></div></div>`;
    handler.insertAdjacentHTML("beforeend", tipTemplate);
  }
}

/**
 * Handler
 */

interface Handler {
  paint({ tempTarget, tempPxValue }: ITemp): void;
  init(anchor: HTMLElement): void;
  append(component: Tip): void;
}

class Handler implements Handler {
  protected anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = `<div class="slider__handler"></div>`;
    const slider = anchor.querySelector(".slider") as HTMLElement;
    slider.insertAdjacentHTML("beforeend", handlerTemplate);
  }

  public append(component: Tip) {
    const handlers = this.anchor.querySelectorAll(".slider__handler");

    for (const handler of Array.from(handlers)) {
      component.init(handler as HTMLElement);
    }
  }
}

class SingleHorizontalHandler extends Handler implements Handler {
  public paint({ tempTarget, tempPxValue }: ITemp) {
    tempTarget.style.left = tempPxValue + "px";
  }
}

class SingleVerticalHandler extends Handler implements Handler {
  public paint({ tempTarget, tempPxValue }: ITemp) {
    tempTarget.style.bottom = tempPxValue + "px";
  }
}

class IntervalHorizontalHandler extends Handler implements Handler {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = `<div class="slider__handler"></div>`;
    const slider = anchor.querySelector(".slider") as HTMLElement;
    slider.insertAdjacentHTML("beforeend", handlerTemplate);
    slider.insertAdjacentHTML("beforeend", handlerTemplate);
  }

  public paint({ tempTarget, tempPxValue }: ITemp) {
    tempTarget.style.left = tempPxValue + "px";
  }
}

class IntervalVerticalHandler extends Handler implements Handler {
  public init(anchor: HTMLElement) {
    this.anchor = anchor;
    const handlerTemplate = `<div class="slider__handler"></div>`;
    const slider = anchor.querySelector(".slider") as HTMLElement;
    slider.insertAdjacentHTML("beforeend", handlerTemplate);
    slider.insertAdjacentHTML("beforeend", handlerTemplate);
  }

  public paint({ tempTarget, tempPxValue }: ITemp) {
    tempTarget.style.bottom = tempPxValue + "px";
  }
}

/**
 * Template
 */

interface Template {
  init({ skin, direction }: IVisualModel, anchor: HTMLElement): void;
  append(component: Handler | Bar | Tip, anchor: HTMLElement): void;
}

class Template implements Template {
  public init({ skin, direction }: IVisualModel, anchor: HTMLElement) {
    const sliderTemplate = `
      <div class="wrapper-slider wrapper-slider--${direction}">
        <div class="slider slider--${direction} slider--${skin}"></div>
      </div>
    `;

    anchor.insertAdjacentHTML("afterbegin", sliderTemplate);
  }

  public append(component: Handler | Bar, anchor: HTMLElement) {
    component.init(anchor);
  }
}

/**
 * Guifactory
 */

interface GUIFactory {
  createBar(): Bar;
  createTip(): Tip;
  createHandler(): Handler;
  createTemplate(): Template;
}

/**
 * Factories
 */
class SingleHorizontalFactory implements GUIFactory {
  public createBar(): Bar {
    return new SingleHorizontalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new SingleHorizontalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }
}

class SingleVerticalFactory implements GUIFactory {
  public createBar(): Bar {
    return new SingleVerticalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new SingleVerticalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }
}

class IntervalHorizontalFactory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalHorizontalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new IntervalHorizontalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }
}

class IntervalVerticalFactory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalVerticalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new IntervalVerticalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }
}

/**
 * Application
 *
 */

class Application extends Observer {
  private bar?: Bar;
  private tip?: Tip;
  private handler!: Handler;
  private template!: Template;

  constructor(private factory: GUIFactory, private anchor: HTMLElement) {
    super();
  }

  public createUI({ bar, tip }: IOnlyBoolean) {
    this.template = this.factory.createTemplate();
    this.handler = this.factory.createHandler();

    bar ? (this.bar = this.factory.createBar()) : "";
    tip ? (this.tip = this.factory.createTip()) : "";
  }

  public init(state: IVisualModel) {
    this.template.init(state, this.anchor);

    const UIs = Object.keys(this);
    for (const UI of UIs) {
      if (UI === "factory" || UI === "template" || UI === "tip" || UI === "events" || UI === "anchor") continue;

      this.template.append((this as any)[UI], this.anchor);
    }

    // Коллаборации
    this.tip ? this.handler.append(this.tip) : "";
    // Коллаборации

    // для правильной отрисовки
    const edge = this.getEdge(state);
    const handlers = this.anchor.querySelectorAll(".slider__handler");
    const wrapper = this.anchor.querySelector(".wrapper-slider") as HTMLElement;

    this.listenUserEvents(wrapper, state);
    this.emit("finishInit", { handlers, edge });
  }

  public paint(state: ITemp) {
    const UIs = Object.keys(this);

    for (const UI of UIs) {
      if (UI === "factory" || UI === "template" || UI === "events" || UI === "anchor") continue;

      (this as any)[UI].paint(state);
    }
  }

  private getEdge(state: IVisualModel) {
    const wrapper = this.anchor.querySelector(".wrapper-slider") as HTMLElement;
    const handlers = this.anchor.querySelectorAll(".slider__handler");

    if (state.direction === constants.DIRECTION_VERTICAL) {
      return wrapper.clientHeight - (handlers[0] as HTMLElement).offsetHeight;
    } else {
      return wrapper.offsetWidth - (handlers[0] as HTMLElement).offsetWidth;
    }
  }

  private listenUserEvents(wrapper: HTMLElement, state: IVisualModel) {
    wrapper.addEventListener("mousedown", e => {
      e.preventDefault();
      if ((e.target as HTMLElement).className !== "slider__handler") return;

      const tempTarget = e.target as HTMLElement;
      const shiftX = e.offsetX;
      const shiftY = tempTarget.offsetHeight - e.offsetY;

      const onmousemove = _onMouseMove.bind(this);
      const onmouseup = _onMouseUp;

      document.addEventListener("mousemove", onmousemove);
      document.addEventListener("mouseup", onmouseup);

      function _onMouseMove(this: Application, e: MouseEvent) {
        let left;
        if (state.direction === constants.DIRECTION_VERTICAL) {
          left = wrapper.offsetHeight - e.clientY - shiftY + wrapper.getBoundingClientRect().top;
        } else {
          left = e.clientX - shiftX - wrapper.offsetLeft;
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

/**
 * Application configurator
 */

class ApplicationConfigurator {
  public main({ type, direction }: IOnlyString, anchor: HTMLElement) {
    let factory;

    if (type === "single" && direction === "horizontal") {
      factory = new SingleHorizontalFactory();
    } else if (type === "single" && direction === "vertical") {
      factory = new SingleVerticalFactory();
    } else if (type === "interval" && direction === "horizontal") {
      factory = new IntervalHorizontalFactory();
    } else if (type === "interval" && direction === "vertical") {
      factory = new IntervalVerticalFactory();
    } else {
      throw new Error("Error! Unknown " + type + " or " + direction);
    }

    return new Application(factory, anchor);
  }
}

export { ApplicationConfigurator, Application };
