$('#anchor').rangeSlider(
  {
    settings: true,
    scale: true,
    direction: 'vertical',
    skin: 'red',
  },
  {
    step: 9,
    values: [13, 50],
    max: 52,
    min: 10,
  },
);
$('#anchor').rangeSlider('updateVisual', { skin: 'green', direction: 'horizontal' });

$('#anchor2').rangeSlider({
  settings: true,
  skin: 'red',
  type: 'interval',
});
$('#anchor3').rangeSlider({
  direction: 'vertical',
  settings: true,
  skin: 'green',
  type: 'single',
});
$('#anchor4').rangeSlider(
  {
    direction: 'vertical',
    settings: true,
    skin: 'red',
    type: 'interval',
    scale: true,
  },
  {
    step: 5,
  },
);
