class Observer {
  constructor(public events: any = {}) {}

  public on(eventName: string, func: any) {
    const event = this.events[eventName] as [() => void];

    if (event) {
      event.push(func);
    } else {
      this.events[eventName] = [func];
    }
  }

  public emit(eventName: string, data: any) {
    const event = this.events[eventName];

    if (event) {
      event.forEach((func: (arg0: any) => void) => func(data));
    }
  }
}

export { Observer };
