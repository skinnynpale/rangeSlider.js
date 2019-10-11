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

  it("Должен создать SettingsTemplate", () => {
    const settings = new Settings();
    settings.init(anchor);

    expect(anchor.querySelectorAll(".settings").length).to.eq(1);
  });

  it("Должен расставить переданные значения в инпуты", () => {
    const settings = new Settings();
    settings.init(anchor);
    settings.paint({
      min: 10,
      max: 50,
      step: 5,
      values: [20, 40],
    });

    const settingsHTML = anchor.querySelector(".settings") as HTMLElement;

    expect((settingsHTML.querySelector("#min") as HTMLInputElement).value).to.eq("10");
    expect((settingsHTML.querySelector("#max") as HTMLInputElement).value).to.eq("50");
    expect((settingsHTML.querySelector("#step") as HTMLInputElement).value).to.eq("5");
    expect((settingsHTML.querySelector("#valueFrom") as HTMLInputElement).value).to.eq("20");
    expect((settingsHTML.querySelector("#valueTo") as HTMLInputElement).value).to.eq("40");
  });
});
