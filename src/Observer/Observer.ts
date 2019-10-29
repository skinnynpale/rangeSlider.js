import { Events, func } from '../helpers/interfaces';

class Observer {
  constructor(public events: Events = {}) {}

  public on(eventName: string, func: func) {
    const event = this.events[eventName];

    if (event) {
      event.push(func);
    } else {
      this.events[eventName] = [func];
    }
  }

  public emit(eventName: string, data?: {}) {
    const event = this.events[eventName];

    if (event) {
      event.forEach((func: func) => func(data));
    }
  }
}

export default Observer;
