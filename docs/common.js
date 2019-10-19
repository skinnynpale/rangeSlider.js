$('#anchor').rangeSlider(
  {
    settings: true,
    scale: true,
  },
  {
    step: 9,
    values: [13, 50],
    max: 52,
    min: 10,
  },
);
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
