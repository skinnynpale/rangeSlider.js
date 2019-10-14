import { Settings } from "./UIs/Settings/Settings";
import { Observer } from "../../Observer/Observer";
import { constants } from "../../helpers/constants";
import { ITemp, IVisualModel, IOnlyBoolean, IOnlyString } from "../../helpers/interfaces";

/**
 * Bar
 */
import { Bar} from "./UIs/Bar/Bar";

/**
 * Tip
 */
import { Tip } from "./UIs/Tip/Tip";

/**
 * Handler
 */
import { Handler } from "./UIs/Handler/Handler";

/**
 * Template
 */
import { Template } from "./UIs/Template/Template";

/**
 * Scale
 */

import { Scale } from "./UIs/Scale/Scale";

/**
 * Factories
 */

import {
  GUIFactory,
  SingleHorizontalFactory,
  SingleVerticalFactory,
  IntervalHorizontalFactory,
  IntervalVerticalFactory,
} from "./Factories/Factories";

/**
 * Application
 *
 */

class Application extends Observer {
  public settings?: Settings;
  private scale?: Scale;
  private bar?: Bar;
  private tip?: Tip;
  private handler!: Handler;
  private template!: Template;

  constructor(private factory: GUIFactory, private anchor: HTMLElement) {
    super();
  }

  public createUI({ bar, scale, settings }: IOnlyBoolean) {
    this.template = this.factory.createTemplate();
    this.handler = this.factory.createHandler();

    bar ? (this.bar = this.factory.createBar()) : "";
    scale ? (this.scale = this.factory.createScale()) : "";
    settings ? (this.settings = this.factory.createSettings()) : "";
  }

  public init(state: IVisualModel) {
    this.template.init(state, this.anchor);

    const UIs = Object.keys(this);
    for (const UI of UIs) {
      if (UI === "factory" || UI === "template" || UI === "events" || UI === "anchor") continue;

      this.template.append((this as any)[UI], this.anchor);
    }

    // Коллаборации
    if (state.tip) {
      this.tip = this.factory.createTip();
      this.handler.append(this.tip);
    }
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
      if (UI === "factory" || UI === "template" || UI === "events" || UI === "anchor" || UI === "settings") continue;

      (this as any)[UI].paint(state);
    }
  }

  public removeHTML() {
    (this.template.templateHTML.parentElement as HTMLElement).removeChild((this.settings as Settings).settingsHTML);
    (this.template.templateHTML.parentElement as HTMLElement).removeChild(this.template.templateHTML);
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
