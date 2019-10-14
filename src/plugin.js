import { Controller } from "./Controller/Controller";

(function($) {
  const methods = {
    init: function(settingsVisualModel = {}, settingsModel = {}) {
      return this.each(function() {
        const visualModel = $.extend({
          direction: "horizontal",
          skin: "green",
          bar: true,
          tip: true,
          type: "single",
          scale: false,
          settings: false,
        }, settingsVisualModel);
        const model = $.extend({
          min: 10,
          max: 50,
          values: [20, 40],
          step: 2,
        }, settingsModel);

        $.data(this, { rangeSlider: new Controller(this, visualModel, model) });

        $(this).data().startingVisualModel = visualModel;
        $(this).data().startingModel = model;
      });
    },
    updateValues: function(options) {
      const rangeSlider = $(this).data("rangeSlider");
      rangeSlider.model.setState(options);
      rangeSlider.reCreateApplication(rangeSlider.visualModel.state);
    },
    updateVisual: function(options) {
      const rangeSlider = $(this).data("rangeSlider");
      rangeSlider.reCreateApplication(Object.assign(rangeSlider.visualModel.state, options));
    },
    reset: function() {
      const rangeSlider = $(this).data("rangeSlider");
      rangeSlider.model.setState($(this).data().startingModel);
      rangeSlider.reCreateApplication($(this).data().startingVisualModel);
    },
    destroy: function() {
      const rangeSlider = $(this).data("rangeSlider");
      rangeSlider.app.removeHTML();
    }
  };

  $.fn.rangeSlider = function(method) {
    if(methods[method]) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1));
    } else if(typeof method === "object") {
      methods.init.apply(this, arguments)
    }
  };
})(jQuery);
