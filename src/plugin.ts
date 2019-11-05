import Controller from './Controller/Controller';
import { EventCallback, ModelState, VisualState } from './helpers/interfaces';
import { defaultModel } from './defaultModel';
import { defaultVisualModel } from './defaultVisualModel';

(function($): void {
  const methods = {

    init(

      settingsVisualModel: VisualState = defaultVisualModel,
      settingsModel: ModelState = defaultModel): undefined | void {

      if ($(this).data('rangeSlider')) return;
      const visualModel = $.extend(
        {
          direction: 'horizontal',
          skin: 'green',
          bar: true,
          tip: true,
          type: 'single',
          scale: false,
          settings: false,
        },
        settingsVisualModel,
      );
      const model = $.extend(
        {
          min: 10,
          max: 50,
          step: 2,
          values: [20],
        },
        settingsModel,
      );

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

  ($ as any).fn.rangeSlider = function(method: keyof typeof methods | VisualState, ...data: any[]): void {
    if (typeof method === 'string') {
      if (methods[method]) {
        const funcOfMethod = methods[method] as () => void;
        // @ts-ignore
        return funcOfMethod.bind(this, ...data)();
      }
    } else if (typeof method === 'object') {
      // @ts-ignore // я не знаю как сделать
      methods.init.apply(this, [method, ...data]);
    }
  };
})(jQuery);
