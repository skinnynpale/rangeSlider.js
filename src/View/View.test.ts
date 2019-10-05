import { expect } from "chai";
import { View } from "./View";

import jsdom from "jsdom";

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');
const document = dom.window.document;

describe("View", () => {
  let anchor: HTMLElement;

  beforeEach(() => {
    anchor = document.createElement("div");
    anchor.className = "anchor";
  });

  afterEach(() => {
    anchor.innerHTML = "";
  });

  it("Должен правильно отрисовать DOM отталкиваясь от настроек", () => {
    const view = new View(anchor);
    view.renderTemplate({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "single",
    });

    expect(anchor.children[0].className).to.include("wrapper-slider wrapper-slider--horizontal");
    expect(anchor.children[0].children[0].className).to.include("slider slider--horizontal slider--green");
    expect(anchor.querySelectorAll(".slider__handler").length).to.equal(1);
    expect(anchor.querySelectorAll(".slider__bar").length).to.eq(1);
    expect(anchor.querySelectorAll(".slider__tip").length).to.eq(1);
  });
  it("Должен правильно отрисовать DOM отталкиваясь от настроек", () => {
    const view = new View(anchor);
    view.renderTemplate({
      direction: "horizontal",
      skin: "green",
      bar: false,
      tip: false,
      type: "double",
    });

    expect(anchor.querySelectorAll(".slider__bar").length).to.eq(0);
    expect(anchor.querySelectorAll(".slider__tip").length).to.eq(0);
    expect(anchor.querySelectorAll(".slider__handler").length).to.equal(2);
  });
});
