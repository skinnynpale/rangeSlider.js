import { IState } from '../../../../helpers/interfaces';
import Observer from '../../../../Observer/Observer';

class Settings extends Observer {
  public settingsHTML!: HTMLElement;
  private state!: IState;
  private anchor!: HTMLElement;

  public init(anchor: HTMLElement) {
    this.anchor = anchor;

    const settingsTemplate = `<div class="settings">
                                <label class="settings__label"><input id="min" class="settings__input" type="number">
                                  <b class="settings__option">min</b>
                                </label>
                                <label class="settings__label"><input id="max" class="settings__input" type="number">
                                  <b class="settings__option">max</b>
                                </label>
                                <label class="settings__label"><input id="step" class="settings__input" type="number">
                                  <b class="settings__option">step</b>
                                </label>
                                <label class="settings__label"><input id="valueFrom" class="settings__input" type="number">
                                  <b class="settings__option">valueFrom</b>
                                </label>
                                <label class="settings__label"><input id="valueTo" class="settings__input" type="number">
                                  <b class="settings__option">valueTo</b>
                                </label>
                                <div class="settings__separation"></div>
                                <label class="settings__label">
                                  <select id="skin">
                                    <option>green</option>
                                    <option>red</option>
                                  </select>
                                  <b class="settings__option">skin</b>
                                </label>
                                <label class="settings__label">
                                  <select id="direction">
                                    <option>horizontal</option>
                                    <option>vertical</option>
                                  </select>
                                  <b class="settings__option">direction</b>
                                </label>
                                <label class="settings__label">
                                  <select id="type">
                                    <option>single</option>
                                    <option>interval</option>
                                  </select>
                                  <b class="settings__option">type</b>
                                </label>
                                <label class="settings__label">
                                  <select id="scale">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">scale</b>
                                </label>
                                <label class="settings__label">
                                  <select id="bar">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">bar</b>
                                </label>
                                <label class="settings__label">
                                  <select id="tip">
                                    <option>true</option>
                                    <option>false</option>
                                  </select>
                                  <b class="settings__option">tip</b>
                                </label>
                              </div>
                            `;

    anchor.insertAdjacentHTML('beforeend', settingsTemplate);

    this.settingsHTML = anchor.querySelector('.settings') as HTMLElement;

    this.startListenEvents();
  }

  public paint(state: IState) {
    this.state = state;
    const inputs = this.settingsHTML.querySelectorAll('input');

    const [valueFrom, valueTo] = state.values as number[];

    Object.assign(state, { valueFrom, valueTo });

    for (const input of inputs as any) {
      input.value = state[input.id];
    }

    const selects = this.settingsHTML.querySelectorAll('select');
    for (const select of selects as any) {
      select.value = state[select.id];
    }
  }

  private startListenEvents() {
    this.settingsHTML.addEventListener('change', (e) => {
      const target = e.target as HTMLElement;

      if (target.tagName === 'INPUT') {
        const handlers = this.anchor.querySelectorAll('.slider__handler');

        if (target.id === 'valueFrom' || target.id === 'valueTo') {
          const valueFrom = (this.settingsHTML.querySelector('#valueFrom') as HTMLInputElement).value;
          const valueTo = (this.settingsHTML.querySelector('#valueTo') as HTMLInputElement).value;

          this.emit('newSettings', { handlers, edge: this.state.edge, values: [valueFrom, valueTo] });
        } else {
          this.emit('newSettings', {
            handlers,
            edge: this.state.edge,
            [target.id]: Number((target as HTMLInputElement).value),
          });
        }
      } else if (target.tagName === 'SELECT') {
        this.emit('reCreateApp', { [target.id]: (target as HTMLSelectElement).value });
      }
    });
  }
}

export default Settings;
