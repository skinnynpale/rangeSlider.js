import Observer from './Observer';
import { expect } from 'chai';

describe('Observer', () => {
  it('(on) Должен правильно добавить функции к событию', () => {
    const observer = new Observer({ test: [() => console.log('123')] });
    observer.on('test', () => console.log('321'));
    expect(observer.events.test.length).to.eq(2);
  });

  it('(emit) Должен правильно отработать метод', () => {
    const observer = new Observer();

    let result = null;
    observer.on('test', () => {
      result = '123';
    });

    expect(result).to.eq(null);

    observer.emit('test');
    expect(result).to.eq('123');
  });
});
