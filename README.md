# rangeSlider.js

### [Превью плагина](https://skinnynpale.github.io/rangeSlider.js/)

### Клонировать репозиторий

`git clone https://github.com/skinnynpale/rangeSlider.js`

| Режим тестирования | Режим разработки | Режим продакшена |
| ------------------ | ---------------- | ---------------- |
| `npm run test`     | `npm run dev`    | `npm run build`  |

## Установка плагина

1. Подключить `jQuery 3.41`
2. Подключить `CSS` стили плагина: `<link rel="stylesheet> href="rangeSlider.css">`
3. Подключить сам плагин в конце `body` перед `jQuery`: `<script src="rangeSlider.js"></script>`

## Использование

#### `Быстрое`, с настройками по умолчанию

```javascript
$(#myDiv).rangeSlider();
```

#### С `кастомными` настройками

```javascript
$(#myDiv).rangeSlider(
    'init',
    // тут настройки для первого передаваемого объекта (подробнее ниже)
    {
        settings: true,
        skin: "red"
    },
    // а тут для второго
    {
        min: 20,
        step: 5
    },
);
```

### Настройки для первого передаваемого объекта

| Свойство    | Тип     | Default      | Описание                                                                       |
| ----------- | ------- | ------------ | ------------------------------------------------------------------------------ |
| `direction` | string  | "horizontal" | Указывает положение слайдера "horizontal" или "vertical"                       |
| `type`      | string  | "single"     | Позволяет выбрать одиночной значение или интервальное, "single" или "interval" |
| `skin`      | string  | "green"      | Выбор рассцветки для слайдера, "green" или "red"                               |
| `settings`  | boolean | false        | Настройки на лету                                                              |
| `bar`       | boolean | true         | Полоса заполнения                                                              |
| `tip`       | boolean | true         | Подсказки значений                                                             |
| `scale`     | boolean | false        | Линейка                                                                        |

### Настройки для второго передаваемого объекта

| Свойство | Тип      | Default  | Описание                                         |
| -------- | -------- | -------- | ------------------------------------------------ |
| `min`    | number   | 10       | Минимальное значение (любое)                     |
| `max`    | number   | 50       | Максимальное значение (любое)                    |
| `step`   | number   | 2        | Шаг (> 0)                                        |
| `values` | number[] | [20, 40] | Начальные значения для первого и второго бегунка |

### Публичные методы

Для начала нужно инициализировать плагин

```javascript
$('#anchor').rangeSlider();
```

Затем, для использования существует 2 публичных метода и один для обновления

```javascript
// Обновление только числовых значений
$('#anchor').rangeSlider({}, { step: 1, values: [15] });

// Обновление только визуала
$('#anchor').rangeSlider({ skin: 'red', direction: 'vertical' });

// Сброс к первоначальным кастомным настройкам
$('#anchor').rangeSlider('reset');

// Удаление плагина из HTML
$('#anchor').rangeSlider('destroy');
```

### Событие `onChange`

```javascript
// Есть возможность повесить callback функцию на это событие
$('#anchor').rangeSlider('onChange', () => 'ваш код');

// Так же можно брать значения слайдера из свойства detail, пример:
$('#anchor').rangeSlider('onChange', event => console.log(event.detail));
```

# Архитектура

### [UML диаграмма на сайте](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=rangeSlider%20Class%20Diagramm#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1Xe6DzLpntBZs3fBWXV2PZ_qWj9ztVsGw%26export%3Ddownload)

![](https://sun9-56.userapi.com/c205820/v205820226/be3a5/bucS4TxZd_M.jpg)

#### Инициализация

![](https://sun9-12.userapi.com/c851016/v851016527/1dc77d/cX5dsrxl45Q.jpg)

При инициализации создаются экземпляры классов:

1. `Model` - отвечает за хранение _числовых_ значений, а так же все рассчеты

   > Например: Model.state: { step: 5, min: 10, max: 90, value: 13, pxValue: 60 ... }

2. `VisualModel` - отвечает за хранение информации о графическом состоянии слайдера

   > Например: VisualModel.state: { direction: "vertical", tip: true, bar: true ... }

3. `Application` - отвечает за создание отображения. С помощью фасада `ApplicationConfigurator` определяется нужная фабрика, на которой будут создаваться все сущности, нужные для пользователя, из одной категории. Здесь использован шаблон проектирования `Абстрактная Фабрика`

   > Например: определилась фабрика `IntervalHorizontalFactory`, затем создаются `IntervalHorizontalBar`, `IntervalHorizontalScale` и тд..

#### Отвязка слоев приложения

![](https://sun9-8.userapi.com/c851420/v851420527/1e58a5/y7QgIOeIGRk.jpg)

При помощи паттерна `Observer` мы расширяем созданные ранее экземпляры, тем самым обеспечивая такой режим работы приложения когда любой из созданных слоев не знает ни о ком кроме себя, и при важных изменениях он может разослать своим "подписчикам"(в нашем случае `Controller'у`) **имяСобытия** и **данные**. Это позволяет писать **тесты** для каждого из слоев по отдельности, а также повышает устойчивость к изменениям работы приложения.

#### Взаимодействие с пользователем

> Высокоуровневая диаграмма процесса

![](https://sun9-6.userapi.com/c851420/v851420293/1ebdcf/1le7Bipcr2Q.jpg)
