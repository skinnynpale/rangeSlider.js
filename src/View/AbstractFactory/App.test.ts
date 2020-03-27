import { expect } from 'chai';
import jsdom from 'jsdom';

import App from './App';
import { IntervalFactory, SingleFactory } from './Factories/Factories';
import { IntervalBar } from './UIs/Bar/Bar';
import { IntervalHandle } from './UIs/Handle/Handle';
import { defaultVisualModel } from '../../Model/defaultVisualModel';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>');
const window = dom.window;
const document = dom.window.document;
const defaults = defaultVisualModel;

describe('Application', () => {
  let anchor: HTMLElement;

  beforeEach(() => {
    anchor = document.createElement('div');
    anchor.className = 'anchor';
  });

  afterEach(() => {
    anchor.innerHTML = '';
  });

  it('Должен правильно создать сущности отталкиваясь от заданной фабрики', () => {
    const app = new App(new IntervalFactory('horizontal'), anchor);

    app.createUI({ ...defaults, bar: true });
    expect(app.UIs.bar).to.deep.equal(new IntervalBar('horizontal', anchor));
    expect(app.UIs.handle).to.deep.equal(new IntervalHandle('horizontal', anchor));
  });

  it('Должен отрисовать HTML с заданными настройками', () => {
    let app = new App(new SingleFactory('horizontal'), anchor);
    app.createUI({ ...defaults, bar: true, settings: true });
    app.init({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'single',
      scale: false,
      settings: true,
    });

    expect(anchor.querySelectorAll('.wrapper-slider').length).to.eq(1);
    expect(anchor.querySelectorAll('.slider').length).to.eq(1);
    expect(anchor.querySelectorAll('.settings').length).to.eq(1);
    expect(anchor.querySelectorAll('.slider__bar').length).to.eq(1);

    app.removeHTML();

    app = new App(new IntervalFactory('horizontal'), anchor);
    app.createUI({ ...defaults, bar: true, settings: true });
    app.init({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'interval',
      scale: false,
      settings: true,
    });

    expect(anchor.querySelectorAll('.slider__handle').length).to.eq(2);
  });

  it('RemoveHTML', () => {
    const app = new App(new IntervalFactory('horizontal'), anchor);
    app.createUI({ ...defaults, bar: true, settings: true });
    app.init({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'interval',
      scale: false,
      settings: true,
    });
    app.removeHTML();

    expect(anchor.querySelectorAll('.wrapper-slider').length).to.eq(0);
    expect(anchor.querySelectorAll('.settings').length).to.eq(0);
  });
});
