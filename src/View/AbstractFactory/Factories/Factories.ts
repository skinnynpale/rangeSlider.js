import {
  Bar,
  SingleHorizontalBar,
  SingleVerticalBar,
  IntervalHorizontalBar,
  IntervalVerticalBar,
} from "../UIs/Bar/Bar";
import { Tip } from "../UIs/Tip/Tip";
import {
  Handler,
  SingleHorizontalHandler,
  SingleVerticalHandler,
  IntervalHorizontalHandler,
  IntervalVerticalHandler,
} from "../UIs/Handler/Handler";
import { Template } from "../UIs/Template/Template";
import { Scale, HorizontalScale, VerticalScale } from "../UIs/Scale/Scale";
import { Settings } from "../UIs/Settings/Settings";

export interface GUIFactory {
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
export class SingleHorizontalFactory implements GUIFactory {
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

export class SingleVerticalFactory implements GUIFactory {
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

export class IntervalHorizontalFactory implements GUIFactory {
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

export class IntervalVerticalFactory implements GUIFactory {
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
