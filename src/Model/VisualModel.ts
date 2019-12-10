import Observer from '../Observer/Observer';
import { VisualState } from '../helpers/interfaces';

class VisualModel extends Observer {
  public state: VisualState = {};
  constructor() {
    super();
  }

  public setState(state: VisualState = {}) {
    Object.assign(this.state, state);

    this.emit('newVisualModel', this.state);
  }
}

export default VisualModel;
