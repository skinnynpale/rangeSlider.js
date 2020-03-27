import { expect } from 'chai';
import jsdom from 'jsdom';

import { IntervalFactory, SingleFactory } from '../Factories/Factories';
import AppConfigurator from './AppConfigurator';
import { defaultVisualModel } from '../../../Model/defaultVisualModel';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>');
const document = dom.window.document;

describe('ApplicationConfigurator', () => {
  let anchor: HTMLElement;

  beforeEach(() => {
    anchor = document.createElement('div');
    anchor.className = 'anchor';
  });

  afterEach(() => {
    anchor.innerHTML = '';
  });

  it('Должен верно определить фабрику', () => {
    const test1 = new AppConfigurator().main(
      {
        ...defaultVisualModel,
        type: 'interval',
        direction: 'horizontal',
      },
      anchor,
    );

    // @ts-ignore
    expect(test1.factory).to.deep.equal(new IntervalFactory('horizontal'));

    const test2 = new AppConfigurator().main(
      {
        ...defaultVisualModel,
        type: 'single',
        direction: 'vertical',
      },
      anchor,
    );

    // @ts-ignore
    expect(test2.factory).to.deep.equal(new SingleFactory('vertical'));
  });

  it('Должен выкинуть исключение на неверные данные', () => {
    const applicationConfigurator = new AppConfigurator();
    // @ts-ignore
    const func = applicationConfigurator.main.bind(
      applicationConfigurator,
      {
        type: 'okay',
        direction: 'bro',
      },
      anchor,
    );

    expect(func).to.throw('Error! Unknown okay or bro');
  });
});
