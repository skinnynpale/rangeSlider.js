import { expect } from "chai";
import { Model } from "./Model";

describe("Model", () => {
  it("Должен поставить кастомные настройки", () => {
    const model = new Model({
      min: 10,
      max: 80,
      step: 2,
      values: [50],
    });

    expect(model.state.min).to.equal(10);
    expect(model.state.max).to.equal(80);
    expect(model.state.values).to.deep.equal([50]);
    expect(model.state.step).to.equal(2);
  });
});
