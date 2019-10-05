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
  it("Должен исправить min/max если заходят друг за друга", () => {
    const model = new Model({
      min: 90,
      max: 80,
      values: [60],
    });

    expect(model.state.min).to.equal(80);
    expect(model.state.max).to.equal(90);

    model.setState({ min: 10, max: -5 });

    expect(model.state.min).to.equal(-5);
    expect(model.state.max).to.equal(10);
  });
  it("Должен исправить шаг", () => {
    const model = new Model({
      step: 90,
      max: 50,
      values: [60],
    });

    expect(model.state.step).to.equal(50);

    model.setState({ step: -1 });

    expect(model.state.step).to.eq(1);
  });
  it("Должен откорректировать значение отталкиваясь от шага", () => {
    const model = new Model({
      min: 10,
      max: 80,
      values: [47],
      step: 2,
    });

    expect(model.state.values).to.deep.eq([48]);
  });
  it("Должен вернуть откорректированное значение отталкиваясь если оно заходит за min/max", () => {
    const model = new Model({
      min: 10,
      max: 79,
      values: [89],
      step: 2,
    });

    expect(model.state.values).to.deep.eq([78]);

    model.setState({ values: [5], min: 11 });
    expect(model.state.values).to.deep.eq([12]);

    model.setState({
      min: 10,
      max: 80,
      values: [0],
      step: 3,
    });

    expect(model.state.values).to.deep.eq([12]);
  });
  it("Должен все сделать в правильном порядке", () => {
    const model = new Model({
      min: 50,
      max: -200,
      values: [-31],
      step: 6,
    });

    expect(model.state.min).to.eq(-200);
    expect(model.state.max).to.eq(50);
  });
  it("Должен отсортировать значения", () => {
    const model = new Model({
      min: 10,
      max: 80,
      values: [60, -40],
      step: 3,
    });

    expect(model.state.values).to.deep.eq([12, 60]);
  });
});
