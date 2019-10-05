import { Model } from "../Model/Model";
import { View } from "../View/View";

class Controller {
  private model = new Model();
  private view = new View();

  constructor() {
    this.model.setState({
      min: 11,
      max: 91,
      values: [34],
      step: 5,
    });
    this.view.renderTemplate({
      direction: "horizontal",
      skin: "green",
      bar: true,
      tip: true,
      type: "single",
    });
  }
}

export { Controller };
