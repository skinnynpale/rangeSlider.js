import { expect } from "chai";
import { ApplicationConfigurator } from "./Application";
import { IntervalHorizontalFactory } from "./Factories/Factories";

import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');
const document = dom.window.document;

describe("ApplicationConfigurator", () => {
  let anchor: HTMLElement;

  beforeEach(() => {
    anchor = document.createElement("div");
    anchor.className = "anchor";
  });

  afterEach(() => {
    anchor.innerHTML = "";
  });

  it("Должен верно определить фабрику", () => {
    const applicationConfigurator = new ApplicationConfigurator().main({
      type: "interval",
      direction: "horizontal",
    }, anchor);

    // @ts-ignore
    expect(applicationConfigurator.factory).to.deep.equal(new IntervalHorizontalFactory());
  });

  it("Должен выкинуть исключение на неверные данные", () => {
    const applicationConfigurator = new ApplicationConfigurator();
    const func = applicationConfigurator.main.bind(applicationConfigurator, {
      type: "okay",
      direction: "bro",
    }, anchor);

    // @ts-ignore
    expect(func).to.throw("Error! Unknown okay or bro");
  });
});
