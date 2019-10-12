import "./plugin.js";
import "./scss/style.scss";

import $ from "jquery";
const globalAny: any = global;
globalAny.jQuery = $;
globalAny.$ = $;
