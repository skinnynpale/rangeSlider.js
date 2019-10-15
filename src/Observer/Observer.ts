class Observer {
  constructor(public events: any = {}) {}

  public on(eventName: string, func: any) {
    const event = this.events[eventName] as [() => void];

    if (event) {
      event.push(func);
    } else {
      this.events[eventName] = [func];
    }

    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn: any) => func !== eventFn);
    };
  }

  public emit(eventName: string, data: any) {
    const event = this.events[eventName];

    if (event) {
      event.forEach((func: (arg0: any) => void) => func(data));
    }
  }
}

export default Observer;
