import { expect } from 'chai';
import Settings from './Settings';

import jsdom from 'jsdom';
import { defaultVisualModel } from '../../../../Model/defaultVisualModel';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body></body></html>');
const document = dom.window.document;

describe('Settings', () => {
  let anchor: HTMLElement;
  beforeEach(() => {
    anchor = document.createElement('div');
    anchor.className = 'anchor';
  });

  afterEach(() => {
    anchor.innerHTML = '';
  });

  it('Должен создать SettingsTemplate', () => {
    new Settings(anchor);

    expect(anchor.querySelectorAll('.settings').length).to.eq(1);
  });

  it('Должен расставить переданные значения в инпуты', () => {
    const settings = new Settings(anchor);
    settings.setState(
      {
        min: 10,
        max: 50,
        step: 5,
        values: [20, 40],
      },
      defaultVisualModel,
    );

    const settingsHTML = anchor.querySelector('.settings') as HTMLElement;

    expect((settingsHTML.querySelector('input[name="min"]') as HTMLInputElement).value).to.eq('10');
    expect((settingsHTML.querySelector('input[name="max"]') as HTMLInputElement).value).to.eq('50');
    expect((settingsHTML.querySelector('input[name="step"]') as HTMLInputElement).value).to.eq('5');
    expect((settingsHTML.querySelector('input[name="valueFrom"]') as HTMLInputElement).value).to.eq('20');
    expect((settingsHTML.querySelector('input[name="valueTo"]') as HTMLInputElement).value).to.eq('40');
  });
});
