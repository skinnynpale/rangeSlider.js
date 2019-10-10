import { ITemp } from "../View";
import { IVisualModel } from "../../Model/VisualModel";
import { Observer } from "../../Observer/Observer";

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
  constructor(public anchor: HTMLElement) {}

  public init(anchor: HTMLElement) {
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

  public append(component: Handler | Bar | Tip, anchor: HTMLElement) {
    component.init(anchor);
  }
}

/**
 * Guifactory
 */

interface GUIFactory {
  createBar(): Bar;
  createTip(): Tip;
  createHandler(anchor: HTMLElement): Handler;
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

  public createHandler(anchor: HTMLElement): Handler {
    return new SingleHorizontalHandler(anchor);
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

  public createHandler(anchor: HTMLElement): Handler {
    return new SingleVerticalHandler(anchor);
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

  public createHandler(anchor: HTMLElement): Handler {
    return new IntervalHorizontalHandler(anchor);
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

  public createHandler(anchor: HTMLElement): Handler {
    return new IntervalVerticalHandler(anchor);
  }

  public createTemplate(): Template {
    return new Template();
  }
}

// TODO Вынести интерфейсы в helpers

interface IOnlyBoolean {
  [key: string]: boolean;
}

interface IOnlyString {
  [key: string]: string;
}

interface IOnlyHTMLElements {
  [key: string]: HTMLElement;
}

/**
 * Application
 *
 */

class Application {
  private bar?: Bar;
  private tip?: Tip;
  private handler!: Handler;
  private template!: Template;
  private factory: GUIFactory;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  public createUI({ bar, tip }: IOnlyBoolean, anchor: HTMLElement) {
    this.template = this.factory.createTemplate();
    this.handler = this.factory.createHandler(anchor);

    bar ? (this.bar = this.factory.createBar()) : "";
    tip ? (this.tip = this.factory.createTip()) : "";
  }

  public init(state: IVisualModel, anchor: HTMLElement) {
    this.template.init(state, anchor);

    const UIs = Object.keys(this);
    for (const UI of UIs) {
      if (UI === "factory" || UI === "template" || UI === "tip") continue;

      this.template.append((this as any)[UI], anchor);
    }

    this.tip ? this.handler.append(this.tip) : "";
  }

  public paint(state: {}) {
    const UIs = Object.keys(this);

    for (const UI of UIs) {
      if (UI === "factory" || UI === "template") continue;

      (this as any)[UI].paint(state);
    }
  }
}

/**
 * Application configurator
 */

// TODO Переименовать double в interval

class ApplicationConfigurator {
  public main({ type, direction }: IOnlyString) {
    let factory: SingleHorizontalFactory | SingleVerticalFactory;

    if (type === "single" && direction === "horizontal") {
      factory = new SingleHorizontalFactory();
    } else if (type === "single" && direction === "vertical") {
      factory = new SingleVerticalFactory();
    } else if (type === "double" && direction === "horizontal") {
      factory = new IntervalHorizontalFactory();
    } else if (type === "double" && direction === "vertical") {
      factory = new IntervalVerticalFactory();
    } else {
      throw new Error("Error! Unknown " + type + " or " + direction);
    }

    return new Application(factory);
  }
}

export { ApplicationConfigurator, Application };
