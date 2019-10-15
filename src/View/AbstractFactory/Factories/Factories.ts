import Template from '../UIs/Template/Template';
import Settings from '../UIs/Settings/Settings';
import Tip from '../UIs/Tip/Tip';

import {
  Bar,
  SingleHorizontalBar,
  SingleVerticalBar,
  IntervalHorizontalBar,
  IntervalVerticalBar,
} from '../UIs/Bar/Bar';
import {
  Handler,
  SingleHorizontalHandler,
  SingleVerticalHandler,
  IntervalHorizontalHandler,
  IntervalVerticalHandler,
} from '../UIs/Handler/Handler';
import { Scale, HorizontalScale, VerticalScale } from '../UIs/Scale/Scale';

interface GUIFactory {
  createBar(): Bar;
  createTip(): Tip;
  createHandler(): Handler;
  createTemplate(): Template;
  createScale(): Scale;
  createSettings(): Settings;
}

/**
 * Factories
 */

class Factory {
  public createTip(): Tip {
    return new Tip();
  }

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

  public createHandler(): Handler {
    return new SingleHorizontalHandler();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }
}

class SingleVerticalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new SingleVerticalBar();
  }

  public createHandler(): Handler {
    return new SingleVerticalHandler();
  }

  public createScale(): Scale {
    return new VerticalScale();
  }
}

class IntervalHorizontalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalHorizontalBar();
  }

  public createHandler(): Handler {
    return new IntervalHorizontalHandler();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }
}

class IntervalVerticalFactory extends Factory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalVerticalBar();
  }

  public createHandler(): Handler {
    return new IntervalVerticalHandler();
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
