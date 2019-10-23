import Controller from './Controller/Controller';
import { IState, IVisualModel } from './helpers/interfaces';

// tslint:disable-next-line:only-arrow-functions
(function($) {
  const methods = {
    init(settingsVisualModel = {}, settingsModel = {}): any {
      if (!!$(this).data('rangeSlider')) return;
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
      ) as IVisualModel;
      const model = $.extend(
        {
          min: 10,
          max: 50,
          values: [20, 40],
          step: 2,
        },
        settingsModel,
      ) as IState;

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

  $.fn.rangeSlider = function(method: string | IVisualModel, data: IState) {
    if ((methods as any)[method as string]) {
      const funcOfMethod = (methods as any)[method as string];
      return funcOfMethod.apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof method === 'object') {
      methods.init.apply(this, [method, data]);
    }
  };
})(jQuery);
