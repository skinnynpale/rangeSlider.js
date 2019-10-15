import Template from "../UIs/Template/Template";
import Settings from "../UIs/Settings/Settings";
import Tip from "../UIs/Tip/Tip";

import {
  Bar,
  SingleHorizontalBar,
  SingleVerticalBar,
  IntervalHorizontalBar,
  IntervalVerticalBar,
} from "../UIs/Bar/Bar";
import {
  Handler,
  SingleHorizontalHandler,
  SingleVerticalHandler,
  IntervalHorizontalHandler,
  IntervalVerticalHandler,
} from "../UIs/Handler/Handler";
import { Scale, HorizontalScale, VerticalScale } from "../UIs/Scale/Scale";

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
class SingleHorizontalFactory implements GUIFactory {
  public createBar(): Bar {
    return new SingleHorizontalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new SingleHorizontalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }

  public createSettings(): Settings {
    return new Settings();
  }
}

class SingleVerticalFactory implements GUIFactory {
  public createBar(): Bar {
    return new SingleVerticalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new SingleVerticalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }

  public createScale(): Scale {
    return new VerticalScale();
  }

  public createSettings(): Settings {
    return new Settings();
  }
}

class IntervalHorizontalFactory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalHorizontalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new IntervalHorizontalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }

  public createScale(): Scale {
    return new HorizontalScale();
  }

  public createSettings(): Settings {
    return new Settings();
  }
}

class IntervalVerticalFactory implements GUIFactory {
  public createBar(): Bar {
    return new IntervalVerticalBar();
  }

  public createTip(): Tip {
    return new Tip();
  }

  public createHandler(): Handler {
    return new IntervalVerticalHandler();
  }

  public createTemplate(): Template {
    return new Template();
  }

  public createScale(): Scale {
    return new VerticalScale();
  }

  public createSettings(): Settings {
    return new Settings();
  }
}

export {
  GUIFactory,
  SingleHorizontalFactory,
  IntervalHorizontalFactory,
  SingleVerticalFactory,
  IntervalVerticalFactory,
};
