import Controller from './Controller/Controller';
import { IState, IVisualModel } from './helpers/interfaces';

// tslint:disable-next-line:only-arrow-functions
(function($) {
  const methods = {
    init(settingsVisualModel: IVisualModel = {}, settingsModel: IState = {}): undefined | void {
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
          values: [20, 40],
          step: 2,
        },
        settingsModel,
      );

      return (this as any).each(function(this: HTMLElement) {
        $(this).data().rangeSlider = new Controller(this, visualModel, model);
        $(this).data().startingVisualModel = visualModel;
        $(this).data().startingModel = model;
      });
    },
    updateValues(options: IState) {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.model.setState(options);
      rangeSlider.reCreateApplication(rangeSlider.visualModel.state);
    },
    updateVisual(options: IVisualModel) {
      const rangeSlider = $(this).data('rangeSlider');
      rangeSlider.reCreateApplication(Object.assign(rangeSlider.visualModel.state, options));
    },
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
    onChange(func: () => any) {
      $(this).on('onChange', func);
    },
  };

  $.fn.rangeSlider = function(method: keyof typeof methods | IVisualModel, ...data) {
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
