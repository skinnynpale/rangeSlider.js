import Observer from '../Observer/Observer';
import { VisualState } from '../helpers/interfaces';
import { defaultVisualModel } from './defaultVisualModel';

class VisualModel extends Observer {
  public state: VisualState = defaultVisualModel;

  constructor(state: VisualState) {
    super();
    this.setState(state);
  }

  public setState(state: VisualState) {
    this.state = { ...this.state, ...state };
    this.emit('newVisualModel', this.state);
  }
}

export default VisualModel;
