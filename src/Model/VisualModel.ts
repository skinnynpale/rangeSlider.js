import Observer from '../Observer/Observer';
import { IVisualModel } from '../helpers/interfaces';

class VisualModel extends Observer {
  public state: IVisualModel = {};
  constructor() {
    super();
  }

  public setState(state: IVisualModel = {}) {
    Object.assign(this.state, state);

    this.emit('newVisualModel', this.state);
  }
}

export default VisualModel;
