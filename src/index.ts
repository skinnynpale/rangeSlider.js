import { Controller } from "./Controller/Controller";
import "./scss/style.scss";
import { ApplicationConfigurator } from "./View/AbstractFactory/AbstractFactory";

const anchor = document.getElementById("anchor") as HTMLElement;

const controller = new Controller(anchor);
