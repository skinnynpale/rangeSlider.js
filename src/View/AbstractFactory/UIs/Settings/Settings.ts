import './settings.scss';

import { settingsTemplate } from './settingsTemplate';
import Observer from '../../../../Observer/Observer';
import { constants } from '../../../../helpers/constants';
import { GState, VisualState, ModelState } from '../../../../helpers/interfaces';
import { defaultModel } from '../../../../Model/defaultModel';
import { defaultVisualModel } from '../../../../Model/defaultVisualModel';

class Settings extends Observer {
  public wrapper: HTMLFormElement;
  private state: GState = {};
  private model: ModelState = defaultModel;
  private visualModel: VisualState = defaultVisualModel;

  constructor(private anchor: HTMLElement) {
    super();
    this.handleChangeSettings = this.handleChangeSettings.bind(this);

    anchor.insertAdjacentHTML('beforeend', settingsTemplate);
    this.wrapper = anchor.querySelector('.settings') as HTMLFormElement;

    this.wrapper.addEventListener('change', this.handleChangeSettings);
  }

  public setState(model: ModelState, visualModel: VisualState) {
    this.model = { ...this.model, ...model };
    this.visualModel = { ...this.visualModel, ...visualModel };
    this.paint();
    return this;
  }

  public paint() {
    let { model } = this;
    const { visualModel } = this;
    const inputs = this.wrapper.elements;
    const [valueFrom, valueTo] = model.values;

    model = { ...model, ...{ valueFrom, valueTo } };

    for (const nonInput of Array.from(inputs)) {
      const input = nonInput as HTMLFormElement;
      type modelKeys = keyof ModelState;
      input.value = model[input.name as modelKeys];

      if (input.name === 'valueFrom') {
        input.step = model.step;
        input.min = model.min;
        input.max = model.max;
      }

      if (input.name === 'valueTo') {
        input.step = model.step;
        input.min = model.min;
        input.max = model.max;
      }
    }

    const selects = this.wrapper.querySelectorAll('select');
    for (const select of Array.from(selects)) {
      type visualKeys = keyof VisualState;
      select.value = visualModel[select.name as visualKeys].toString();
    }

    if (visualModel.type === constants.TYPE_SINGLE) {
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
