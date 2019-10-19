import { ITemp } from '../../../../helpers/interfaces';

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
  public paint({ tempTarget, tempValue, tempPxValues }: ITemp) {
    const tip = tempTarget.querySelector('.slider__tip') as HTMLElement;
    tip.setAttribute('data-value', `${tempValue}`);
  }
}
class IntervalTip extends Tip {
  public paint({ tempTarget, tempValue, tempPxValues, values }: ITemp) {
    const tip = tempTarget.querySelector('.slider__tip') as HTMLElement;
    tip.setAttribute('data-value', `${tempValue}`);

    const allTips =
      tempTarget.parentElement && tempTarget.parentElement.querySelectorAll('.slider__tip');
    const anotherTip =
      allTips && (Array.from(allTips).find((item: Element) => item !== tip) as HTMLElement);

    if (!anotherTip) return;

    if (tempPxValues[1] - tempPxValues[0] <= anotherTip.offsetWidth) {
      tip.style.display = 'none';
      anotherTip.classList.add('slider__tip--extended');
      anotherTip.setAttribute('data-extendedValue', `${values && values.join(' - ')}`);
    } else {
      tip.style.display = 'inline-block';
      anotherTip.style.display = 'inline-block';
      anotherTip.classList.remove('slider__tip--extended');
      tip.classList.remove('slider__tip--extended');
    }
  }
}

export { Tip, IntervalTip, SingleTip };
