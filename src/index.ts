import { App } from "./app";
import "./scss/style.scss";

const anchor = document.getElementById("anchor") as HTMLElement;
const anchor2 = document.getElementById("anchor2") as HTMLElement;

const app = new App(anchor);
const app2 = new App(anchor2);
