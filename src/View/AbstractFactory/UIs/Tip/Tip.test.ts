import { expect } from 'chai';
import { IntervalTip, SingleTip } from './Tip';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>');
const document = dom.window.document;

describe('Tip', () => {
  describe('Single Tip', () => {
    let handle: HTMLElement;

    beforeEach(() => {
      handle = document.createElement('div');
      handle.className = 'slider__handle';
    });

    afterEach(() => {
      handle.innerHTML = '';
    });

    it('(init) Должен правильно отрисоваться', () => {
      const singleTip = new SingleTip();
      singleTip.init(handle);
      const tipNode = handle.firstElementChild as HTMLElement;
      expect(tipNode.className).to.eq('slider__tip');
    });

    it('(paint) Должен правильно отрисоваться', () => {
      const singleTip = new SingleTip();
      singleTip.init(handle);
      singleTip.paint({ target: handle, value: 20 });
      const tipNode = handle.firstElementChild as HTMLElement;
      expect(tipNode.dataset.value).to.eq('20');
    });
  });

  describe('Interval Tip', () => {
    let slider: HTMLElement;
    let firstHandle: HTMLElement;
    let secondHandle: HTMLElement;

    beforeEach(() => {
      slider = document.createElement('div');
      slider.className = 'slider';

      firstHandle = document.createElement('div');
      firstHandle.className = 'slider__handle';

      secondHandle = document.createElement('div');
      secondHandle.className = 'slider__handle';

      slider.insertAdjacentElement('afterbegin', firstHandle);
      slider.insertAdjacentElement('afterbegin', secondHandle);
    });

    afterEach(() => {
      firstHandle.innerHTML = '';
      secondHandle.innerHTML = '';
      slider.innerHTML = '';
    });

    it('(paint) Должен правильно отрисоваться', () => {
      const intervalTipFirst = new IntervalTip();
      intervalTipFirst.init(firstHandle);
      intervalTipFirst.paint({ target: firstHandle, value: 10, values: [10, 11], pxValues: [100, 300] });
      const tipNodeFirst = firstHandle.firstElementChild as HTMLElement;
      expect(tipNodeFirst.dataset.value).to.eq('10');

      const intervalTipSecond = new IntervalTip();
      intervalTipSecond.init(secondHandle);
      intervalTipSecond.paint({ target: secondHandle, value: 11, values: [10, 11], pxValues: [100, 300] });
      const tipNodeSecond = secondHandle.firstElementChild as HTMLElement;
      expect(tipNodeSecond.dataset.value).to.eq('11');
    });
  });
});
