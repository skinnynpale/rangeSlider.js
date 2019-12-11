export const settingsTemplate = `<form class="settings">
                                <label class="settings__label"><input name="min" class="settings__input" type="number">
                                  <b class="settings__option">min</b>
                                </label>
                                <label class="settings__label"><input name="max" class="settings__input" type="number">
                                  <b class="settings__option">max</b>
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
