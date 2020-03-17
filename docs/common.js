// Test Destroy Slider
$('#anchorDestroy').rangeSlider(
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
//
$('#anchor').rangeSlider();
//
// Test Methods
$('#anchor').rangeSlider({ skin: 'red', direction: 'vertical' }, { step: 20, values: [30] });
$('#anchor').rangeSlider({ skin: 'green', direction: 'horizontal' });
$('#anchor').rangeSlider('reset');
$('#anchor').rangeSlider({ skin: 'red', direction: 'horizontal', settings: true, scale: true });
$('#anchor').rangeSlider({}, { step: 20, values: [590], max: 1000 });
// $('#anchor').rangeSlider('onChange', event => console.log(event.detail));
//
$('#anchor2').rangeSlider({
  settings: true,
  skin: 'red',
  type: 'interval',
  scale: true,
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
    skin: 'green',
    type: 'interval',
    scale: true,
  },
  {
    step: 5,
  },
);
