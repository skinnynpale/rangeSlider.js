import { Controller } from "./Controller/Controller";
import "./scss/style.scss";

const anchor = document.getElementById("anchor") as HTMLElement;

const controller = new Controller(anchor);
