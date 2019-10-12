import "./scss/style.scss";
import { Controller } from "./Controller/Controller";

const anchor = document.getElementById("anchor") as HTMLElement;
const anchor2 = document.getElementById("anchor2") as HTMLElement;

const settingsVisualModel = {
  direction: "horizontal",
  skin: "red",
  bar: true,
  tip: true,
  type: "interval",
  scale: true,
  settings: true,
};

const settingsModel = {
  min: 10,
  max: 50,
  values: [20, 40],
  step: 2,
};

const app = new Controller(anchor, settingsVisualModel, settingsModel);
const app2 = new Controller(anchor2, settingsVisualModel, settingsModel);
