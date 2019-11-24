import Controller from './Controller/Controller';
import { EventCallback, ModelState, VisualState } from './helpers/interfaces';
import { defaultModel } from './defaultModel';
import { defaultVisualModel } from './defaultVisualModel';

(function($) {
  function init(
    this: JQuery,
    settingsVisualModel: VisualState = defaultVisualModel,
    settingsModel: ModelState = defaultModel,
  ) {
    if ($(this).data('rangeSlider')) return;

    const visualModel = { ...defaultVisualModel, ...settingsVisualModel };
    const model = { ...defaultModel, ...settingsModel };

    return this.each(function(this: HTMLElement) {
      $(this).data().rangeSlider = new Controller(this, visualModel, model);
      $(this).data().startingVisualModel = visualModel;
      $(this).data().startingModel = model;
    });
  }

  const updateVisualMethods = {
    updateVisual(options: VisualState) {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.reCreateApplication(Object.assign(rangeSlider.visualModel.state, options));
    },
  };
  const updateStateMethods = {
    updateValues(options: ModelState) {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.model.setState(options);
      rangeSlider.reCreateApplication(rangeSlider.visualModel.state);
    },
  };

  const userCallbackMethods = {
    onChange(func: () => EventCallback) {
      $(this).on('onChange', func);
    },
  };

  const commonMethods = {
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
  };

  $.fn.rangeSlider = function(
    method: string,
    visualState: VisualState,
    modelState: ModelState,
    callback: () => EventCallback,
  ) {
    if (method === 'init') {
      init.call(this, visualState, modelState);
    } else if (!method || (visualState && modelState)) {
      init.call(this, visualState, modelState);
    } else if (visualState && !modelState) {
      type method = keyof typeof updateVisualMethods;
      if (updateVisualMethods[method as method]) {
        const funcOfMethod = updateVisualMethods[method as method];
        funcOfMethod.call(this, visualState);
      } else {
        throw new Error(`Метода с именем - ${method} не существует в "updateVisualMethods" :(`);
      }
    } else if (!visualState && modelState) {
      type method = keyof typeof updateStateMethods;
      if (updateStateMethods[method as method]) {
        const funcOfMethod = updateStateMethods[method as method];
        funcOfMethod.call(this, modelState);
      } else {
        throw new Error(`Метода с именем - ${method} не существует в "updateStateMethods" :(`);
      }
    } else if (method.includes('on') && callback) {
      type method = keyof typeof userCallbackMethods;
      if (userCallbackMethods[method as method]) {
        const funcOfMethod = userCallbackMethods[method as method];
        funcOfMethod.call(this, callback);
      } else {
        throw new Error(`Метода с именем - ${method} не существует в "userCallbackMethods" :(`);
      }
    } else if (!visualState && !modelState && !callback) {
      type method = keyof typeof commonMethods;
      if (commonMethods[method as method]) {
        const funcOfMethod = commonMethods[method as method];
        funcOfMethod.call(this);
      } else {
        throw new Error(`Метода с именем - ${method} не существует в "commonMethods" :(`);
      }
    } else {
      throw new Error(
        'Что то пошло не так, прочитатайте пожалуйста руководоство по использовании https://github.com/skinnynpale/rangeSlider.js',
      );
    }
  };
})(jQuery);
