import { ITemp } from "../../../../helpers/interfaces";

export interface Bar {
  paint({ tempPxValue, tempPxValues, tempValue, tempTarget }: ITemp): void;
  init(anchor: HTMLElement): void;
}

export class Bar implements Bar {
  public init(anchor: HTMLElement) {
    const barTemplate = `<div class="slider__bar"></div>`;
    const slider = anchor.querySelector(".slider") as HTMLElement;
    slider.insertAdjacentHTML("beforeend", barTemplate);
  }
}

export class SingleHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.width = tempPxValue + 10 + "px");
  }
}

export class SingleVerticalBar extends Bar implements Bar {
  public paint({ tempPxValue, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.height = tempPxValue + 10 + "px");
  }
}

export class IntervalHorizontalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.left = tempPxValues[0] + "px");
    bar && (bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + "px");
  }
}

export class IntervalVerticalBar extends Bar implements Bar {
  public paint({ tempPxValues, tempTarget }: ITemp) {
    const bar = tempTarget.parentElement && (tempTarget.parentElement.querySelector(".slider__bar") as HTMLElement);

    bar && (bar.style.bottom = tempPxValues[0] + "px");
    bar && (bar.style.height = tempPxValues[1] - tempPxValues[0] + 10 + "px");
  }
}
