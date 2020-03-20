import { VisualState } from '../../../helpers/interfaces';
import App from '../App';
import { SingleFactory, IntervalFactory } from '../Factories/Factories';
import { constants } from '../../../helpers/constants';

class AppConfigurator {
  public main({ type, direction }: VisualState, anchor: HTMLElement) {
    let factory;

    if (type === constants.TYPE_SINGLE) {
      factory = new SingleFactory(direction);
    } else if (type === constants.TYPE_INTERVAL) {
      factory = new IntervalFactory(direction);
    } else {
      throw new Error(`Error! Unknown ${type} or ${direction}`);
    }

    return new App(factory, anchor);
  }
}

export default AppConfigurator;
