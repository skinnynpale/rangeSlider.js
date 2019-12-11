import { IntervalTip, SingleTip, Tip } from '../UIs/Tip/Tip';
import { Bar, SingleBar, IntervalBar } from '../UIs/Bar/Bar';
import { Handle, SingleHandle, IntervalHandle } from '../UIs/Handle/Handle';
import { Scale } from '../UIs/Scale/Scale';
import { Directions } from '../../../helpers/interfaces';

interface GUIFactory {
  createBar(anchor: HTMLElement): Bar;
  createTip(): Tip;
  createHandle(anchor: HTMLElement): Handle;
  createScale(anchor: HTMLElement): Scale;
}

class Factory {
  constructor(protected direction: Directions) {}
}

class SingleFactory extends Factory implements GUIFactory {
  public createBar(anchor: HTMLElement) {
    return new SingleBar(this.direction, anchor);
  }

  public createHandle(anchor: HTMLElement) {
    return new SingleHandle(this.direction, anchor);
  }

  public createTip() {
    return new SingleTip();
  }

  public createScale(anchor: HTMLElement) {
    return new Scale(this.direction, anchor);
  }
}

class IntervalFactory extends Factory implements GUIFactory {
  public createBar(anchor: HTMLElement) {
    return new IntervalBar(this.direction, anchor);
  }

  public createHandle(anchor: HTMLElement) {
    return new IntervalHandle(this.direction, anchor);
  }

  public createTip() {
    return new IntervalTip();
  }

  public createScale(anchor: HTMLElement) {
    return new Scale(this.direction, anchor);
  }
}

export { GUIFactory, SingleFactory, IntervalFactory };
