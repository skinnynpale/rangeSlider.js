import Controller from './Controller/Controller';
import { IState, IVisualModel } from './helpers/interfaces';

// tslint:disable-next-line:only-arrow-functions
($ => {
  const methods = {
    init(settingsVisualModel = {}, settingsModel = {}): undefined {
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

      // @ts-ignore
      return this.each(function() {
        // @ts-ignore
        $.data({ rangeSlider: new Controller(this, visualModel, model) }, this);

        // @ts-ignore
        $(this).data().startingVisualModel = visualModel;

        // @ts-ignore
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

    onChange(func: () => void) {
      $(this).on('onChange', func);
    },
  };

  // @ts-ignore
  $.fn.rangeSlider = function(method: string) {
    // @ts-ignore
    if (methods[method]) {
      // @ts-ignore
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    if (typeof method === 'object') {
      // @ts-ignore
      methods.init.apply(this, arguments);
    }
  };
})(jQuery);
