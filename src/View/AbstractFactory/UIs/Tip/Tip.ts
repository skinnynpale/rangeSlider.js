import { Temp } from '../../../../helpers/interfaces';

interface Tip {
  init(handler: HTMLElement): void;
  paint(state: {}): void;
}

class Tip implements Tip {
  public init(handler: HTMLElement) {
    const tipTemplate = '<div class="slider__tip"><div class="slider__tongue"></div></div>';
    handler.insertAdjacentHTML('beforeend', tipTemplate);
  }
}

class SingleTip extends Tip {
  public paint({ tempTarget, tempValue, tempPxValues }: Temp) {
    if (!(tempTarget !== undefined)) return;

    const tip = tempTarget.querySelector('.slider__tip') as HTMLElement;
    tip.setAttribute('data-value', `${tempValue}`);
  }
}
class IntervalTip extends Tip {
  public paint({ tempTarget, tempValue, tempPxValues, values }: Temp) {
    if (!(tempTarget !== undefined && tempPxValues !== undefined)) return;

    const tip = tempTarget.querySelector('.slider__tip') as HTMLElement;
    tip.setAttribute('data-value', `${tempValue}`);

    const allTips =
      tempTarget.parentElement && tempTarget.parentElement.querySelectorAll('.slider__tip');
    const anotherTip =
      allTips && (Array.from(allTips).find((item: Element) => item !== tip) as HTMLElement);

    if (!anotherTip) return;

    const distance = tempPxValues[1] - tempPxValues[0];

    if (distance <= anotherTip.offsetWidth) {
      if (distance <= tip.offsetWidth) {
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
        anotherTip.classList.remove('slider__tip--extended');
      }
    } else {
      tip.style.visibility = 'visible';
      anotherTip.classList.remove('slider__tip--extended');
    }
  }
}

export { Tip, IntervalTip, SingleTip };
