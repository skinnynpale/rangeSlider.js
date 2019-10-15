import { ITemp } from "../../../../helpers/interfaces";

class Tip {
  public paint({ tempTarget, tempValue }: ITemp) {
    const tip = tempTarget.querySelector(".slider__tip") as HTMLElement;
    tip.setAttribute("data-value", `${tempValue}`);
  }

  public init(handler: HTMLElement) {
    const tipTemplate = "<div class=\"slider__tip\"><div class=\"slider__tongue\"></div></div>";
    handler.insertAdjacentHTML("beforeend", tipTemplate);
  }
}

export default Tip;
