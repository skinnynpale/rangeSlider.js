import Observer from '../../../../Observer/Observer';
import { constants } from '../../../../helpers/constants';
import { GState } from '../../../../helpers/interfaces';

class Settings extends Observer {
  public settingsHTML!: HTMLFormElement;
  private state!: GState;
  private anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;

    const settingsTemplate = `<form class="settings">
                                <label class="settings__label"><input name="min" class="settings__input" type="number">
                                  <b class="settings__option">min</b>
                                </label>
                                <label class="settings__label"><input name="max" class="settings__input" type="number">
                                  <b class="settings__option">max🔥</b>
                                </label>
                                <label class="settings__label"><input name="step" class="settings__input" type="number">
                                  <b class="settings__option">step</b>
                                </label>
                                <label class="settings__label"><input name="valueFrom" class="settings__input" type="number">
                                  <b class="settings__option">valueFrom</b>
                                </label>
                                <label class="settings__label"><input name="valueTo" class="settings__input" type="number">
                                  <b class="settings__option">valueTo</b>
                                </label>
                                <div class="settings__separation"></div>
                                <label class="settings__label">
                                  <select name="skin">
                                    <option>green</option>
                                    <option>red</option>
                                  </select>
                                  <b class="settings__option">skin</b>
                                </label>
                                <label class="settings__label">
                                  <select name="direction">
                                    <option>horizontal</option>
                                    <option>vertical</option>
                                  </select>
                                  <b class="settings__option">direction</b>
                                </label>
                                <label class="settings__label">
                                  <select name="type">
                                    <option>single</option>
                                    <option>interval</option>
                                  </select>
                                  <b class="settings__option">type</b>
                                </label>
                                <label class="settings__label">
                                  <select name="scale">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">scale</b>
                                </label>
                                <label class="settings__label">
                                  <select name="bar">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">bar</b>
                                </label>
                                <label class="settings__label">
                                  <select name="tip">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">tip</b>
                                </label>
                              </form>
                            `;

    anchor.insertAdjacentHTML('beforeend', settingsTemplate);

    this.settingsHTML = anchor.querySelector('.settings') as HTMLFormElement;

    this.startListenEvents();
  }

  public paint(state: GState) {
    this.state = state;
    const inputs = this.settingsHTML.elements;

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

    const selects = this.settingsHTML.querySelectorAll('select');
    for (const select of selects as any) {
      select.value = state[select.name];
    }

    if ((state.type as string) === constants.TYPE_SINGLE) {
      const valueToInput = this.settingsHTML.valueTo;
      if (valueToInput && valueToInput.getAttribute('disabled') === 'true') return;
      valueToInput && valueToInput.setAttribute('disabled', 'true');
    }
  }

  private startListenEvents() {
    this.settingsHTML.addEventListener('change', e => {
      const target = e.target as HTMLInputElement;

      if (target.tagName === 'INPUT') {
        const handles = this.anchor.querySelectorAll('.slider__handle');

        // разбивка на valueFrom и valueTo
        if (target.name === 'valueFrom' || target.name === 'valueTo') {
          const valueFrom = Number(this.settingsHTML.valueFrom.value);
          const valueTo = Number(this.settingsHTML.valueTo.value);

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
    });
  }
}

export default Settings;
