import { IntervalBar, SingleBar } from './Bar';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

const dom = new JSDOM('<html><body><div class="anchor"></div></body></html>');
const document = dom.window.document;

describe('Bar', () => {
  describe('SingleBar', () => {
    let anchor: HTMLElement;
    let slider: HTMLElement;

    beforeEach(() => {
      anchor = document.body.querySelector('.anchor') as HTMLElement;

      slider = document.createElement('div');
      slider.className = 'slider';

      anchor.insertAdjacentElement('afterbegin', slider);
    });

    afterEach(() => {
      anchor.innerHTML = '';
    });

    it('Без .slider не отрисуется', () => {
      anchor.innerHTML = '';
      expect(() => new SingleBar('horizontal', anchor)).to.throw('.slider - не было найдено!');
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      const singleBar = new SingleBar('horizontal', anchor);
      expect(() => singleBar.paint({})).to.throw('pxValue или target не был передан!');
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      const handle = document.createElement('div');
      handle.className = 'slider';

      const singleBar = new SingleBar('horizontal', anchor);
      expect(() => singleBar.paint({ pxValue: 20, target: handle })).to.throw('.slider__bar - не было найдено!');
    });

    it('(paint) Должен правильно отрисовать и обработать ошибки в горизонтальном направлении', () => {
      const handle = document.createElement('div');
      handle.className = 'slider__handle';
      anchor.insertAdjacentElement('afterbegin', handle);

      const singleBar = new SingleBar('horizontal', anchor);

      singleBar.paint({ pxValue: 20, target: handle });
      const barNode = anchor.querySelector('.slider__bar') as HTMLElement;
      expect(barNode.style.width).to.eq('30px');
    });

    it('(paint) Должен правильно отрисовать в вертикальном направлении', () => {
      const handle = document.createElement('div');
      handle.className = 'slider__handle';
      anchor.insertAdjacentElement('afterbegin', handle);

      const verticalBar = new SingleBar('vertical', anchor);
      expect(() => verticalBar.paint({})).to.throw('pxValue или target не был передан!');

      verticalBar.paint({ pxValue: 20, target: handle });
      const barNode = anchor.querySelector('.slider__bar') as HTMLElement;
      expect(barNode.style.height).to.eq('30px');
    });
  });

  describe('IntervalBar', () => {
    let anchor: HTMLElement;
    let slider: HTMLElement;

    beforeEach(() => {
      anchor = document.body.querySelector('.anchor') as HTMLElement;

      slider = document.createElement('div');
      slider.className = 'slider';

      anchor.insertAdjacentElement('afterbegin', slider);
    });

    afterEach(() => {
      anchor.innerHTML = '';
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      const singleBar = new IntervalBar('horizontal', anchor);
      expect(() => singleBar.paint({})).to.throw('pxValues или target не был передан!');
    });

    it('(paint) Должен правильно обработать ошибки', () => {
      const handle = document.createElement('div');
      handle.className = 'slider';

      const singleBar = new IntervalBar('horizontal', anchor);
      expect(() => singleBar.paint({ pxValues: [20, 40], target: handle })).to.throw('.slider__bar - не было найдено!');
    });

    it('(paint) Должен правильно отрисовать в горизонтальном направлении', () => {
      const handle = document.createElement('div');
      handle.className = 'slider__handle';
      anchor.insertAdjacentElement('afterbegin', handle);

      const verticalBar = new IntervalBar('horizontal', anchor);

      verticalBar.paint({ pxValues: [20, 60], target: handle });
      const barNode = anchor.querySelector('.slider__bar') as HTMLElement;
      expect(barNode.style.left).to.eq('20px');
      expect(barNode.style.width).to.eq('50px');
    });

    it('(paint) Должен правильно отрисовать в вертикальном направлении', () => {
      const handle = document.createElement('div');
      handle.className = 'slider__handle';
      anchor.insertAdjacentElement('afterbegin', handle);

      const verticalBar = new IntervalBar('vertical', anchor);

      verticalBar.paint({ pxValues: [30, 100], target: handle });
      const barNode = anchor.querySelector('.slider__bar') as HTMLElement;
      expect(barNode.style.bottom).to.eq('30px');
      expect(barNode.style.height).to.eq('80px');
    });
  });
});
