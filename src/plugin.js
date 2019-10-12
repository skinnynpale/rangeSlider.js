import { Controller } from "./Controller/Controller";

(function($) {
  $.fn.rangeSlider = function(settingsVisualModel = {}, settingsModel = {}) {
    return this.each(function() {
      const defaultVisualModel = {
        direction: "horizontal",
        skin: "green",
        bar: true,
        tip: true,
        type: "single",
        scale: false,
        settings: false,
      };

      const defaultModel = {
        min: 10,
        max: 50,
        values: [20, 40],
        step: 2,
      };

      Object.assign(defaultVisualModel, settingsVisualModel);
      Object.assign(defaultModel, settingsModel);

      $.data(this, { rangeSlider: new Controller(this, defaultVisualModel, defaultModel) });
    });
  };
})(jQuery);

export default $.fn.rangeSlider;
