import { expect } from 'chai';
import jsdom from 'jsdom';

import { Application } from './Application';
import { IntervalHorizontalFactory } from './Factories/Factories';
import { IntervalHorizontalBar } from './UIs/Bar/Bar';
import { IntervalHorizontalHandler } from './UIs/Handler/Handler';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');
const document = dom.window.document;

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
    const app = new Application(new IntervalHorizontalFactory(), anchor);

    app.createUI({ bar: true });
    // @ts-ignore
    expect(app.bar).to.deep.equal(new IntervalHorizontalBar());

    app.createUI({ handler: true });
    // @ts-ignore
    expect(app.bar).to.deep.equal(new IntervalHorizontalBar());
    // @ts-ignore
    expect(app.handler).to.deep.equal(new IntervalHorizontalHandler());
  });

  it('Должен отрисовать HTML с заданными настройками', () => {
    let app = new Application(new IntervalHorizontalFactory(), anchor);
    app.createUI({ bar: true, settings: true });
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

    app = new Application(new IntervalHorizontalFactory(), anchor);
    app.createUI({ bar: true, settings: true });
    app.init({
      direction: 'horizontal',
      skin: 'green',
      bar: true,
      tip: true,
      type: 'interval',
      scale: false,
      settings: true,
    });

    expect(anchor.querySelectorAll('.slider__handler').length).to.eq(2);
  });

  it('RemoveHTML', () => {
    const app = new Application(new IntervalHorizontalFactory(), anchor);
    app.createUI({ bar: true, settings: true });
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
