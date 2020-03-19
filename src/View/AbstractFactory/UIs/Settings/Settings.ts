import './settings.scss';

import { settingsTemplate } from './settingsTemplate';
import Observer from '../../../../Observer/Observer';
import { constants } from '../../../../helpers/constants';
import { GState } from '../../../../helpers/interfaces';

class Settings extends Observer {
  public wrapper: HTMLFormElement;
  private state: GState = {};

  constructor(private anchor: HTMLElement) {
    super();
    this.handleChangeSettings = this.handleChangeSettings.bind(this);

    anchor.insertAdjacentHTML('beforeend', settingsTemplate);
    this.wrapper = anchor.querySelector('.settings') as HTMLFormElement;

    if (!this.wrapper) throw new Error('.settings - не было найдено!');

    this.wrapper.addEventListener('change', this.handleChangeSettings);
  }

  public setState(state: {}) {
    this.state = { ...this.state, ...state };
    this.paint();
    return this;
  }

  public paint() {
    const state = this.state;
    const inputs = this.wrapper.elements;
    const [valueFrom, valueTo] = state.values as number[];

    Object.assign(state, { valueFrom, valueTo });

    for (const input of inputs as any) {
      input.value = state[input.name];

      if (input.name === 'valueFrom') {
        input.step = state.step;
        input.min = state.min;
        input.max = state.max;
      }
      if (input.name === 'valueTo') {
        input.step = state.step;
        input.min = state.min;
        input.max = state.max;
      }
    }

    const selects = this.wrapper.querySelectorAll('select');
    for (const select of selects as any) {
      select.value = state[select.name];
    }

    if ((state.type as string) === constants.TYPE_SINGLE) {
      const valueToInput = this.wrapper.valueTo;
      if (valueToInput && valueToInput.getAttribute('disabled') === 'true') return;
      valueToInput && valueToInput.setAttribute('disabled', 'true');
    }
  }

  private handleChangeSettings(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.tagName === 'INPUT') {
      const handles = this.anchor.querySelectorAll('.slider__handle');

      // разбивка на valueFrom и valueTo
      if (target.name === 'valueFrom' || target.name === 'valueTo') {
        const valueFrom = Number(this.wrapper.valueFrom.value);
        const valueTo = Number(this.wrapper.valueTo.value);

        this.emit('newSettings', {
          handles,
          edge: this.state.edge,
          values: [valueFrom, valueTo],
        });
      } else {
        // для всех остальных значений
        this.emit('newSettings', {
          handles,
          edge: this.state.edge,
          [target.name]: Number(target.value),
        });
      }
    } else if (target.tagName === 'SELECT') {
      // для второй части настроек
      const select = target;
      let value;

      if (select.value === 'true' || select.value === 'false') {
        value = JSON.parse(select.value);
      } else {
        value = select.value;
      }

      this.emit('reCreateApp', { [target.name]: value });
    }
  }
}

export default Settings;
