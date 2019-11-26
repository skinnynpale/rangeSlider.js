// Test Destroy Slider
$('#anchorDestroy').rangeSlider(
  'init',
  {
    direction: 'vertical',
    settings: true,
    skin: 'green',
    type: 'interval',
    scale: true,
  },
  {
    step: 5,
  },
);
$('#anchorDestroy').rangeSlider('destroy');

$('#anchor').rangeSlider();

// Test Methods
$('#anchor').rangeSlider('updateVisual', { skin: 'red', direction: 'vertical' });
$('#anchor').rangeSlider('reset');
$('#anchor').rangeSlider('updateVisual', { skin: 'red', direction: 'horizontal', settings: true, scale: true });
$('#anchor').rangeSlider('updateValues', null, { step: 20, values: [30] });
$('#anchor').rangeSlider('onChange', null, null, event => console.log(event.detail));

$('#anchor2').rangeSlider('init', {
  settings: true,
  skin: 'red',
  type: 'interval',
  scale: true,
});
$('#anchor3').rangeSlider('init', {
  direction: 'vertical',
  settings: true,
  skin: 'green',
  type: 'single',
});
$('#anchor4').rangeSlider(
  'init',
  {
    direction: 'vertical',
    settings: true,
    skin: 'green',
    type: 'interval',
    scale: true,
  },
  {
    step: 5,
  },
);
