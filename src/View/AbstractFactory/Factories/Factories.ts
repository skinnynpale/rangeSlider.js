import Template from '../UIs/Template/Template';
import Settings from '../UIs/Settings/Settings';

import { IntervalTip, SingleTip, Tip } from '../UIs/Tip/Tip';

import {
  Bar,
  IntervalHorizontalBar,
  IntervalVerticalBar,
  SingleHorizontalBar,
  SingleVerticalBar,
} from '../UIs/Bar/Bar';
import {
  Handle,
  IntervalHorizontalHandle,
  IntervalVerticalHandle,
  SingleHorizontalHandle,
  SingleVerticalHandle,
} from '../UIs/Handle/Handle';
import { HorizontalScale, Scale, VerticalScale } from '../UIs/Scale/Scale';

interface GUIFactory {
  createBar(): Bar;
  createTip(): Tip;
  createHandle(): Handle;
  createTemplate(): Template;
  createScale(): Scale;
  createSettings(): Settings;
}

/**
 * Factories
 */

class Factory {
  public createTemplate(): Template {
    return new Template();
  }

  public createSettings(): Settings {
    return new Settings();
  }
}

class SingleHorizontalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new SingleHorizontalBar();
  }

  public createHandle(): Handle {
    return new SingleHorizontalHandle();
  }

  public createTip(): Tip {
    return new SingleTip();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }
}

class SingleVerticalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new SingleVerticalBar();
  }

  public createHandle(): Handle {
    return new SingleVerticalHandle();
  }

  public createTip(): Tip {
    return new SingleTip();
  }

  public createScale(): Scale {
    return new VerticalScale();
  }
}

class IntervalHorizontalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalHorizontalBar();
  }

  public createHandle(): Handle {
    return new IntervalHorizontalHandle();
  }

  public createTip(): Tip {
    return new IntervalTip();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }
}

class IntervalVerticalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalVerticalBar();
  }

  public createHandle(): Handle {
    return new IntervalVerticalHandle();
  }

  public createTip(): Tip {
    return new IntervalTip();
  }

  public createScale(): Scale {
    return new VerticalScale();
  }
}

export {
  GUIFactory,
  SingleHorizontalFactory,
  IntervalHorizontalFactory,
  SingleVerticalFactory,
  IntervalVerticalFactory,
};
