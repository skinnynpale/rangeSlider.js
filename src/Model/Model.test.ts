import { expect } from 'chai';
import Model from './Model';

describe('Model', () => {
  it('Должен поставить кастомные настройки', () => {
    const model = new Model({
      min: 10,
      max: 80,
      step: 3,
      values: [50],
    });
    expect(model.state.min).to.equal(10);
    expect(model.state.max).to.equal(80);
    expect(model.state.values).to.deep.equal([52, 80]);
    expect(model.state.step).to.equal(3);

    model.setState({
      min: 10,
      max: 51,
      step: 2,
      values: [20, 60],
    });
    expect(model.state.min).to.equal(10);
    expect(model.state.max).to.equal(51);
    expect(model.state.values).to.deep.equal([20, 51]);
    expect(model.state.step).to.equal(2);
  });
  it('Должен исправить min/max если заходят друг за друга', () => {
    let model = new Model({
      min: 90,
      max: 80,
      step: 2,
      values: [60],
    });
    expect(model.state.min).to.equal(80);
    expect(model.state.max).to.equal(90);

    model = new Model({
      min: 10,
      max: -5,
      step: 2,
      values: [60],
    });
    expect(model.state.min).to.equal(-5);
    expect(model.state.max).to.equal(10);

    model = new Model({
      min: 0,
      max: 0,
      step: 2,
      values: [60],
    });
    expect(model.state.min).to.equal(0);
    expect(model.state.max).to.equal(0);
  });
  it('Должен исправить шаг', () => {
    let model = new Model({
      step: 90,
      max: 50,
      min: 10,
      values: [60],
    });
    expect(model.state.step).to.equal(40);

    model = new Model({
      step: -1,
      max: 50,
      min: 10,
      values: [60],
    });
    expect(model.state.step).to.eq(1);

    model = new Model({
      step: -1,
      max: -2,
      min: 10,
      values: [60],
    });
    expect(model.state.step).to.eq(1);
  });
  it('Должен вернуть откорректированное значение', () => {
    let model = new Model({
      min: 10,
      max: 79,
      values: [89],
      step: 2,
    });
    expect(model.state.values).to.deep.eq([79, 79]);

    model = new Model({
      min: 11,
      max: 79,
      values: [5],
      step: 2,
    });
    expect(model.state.values).to.deep.eq([11, 79]);

    model = new Model({
      min: 10,
      max: 80,
      values: [0],
      step: 3,
    });
    expect(model.state.values).to.deep.eq([10, 80]);
  });
  it('Должен все сделать в правильном порядке', () => {
    const model = new Model({
      min: 50,
      max: -200,
      values: [-31],
      step: 6,
    });
    expect(model.state.min).to.eq(-200);
    expect(model.state.max).to.eq(50);
  });
  it('Должен отсортировать значения', () => {
    const model = new Model({
      min: 10,
      max: 80,
      values: [60, -40],
      step: 3,
    });
    expect(model.state.values).to.deep.eq([10, 61]);
  });
  it('Должен исправить значения основанные на шаге', () => {
    let model = new Model({
      min: 9,
      max: 78,
      values: [11],
      step: 3,
    });
    expect(model.state.values).to.deep.eq([12, 78]);

    model = new Model({
      min: 9,
      max: 80,
      values: [31],
      step: 3,
    });
    expect(model.state.values).to.deep.eq([30, 80]);

    model = new Model({
      step: 9,
      values: [13, 50],
      max: 52,
      min: 10,
    });
    expect(model.state.values).to.deep.eq([10, 52]);

    model = new Model({
      step: 9,
      values: [30, 10],
      max: 52,
      min: 10,
    });
    expect(model.state.values).to.deep.eq([10, 28]);

    model = new Model({
      step: 9,
      values: [10, 19],
      max: 23,
      min: 10,
    });
    expect(model.state.values).to.deep.eq([10, 19]);
  });
  it('Должен вернуть правильный массив прогрессии', () => {
    const model = new Model({
      min: 10,
      max: 52,
      step: 10,
      values: [13, 50],
    });
    // @ts-ignore
    expect(model.countArrayOfProgression(model.state)).to.deep.eq([10, 20, 30, 40, 50]);
    // @ts-ignore

    model.setState({ step: 3, max: 19, min: 9 });
    // @ts-ignore
    expect(model.countArrayOfProgression(model.state)).to.deep.eq([9, 12, 15, 18]);

    // @ts-ignore
    model.setState({ step: 50, max: -2, min: -1 });
    // @ts-ignore
    expect(model.countArrayOfProgression(model.state)).to.deep.eq([-2, -1]);
  });
});
