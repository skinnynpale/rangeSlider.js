import { IntervalTip, SingleTip, TipInterface } from '../UIs/Tip/Tip';
import { SingleBar, IntervalBar, BarInterface } from '../UIs/Bar/Bar';
import { SingleHandle, IntervalHandle, HandleInterface } from '../UIs/Handle/Handle';
import { Scale } from '../UIs/Scale/Scale';
import { Directions } from '../../../helpers/interfaces';

interface GUIFactory {
  createBar(anchor: HTMLElement): BarInterface;
  createTip(): TipInterface;
  createHandle(anchor: HTMLElement): HandleInterface;
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
