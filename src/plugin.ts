import Controller from './Controller/Controller';
import { EventCallback, ModelState, VisualState } from './helpers/interfaces';
import { defaultModel } from './defaultModel';
import { defaultVisualModel } from './defaultVisualModel';

(function($): void {
  const methods = {
    init(
      settingsVisualModel: VisualState = defaultVisualModel,
      settingsModel: ModelState = defaultModel,
    ): undefined | void {
      if ($(this).data('rangeSlider')) return;
      const visualModel = { ...defaultVisualModel, ...settingsVisualModel };
      const model = { ...defaultModel, ...settingsModel };


      return (this as any).each(function(this: HTMLElement) {
        $(this).data().rangeSlider = new Controller(this, visualModel, model);
        $(this).data().startingVisualModel = visualModel;
        $(this).data().startingModel = model;
      });
    },
    updateValues(options: ModelState): void {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.model.setState(options);
      rangeSlider.reCreateApplication(rangeSlider.visualModel.state);
    },
    updateVisual(options: VisualState): void {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.reCreateApplication(Object.assign(rangeSlider.visualModel.state, options));
    },
    reset(): void {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.model.setState($(this).data().startingModel);
      rangeSlider.reCreateApplication($(this).data().startingVisualModel);
    },
    destroy(): void {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.app.removeHTML();
      $(this).off('onChange');
    },
    onChange(func: () => EventCallback): void {
      $(this).on('onChange', func);
    },
  };

  ($ as any).fn.rangeSlider = function(method: keyof typeof methods | VisualState, ...data: never[]): void {
    if (typeof method === 'string') {
      if (methods[method]) {
        const funcOfMethod = methods[method] as () => void;
        return funcOfMethod.bind(this, ...data)();
      }
    } else if (typeof method === 'object') {
      // @ts-ignore
      methods.init.apply(this, [method, ...data]);
    }
  };
})(jQuery);
