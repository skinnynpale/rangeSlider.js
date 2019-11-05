$('#anchor').rangeSlider(
  {
    settings: true,
    direction: 'vertical',
    skin: 'red',
    type: 'single',
    scale: true
  },
  {
    step: 9,
    values: [15],
    max: 52,
    min: 10,
  },
);
$('#anchor').rangeSlider('updateVisual', { skin: 'green', direction: 'horizontal' });
$('#anchor2').rangeSlider({
  settings: true,
  skin: 'red',
  type: 'interval',
  scale: true
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
    scale: true
  },
  {
    step: 5,
  },
);
