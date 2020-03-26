import { ViewValues } from '../../../../helpers/interfaces';

interface TipInterface {
  init(handle: HTMLElement): void;
  paint(state: {}): void;
}

class Tip {
  public init(handle: HTMLElement) {
    const tipTemplate = '<div class="slider__tip"><div class="slider__tongue"></div></div>';
    handle.insertAdjacentHTML('beforeend', tipTemplate);
  }
}

class SingleTip extends Tip implements TipInterface {
  public paint({ target, value }: ViewValues) {
    if (!target) return;

    const tip = target.querySelector('.slider__tip');

    if (!tip) throw new Error('.slider__tip - не был найден!');

    tip.setAttribute('data-value', `${value}`);
  }
}
class IntervalTip extends Tip implements TipInterface {
  public paint({ target, value, pxValues, values }: ViewValues) {
    if (!target || !pxValues) return;

    const tip = target.querySelector('.slider__tip') as HTMLElement;

    if (!tip) throw new Error('.slider__tip - не был найден!');

    tip.setAttribute('data-value', `${value}`);

    const allTips = target.parentElement && target.parentElement.querySelectorAll('.slider__tip');
    const anotherTip = allTips && (Array.from(allTips).find((item: Element) => item !== tip) as HTMLElement);
    if (!anotherTip) return;

    const distance = pxValues[1] - pxValues[0];

    if (distance <= anotherTip.offsetWidth && distance <= tip.offsetWidth) {
      if (tip.classList.contains('slider__tip--extended')) {
        tip.classList.remove('slider__tip--extended');
        anotherTip.classList.remove('slider__tip--extended');
        anotherTip.style.visibility = 'visible';
      }
      tip.style.visibility = 'hidden';
      anotherTip.classList.add('slider__tip--extended');
      anotherTip.setAttribute('data-extendedValue', `${values && values.join(' - ')}`);
    } else {
      tip.style.visibility = 'visible';
      tip.classList.remove('slider__tip--extended');
      anotherTip.classList.remove('slider__tip--extended');
      anotherTip.style.visibility = 'visible';
    }
  }
}

export { Tip, IntervalTip, SingleTip, TipInterface };
