import Controller from './Controller/Controller';
import { ModelState, VisualState } from './helpers/interfaces';
import { defaultModel } from './Model/defaultModel';
import { defaultVisualModel } from './Model/defaultVisualModel';

const methods = {
  reset() {
    const rangeSlider = $(this).data('rangeSlider');
    rangeSlider.model.setState($(this).data().startingModel);
    rangeSlider.reCreateApplication($(this).data().startingVisualModel);
  },
  destroy() {
    const rangeSlider = $(this).data('rangeSlider');
    rangeSlider.app.removeHTML();
    $(this).off('onChange');
  },
  onChange(this: JQuery, func: Function) {
    $(this).on('onChange', args => func(args));
  },
};

declare global {
  interface JQuery {
    rangeSlider(options?: keyof typeof methods | VisualState, args?: ModelState | Function): void;
  }
}

type State = { VisualState: VisualState; ModelState: ModelState | {} };

function init(
  this: JQuery,
  settingsVisualModel: VisualState = defaultVisualModel,
  settingsModel: ModelState = defaultModel,
) {
  const visualModel = { ...defaultVisualModel, ...settingsVisualModel };
  const model = { ...defaultModel, ...settingsModel };

  return this.each(function(this: HTMLElement) {
    $(this).data().rangeSlider = new Controller(this, visualModel, model);
    $(this).data().startingVisualModel = visualModel;
    $(this).data().startingModel = model;
  });
}

function setState(this: JQuery, { VisualState, ModelState }: State) {
  const rangeSlider = $(this).data('rangeSlider');
  rangeSlider.model.setState(ModelState);
  rangeSlider.reCreateApplication(Object.assign(rangeSlider.visualModel.state, VisualState));
}

$.fn.rangeSlider = function(options, data) {
  if (!$(this).data('rangeSlider')) {
    init.call(this);
  }

  if (typeof options === 'string') {
    if (options === 'onChange' && typeof data === 'function') {
      return methods[options].call(this, data);
    } else if (methods[options] && options !== 'onChange') {
      return methods[options].call(this);
    }
  }

  if (typeof options === 'object') {
    return setState.call(this, { VisualState: options, ModelState: data || {} });
  }
};
