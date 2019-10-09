// import { constants } from "../../constants";
// import { View } from "../View";

// class ScaleView extends View {
//   private dashesWrapper!: HTMLElement;

//   constructor(anchor: HTMLElement) {
//     super(anchor);

//     const dashesWrapper = `<div class="slider__scale scale"></div>`;
//     anchor.insertAdjacentHTML("afterbegin", dashesWrapper);
//     this.dashesWrapper = anchor.querySelector(".slider__scale") as HTMLElement;

//     console.log(this);
//   }

//   public _render(amount: number) {
//     const dashHTML = `<div class="scale__dash"></div>`;
//     // const handler = (this.dashesWrapper.parentElement as HTMLElement).querySelector(".slider__handler") as HTMLElement;

//     for (let i = 0; i < amount; i++) {
//       this.dashesWrapper.insertAdjacentHTML("beforeend", dashHTML);
//       // (this.dashesWrapper.children[i] as HTMLElement).style.marginBottom = scaleValues[0] + "px";
//     }

//     // if (direction === constants.DIRECTION_VERTICAL) {
//     //   this.dashesWrapper.style.height = edge + "px";
//     //   this.dashesWrapper.style.top = `${handler.offsetWidth / 2}px`;
//     // } else {
//     //   this.dashesWrapper.style.width = edge + "px";
//     //   this.dashesWrapper.style.left = `${handler.offsetWidth / 2}px`;
//     // }
//   }
// }

// export { ScaleView };
