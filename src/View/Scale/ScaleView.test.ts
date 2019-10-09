// import { expect } from "chai";
// import { ScaleView } from "./ScaleView";

// import jsdom from "jsdom";
// const { JSDOM } = jsdom;
// const dom = new JSDOM('<html><body id="root"></body></html>');
// const document = dom.window.document;

// describe("ScaleView", () => {
//   let anchor: HTMLElement;

//   beforeEach(() => {
//     anchor = document.createElement("div");
//     anchor.className = "anchor";
//   });

//   afterEach(() => {
//     anchor.innerHTML = "";
//   });

//   it("Должен создать HTML блок и впихнуть в anchor", () => {
//     const scaleView = new ScaleView(anchor);
//     scaleView._render(5);

//     expect(anchor.querySelectorAll(".slider__scale").length).to.eq(1);
//     expect(anchor.querySelectorAll(".scale__dash").length).to.eq(5);
//   });
// });
