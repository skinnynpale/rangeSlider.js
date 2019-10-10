import { expect } from "chai";
import { Settings } from "./Settings";

import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');
const document = dom.window.document;

describe("Settings", () => {
  let anchor: HTMLElement;
  beforeEach(() => {
    anchor = document.createElement("div");
    anchor.className = "anchor";
  });

  afterEach(() => {
    anchor.innerHTML = "";
  });

  it("Должен правильно создать Template", () => {
    const settings = new Settings(anchor);

    expect(anchor.querySelectorAll(".slider__settings").length).to.eq(1);
  });
});
