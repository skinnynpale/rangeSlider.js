import { expect } from 'chai';
import jsdom from 'jsdom';

import { Application } from './Application';
import { IntervalHorizontalFactory } from './Factories/Factories';
import { IntervalHorizontalBar } from './UIs/Bar/Bar';
import { IntervalHorizontalHandle } from './UIs/Handle/Handle';

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
    expect(app.UIs.bar).to.deep.equal(new IntervalHorizontalBar());

    // @ts-ignore
    app.createUI({ handle: true });
    // @ts-ignore
    expect(app.UIs.bar).to.deep.equal(new IntervalHorizontalBar());
    // @ts-ignore
    expect(app.UIs.handle).to.deep.equal(new IntervalHorizontalHandle());
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

    expect(anchor.querySelectorAll('.slider__handle').length).to.eq(2);
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
