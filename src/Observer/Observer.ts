import { Events, EventCallback } from '../helpers/interfaces';

class Observer {
  constructor(public events: Events = {}) {}

  public on(eventName: string, func: EventCallback) {
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
      event.forEach((func: EventCallback) => func(data));
    }
  }
}

export default Observer;
