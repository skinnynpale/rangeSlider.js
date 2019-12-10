import { IntervalTip, SingleTip, Tip } from '../UIs/Tip/Tip';

import { Bar, SingleBar, IntervalBar } from '../UIs/Bar/Bar';
import { Handle, SingleHandle, IntervalHandle } from '../UIs/Handle/Handle';
import { Scale } from '../UIs/Scale/Scale';
import { Directions } from '../../../helpers/interfaces';

interface GUIFactory {
  createBar(): Bar;
  createTip(): Tip;
  createHandle(): Handle;
  createScale(): Scale;
}

class Factory {
  constructor(protected direction: Directions) {}
}

class SingleFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new SingleBar(this.direction);
  }

  public createHandle(): Handle {
    return new SingleHandle(this.direction);
  }

  public createTip(): Tip {
    return new SingleTip();
  }

  public createScale(): Scale {
    return new Scale(this.direction);
  }
}

class IntervalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalBar(this.direction);
  }

  public createHandle(): Handle {
    return new IntervalHandle(this.direction);
  }

  public createTip(): Tip {
    return new IntervalTip();
  }

  public createScale(): Scale {
    return new Scale(this.direction);
  }
}

export { GUIFactory, SingleFactory, IntervalFactory };
