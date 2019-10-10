import { Observer } from "../../Observer/Observer";

class Settings extends Observer {
  constructor(public anchor: HTMLElement = document.body) {
    super();
    this._init();
  }

  private _init() {
    const settingsTemplate = `<label class="slider__settings settings">
    <label>
      <input type="number" id="valueFrom">
      valueFrom
    </label>
    <label>
      <input type="number" id="valueTo">
      valueTo
    </label>
    <label>
      <input type="number" id="min">
      min
    </label>
    <label>
      <input type="number" id="max">
      max
    </label>
    <label>
      <input type="number" id="step">
      step
    </label>
    <div class="settings__separation"></div>
    <div class="settings__block">
      direction:
      <label>
        <input type="radio" name="direction" checked>
        horizontal
      </label>
      <label>
        <input type="radio" name="direction">
        vertical
      </label>
    </div>
    <div class="settings__block">
      type:
      <label>
        <input type="radio" name="type" checked>
        single
      </label>
      <label>
        <input type="radio" name="type">
        double
      </label>
    </div>
    <div class="settings__block">
      skin:
      <label>
        <input type="radio" name="skin" checked>
        green
      </label>
      <label>
        <input type="radio" name="skin">
        red
      </label>
    </div>
    <label>
      <input id="tip" type="checkbox" checked>
      tip
    </label>
    <label>
      <input id="bar" type="checkbox" checked>
      bar
    </label>
  </div>`;

    this.anchor.insertAdjacentHTML("beforeend", settingsTemplate);
    const settingsHTML = this.anchor.querySelector(".slider__settings") as HTMLElement;

    settingsHTML.addEventListener("change", e => {
      const target = e.target as HTMLElement;

      if ((target as HTMLInputElement).value === "on") {
        return;
      } else {
        const input = target as HTMLInputElement;

        this.emit("newSettingsForModel", { [input.id]: input.value });
      }
    });
  }
}

export { Settings };
