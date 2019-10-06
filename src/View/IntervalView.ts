import { View } from "./View";

class IntervalView extends View {
  constructor() {
    super();
  }

  public renderValues({ tempPxValue, tempPxValues, tempValue, tempTarget }: any) {
    const tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
    const bar = tempTarget.parentElement.querySelector(".slider__bar");

    tempTarget.style.left = tempPxValue + "px";
    bar.style.left = tempPxValues[0] + "px";
    bar.style.width = tempPxValues[1] - tempPxValues[0] + 10 + "px";
    tip.setAttribute("data-value", `${tempValue}`);
  }
}

export { IntervalView };
