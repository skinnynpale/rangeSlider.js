import { expect } from 'chai';
import jsdom from 'jsdom';

import { IntervalFactory } from '../Factories/Factories';
import AppConfigurator from './AppConfigurator';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');
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
    const applicationConfigurator = new AppConfigurator().main(
      {
        type: 'interval',
        direction: 'horizontal',
      },
      anchor,
    );

    // @ts-ignore
    expect(applicationConfigurator.factory).to.deep.equal(new IntervalFactory('horizontal'));
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
