$("#anchor").rangeSlider(
  {
    settings: true,
    scale: true,
  },
  {
    step: 5,
  },
);
$("#anchor2").rangeSlider({
  settings: true,
  skin: "red",
  type: "interval",
});
$("#anchor3").rangeSlider({
  direction: "vertical",
  settings: true,
  skin: "green",
  type: "single",
});
$("#anchor4").rangeSlider({
  direction: "vertical",
  settings: true,
  skin: "red",
  type: "interval",
  scale: true,
});
