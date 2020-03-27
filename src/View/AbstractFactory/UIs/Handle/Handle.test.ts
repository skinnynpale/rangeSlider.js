import { expect } from 'chai';
import { IntervalHandle, SingleHandle } from './Handle';
import jsdom from 'jsdom';
import { defaultVisualModel } from '../../../../Model/defaultVisualModel';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const document = dom.window.document;

describe('Handle', () => {
  describe('Single Handle', () => {
    let anchor: HTMLElement;
    let slider: HTMLElement;

    beforeEach(() => {
      anchor = document.querySelector('.anchor') as HTMLElement;
      anchor.insertAdjacentHTML('afterbegin', '<div class="slider"></div>');
      slider = document.querySelector('.slider') as HTMLElement;
    });

    afterEach(() => {
      anchor.innerHTML = '';
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      anchor.innerHTML = '';
      expect(() => new SingleHandle('horizontal', anchor)).to.throw('.slider - не было найдено!');
    });

    it('(paint) Должен правильно задать left/bottom в зависимости от направления и обработать ошибки', () => {
      const singleHandleHorizontal = new SingleHandle('horizontal', anchor);
      expect(() => singleHandleHorizontal.paint({ pxValue: 20 })).to.throw('Не был передан target!');

      slider.insertAdjacentHTML('afterbegin', '<div class="slider__handle"></div>');
      const handle = slider.querySelector('.slider__handle') as HTMLElement;
      singleHandleHorizontal.paint({ target: handle, pxValue: 20 });
      expect(handle.style.left).to.eq('20px');

      const singleHandleVertical = new SingleHandle('vertical', anchor);
      singleHandleVertical.paint({ target: handle, pxValue: 20 });
      expect(handle.style.bottom).to.eq('20px');
    });
  });

  describe('Interval Handle', () => {
    let anchor: HTMLElement;
    let slider: HTMLElement;

    beforeEach(() => {
      anchor = document.querySelector('.anchor') as HTMLElement;
      anchor.insertAdjacentHTML('afterbegin', '<div class="slider"></div>');
      slider = document.querySelector('.slider') as HTMLElement;
    });

    afterEach(() => {
      anchor.innerHTML = '';
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      anchor.innerHTML = '';
      expect(() => new IntervalHandle('horizontal', anchor)).to.throw('.slider - не было найдено!');
    });

    it('(paint) Должен правильно задать left/bottom в зависимости от направления и обработать ошибки', () => {
      const singleHandleHorizontal = new IntervalHandle('horizontal', anchor);
      expect(() => singleHandleHorizontal.paint({ pxValue: 20 })).to.throw('Не был передан target!');

      slider.insertAdjacentHTML('afterbegin', '<div class="slider__handle"></div>');
      const handle = slider.querySelector('.slider__handle') as HTMLElement;
      singleHandleHorizontal.paint({ target: handle, pxValue: 20 });
      expect(handle.style.left).to.eq('20px');

      const singleHandleVertical = new IntervalHandle('vertical', anchor);
      singleHandleVertical.paint({ target: handle, pxValue: 20 });
      expect(handle.style.bottom).to.eq('20px');
    });
  });
});
