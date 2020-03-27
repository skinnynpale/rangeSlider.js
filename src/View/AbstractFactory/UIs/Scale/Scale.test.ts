import { expect } from 'chai';
import { Scale } from './Scale';
import jsdom from 'jsdom';
import App from '../../App';
import { IntervalFactory } from '../../Factories/Factories';
import { defaultVisualModel } from '../../../../Model/defaultVisualModel';
const defaults = defaultVisualModel;

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>');
const document = dom.window.document;
const window = dom.window;

describe('Scale', () => {
  let anchor: HTMLElement;
  let app: App | null;

  beforeEach(() => {
    anchor = document.createElement('div');
    anchor.className = 'anchor';

    app = new App(new IntervalFactory('horizontal'), anchor);
    app.createUI({ ...defaults, type: 'interval' });
    app.init({ ...defaults, type: 'interval' });

    const target = anchor.querySelector('.slider__handle') as HTMLElement;

    app.paint({
      target,
      edge: 400,
      pxValue: 234,
      pxValues: [234, 400],
      steps: [
        { value: 10, px: 0 },
        { value: 190, px: 72 },
      ],
      value: 590,
      values: [590, 1000],
    });
  });

  afterEach(() => {
    anchor.innerHTML = '';
    app = null;
  });

  it('(paint) Должен правильно расставить значения на горизонтальном направлении', () => {
    const scale = new Scale('horizontal', anchor);

    scale.paint({
      steps: [
        { px: 10, value: 10 },
        { px: 30, value: 30 },
      ],
    });

    const scaleNode = anchor.querySelector('.scale') as HTMLElement;
    expect(scaleNode.childElementCount).to.equal(2);

    const firstScaleValue = scaleNode.firstElementChild as HTMLElement;
    expect(firstScaleValue.style.left).to.equal('10px');
  });

  it('(paint) Должен правильно расставить значения на вертикальном направлении', () => {
    const scale = new Scale('vertical', anchor);

    scale.paint({
      steps: [
        { px: 10, value: 10 },
        { px: 30, value: 30 },
      ],
    });

    const scaleNode = anchor.querySelector('.scale') as HTMLElement;
    const firstScaleValue = scaleNode.firstElementChild as HTMLElement;
    expect(firstScaleValue.style.bottom).to.equal('10px');
  });

  it('(handleScaleValue) Должен правильно перехватить значение и выдать ближайший handle', () => {
    const scale = new Scale('horizontal', anchor);

    scale.paint({
      steps: [
        { px: 10, value: 10 },
        { px: 30, value: 30 },
      ],
    });

    const scaleNode = anchor.querySelector('.scale') as HTMLElement;
    const firstScaleValue = scaleNode.firstElementChild as HTMLElement;
    let result = null;
    scale.on('newValueFromScale', obj => {
      result = obj;
    });
    const eventClick = new window.Event('click', { bubbles: true });
    firstScaleValue.dispatchEvent(eventClick);

    const handles = anchor.querySelectorAll('.slider__handle');
    expect(result).to.deep.equal({ handles, values: [590, 10] });
  });
});
