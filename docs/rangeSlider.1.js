!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){void 0===t&&(t={}),this.events=t}return t.prototype.on=function(t,e){var n=this.events[t];n?n.push(e):this.events[t]=[e]},t.prototype.emit=function(t,e){var n=this.events[t];n&&n.forEach((function(t){return t(e)}))},t}();e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.constants={DIRECTION_VERTICAL:"vertical",DIRECTION_HORIZONTAL:"horizontal",TYPE_INTERVAL:"interval",TYPE_SINGLE:"single"}},function(t,e){t.exports=$},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultModel={min:10,max:50,step:2,values:[20]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(5),n(18)},function(t,e,n){"use strict";(function(t,i){var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=s(n(6)),a=n(3),l=n(17),u={reset:function(){var e=t(this).data("rangeSlider");e.model.setState(t(this).data().startingModel),e.reCreateApplication(t(this).data().startingVisualModel)},destroy:function(){t(this).data("rangeSlider").app.removeHTML(),t(this).off("onChange")},onChange:function(e){t(this).on("onChange",e)}};!function(t){function e(e,n){void 0===e&&(e=l.defaultVisualModel),void 0===n&&(n=a.defaultModel);var i=r(r({},l.defaultVisualModel),e),s=r(r({},a.defaultModel),n);return this.each((function(){t(this).data().rangeSlider=new o.default(this,i,s),t(this).data().startingVisualModel=i,t(this).data().startingModel=s}))}function n(e){var n=e.VisualState,i=e.ModelState,r=t(this).data("rangeSlider");r.model.setState(i),r.reCreateApplication(Object.assign(r.visualModel.state,n))}t.fn.rangeSlider=function(i,r){t(this).data("rangeSlider")||e.call(this),"string"==typeof i&&("onChange"===i?u[i].call(this,r):u[i]&&u[i].call(this)),"object"==typeof i&&n.call(this,{VisualState:i,ModelState:r||{}})}}(i)}).call(this,n(2),n(2))},function(t,e,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(n(7)),o=r(n(8)),a=n(9),l=function(){function t(t,e,n){this.anchor=t,this.settingsVisualModel=e,this.settingsModel=n,this.initMVC(e,n)}return t.prototype.initMVC=function(t,e){this.model=new s.default(e),this.visualModel=new o.default,this.visualModel.setState(t),this.app=(new a.ApplicationConfigurator).main(this.visualModel.state,this.anchor),this.app.createUI(this.visualModel.state),this.bindEvents(),this.app.init(this.visualModel.state)},t.prototype.bindEvents=function(){var t=this;this.app.on("finishInit",(function(e){return t.arrangeHandles(e)})),this.model.on("pxValueDone",(function(e){return t.app.paint(e)})),this.app.on("onUserMove",(function(e){return t.model.counting(e)})),this.app.UIs.settings&&this.app.UIs.settings.on("newSettings",(function(e){t.model.setState(e),t.arrangeHandles(e),e.step&&t.reCreateApplication()})),this.model.on("pxValueDone",(function(){return t.app.UIs.settings&&t.app.UIs.settings.paint(i(i({},t.model.state),t.visualModel.state))})),this.app.UIs.settings&&this.app.UIs.settings.on("reCreateApp",(function(e){t.visualModel.setState(e),t.reCreateApplication()})),this.model.on("pxValueDone",(function(){return t.anchor.dispatchEvent(new CustomEvent("onChange",{detail:t.model.state}))})),this.app.UIs.scale&&this.app.UIs.scale.on("newValueFromScale",(function(e){t.model.setState(e),t.arrangeHandles(e)}))},t.prototype.arrangeHandles=function(t){var e=t.edge,n=t.handles;if(n)for(var i=0;i<n.length;i+=1)this.model.counting({edge:e,target:n[i],value:this.model.state.values[i]})},t.prototype.reCreateApplication=function(t){void 0===t&&(t=this.visualModel.state);var e=i(i({},this.settingsModel),this.model.state);this.app.removeHTML(),this.initMVC(t,e)},t}();e.default=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__assign||function(){return(s=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=o(n(0)),l=n(3),u=function(t){function e(e){var n=t.call(this)||this;return n.state=l.defaultModel,n.mapOfHandles=new Map,n.edge=0,n.setState(e),n}return r(e,t),e.prototype.setState=function(t){var e=this.correctMinMax({min:t.min,max:t.max}),n=e.min,i=e.max,r=this.correctStep({step:t.step,min:n,max:i}).step,o=this.correctValues({values:t.values,min:n,max:i,step:r}).values;this.state=s(s({},this.state),{min:n,max:i,step:r,values:o})},e.prototype.counting=function(t){this.edge=t.edge||this.edge;var e=this.findViewValue(t),n=this.countPxValueFromValue(e),i=t.target;this.mapOfHandles.set(i,{value:e,pxValue:n}),void 0!==t.left&&(this.state=s(s({},this.state),this.updateArrayOfValues())),this.notifyAboutPxValueDone({value:e,pxValue:n,target:i})},e.prototype.findViewValue=function(t){return void 0!==t.value?t.value:void 0!==t.left?this.countValueFromLeft(t.left):0},e.prototype.updateArrayOfValues=function(){for(var t=[],e=0,n=Array.from(this.mapOfHandles.values());e<n.length;e++){var i=n[e];t.push(i.value)}return t.sort((function(t,e){return t-e})),1===this.mapOfHandles.size&&null!=this.state.max&&(t[1]=this.state.max),{values:t}},e.prototype.countPxValueFromValue=function(t){var e=this.state;return(t-e.min)*(this.getRatio()/e.step)},e.prototype.getRatio=function(){var t=this.state,e=this.edge/(t.max-t.min)*t.step;return isFinite(e)?e:0},e.prototype.createArrayOfPxValues=function(){var t=this;return this.state.values.map((function(e){return t.countPxValueFromValue(e)})).sort((function(t,e){return t-e}))},e.prototype.countValueFromLeft=function(t){var e=this.state,n=Math.round(t/this.getRatio())*e.step+e.min;return this.correctValueInTheRange(n)},e.prototype.notifyAboutPxValueDone=function(t){this.emit("pxValueDone",{value:t.value,pxValue:t.pxValue,pxValues:this.createArrayOfPxValues(),steps:this.createSteps(),values:this.state.values,target:t.target,edge:this.edge,ratio:this.getRatio()})},e.prototype.correctMinMax=function(t){var e=void 0===t.max?this.state.max:t.max,n=void 0===t.min?this.state.min:t.min;return n>=e?{min:e,max:n}:{min:n,max:e}},e.prototype.correctStep=function(t){var e=void 0===t.step?this.state.step:t.step,n=t.min,i=t.max,r=Math.abs(i-n)||1;return e>r?{step:r}:e<1?{step:1}:{step:e}},e.prototype.correctValues=function(t){var e=this,n=(void 0===t.values?this.state.values:t.values).map((function(n){return e.correctValueInTheRange(n,t)})).sort((function(t,e){return t-e})),i=t.max;return 1===n.length&&n.push(i),{values:n}},e.prototype.correctValueInTheRange=function(t,e){void 0===e&&(e=this.state);var n=e.step,i=e.min,r=e.max,s=i-Math.round(i/n)*n,o=Math.round(t/n)*n+s;return o<i?i:o>r?r:o},e.prototype.createSteps=function(){for(var t=this.state,e=t.min,n=t.max,i=t.step,r=[],s=e;s<=n;s+=i)r.push(s);return r},e}(a.default);e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){function e(){var e=t.call(this)||this;return e.state={},e}return r(e,t),e.prototype.setState=function(t){void 0===t&&(t={}),Object.assign(this.state,t),this.emit("newVisualModel",this.state)},e}(s(n(0)).default);e.default=o},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(10),a=s(n(0)),l=n(1),u=function(t){function e(e,n){var i=t.call(this)||this;return i.factory=e,i.anchor=n,i.UIs={},i}return r(e,t),e.prototype.createUI=function(t){var e=t.bar,n=t.scale,i=t.settings;this.template=this.factory.createTemplate(),this.UIs.handle=this.factory.createHandle(),e&&(this.UIs.bar=this.factory.createBar()),n&&(this.UIs.scale=this.factory.createScale()),i&&(this.UIs.settings=this.factory.createSettings())},e.prototype.init=function(t){this.template.init(t,this.anchor);for(var e=0,n=Object.keys(this.UIs);e<n.length;e++){var i=n[e];this.template.append(this.UIs[i],this.anchor)}t.tip&&this.UIs.handle&&(this.UIs.tip=this.factory.createTip(),this.UIs.handle.append(this.UIs.tip));var r=this.getEdge(t),s=this.anchor.querySelectorAll(".slider__handle"),o=this.anchor.querySelector(".wrapper-slider");this.bindEventListeners({wrapper:o,state:t}),this.emit("finishInit",{handles:s,edge:r})},e.prototype.paint=function(t){for(var e=0,n=Object.keys(this.UIs);e<n.length;e++){var i=n[e];"settings"!==i&&this.UIs[i].paint(t)}},e.prototype.removeHTML=function(){this.UIs.settings&&this.anchor.removeChild(this.UIs.settings.settingsHTML),this.anchor.removeChild(this.template.templateHTML)},e.prototype.getEdge=function(t){var e=this.anchor.querySelector(".wrapper-slider"),n=this.anchor.querySelectorAll(".slider__handle");return t.direction===l.constants.DIRECTION_VERTICAL?e.clientHeight-n[0].offsetHeight:e.offsetWidth-n[0].offsetWidth},e.prototype.bindEventListeners=function(t){t.wrapper.addEventListener("mousedown",this.handleStartMove.bind(this,t))},e.prototype.handleStartMove=function(t,e){if(e.preventDefault(),"slider__handle"===e.target.className){var n=e.target,i={shiftX:e.offsetX,shiftY:n.offsetHeight-e.offsetY,target:n,data:t},r=this.handleMouseMove.bind(this,i);document.addEventListener("mousemove",r),document.addEventListener("mouseup",(function t(){document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",t)}))}},e.prototype.handleMouseMove=function(t,e){var n,i=t.shiftY,r=t.shiftX,s=t.data,o=t.target;n=s.state.direction===l.constants.DIRECTION_VERTICAL?s.wrapper.offsetHeight-e.clientY-i+s.wrapper.getBoundingClientRect().top:e.clientX-r-s.wrapper.offsetLeft,this.emit("onUserMove",{left:n,target:o})},e}(a.default);e.Application=u;var c=function(){function t(){}return t.prototype.main=function(t,e){var n,i=t.type,r=t.direction;if(i===l.constants.TYPE_SINGLE)n=new o.SingleFactory(r);else{if(i!==l.constants.TYPE_INTERVAL)throw new Error("Error! Unknown "+i+" or "+r);n=new o.IntervalFactory(r)}return new u(n,e)},t}();e.ApplicationConfigurator=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=s(n(11)),a=s(n(12)),l=n(13),u=n(14),c=n(15),p=n(16),f=function(){function t(t){this.direction=t}return t.prototype.createTemplate=function(){return new o.default},t.prototype.createSettings=function(){return new a.default},t}(),d=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.createBar=function(){return new u.SingleBar(this.direction)},e.prototype.createHandle=function(){return new c.SingleHandle(this.direction)},e.prototype.createTip=function(){return new l.SingleTip},e.prototype.createScale=function(){return new p.Scale(this.direction)},e}(f);e.SingleFactory=d;var h=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.createBar=function(){return new u.IntervalBar(this.direction)},e.prototype.createHandle=function(){return new c.IntervalHandle(this.direction)},e.prototype.createTip=function(){return new l.IntervalTip},e.prototype.createScale=function(){return new p.Scale(this.direction)},e}(f);e.IntervalFactory=h},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t.prototype.init=function(t,e){var n=t.skin,i=t.direction,r='\n      <div class="wrapper-slider wrapper-slider--'+i+'">\n        <div class="slider slider--'+i+" slider--"+n+'"></div>\n      </div>\n    ';e.insertAdjacentHTML("afterbegin",r),this.templateHTML=e.querySelector(".wrapper-slider")},t.prototype.append=function(t,e){t.init(e)},t}();e.default=i},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=s(n(0)),a=n(1),l=function(t){function e(){var e=t.call(this)||this;return e.handleChangeSettings=e.handleChangeSettings.bind(e),e}return r(e,t),e.prototype.init=function(t){this.anchor=t;t.insertAdjacentHTML("beforeend",'<form class="settings">\n                                <label class="settings__label"><input name="min" class="settings__input" type="number">\n                                  <b class="settings__option">min</b>\n                                </label>\n                                <label class="settings__label"><input name="max" class="settings__input" type="number">\n                                  <b class="settings__option">max</b>\n                                </label>\n                                <label class="settings__label"><input name="step" class="settings__input" type="number">\n                                  <b class="settings__option">step</b>\n                                </label>\n                                <label class="settings__label"><input name="valueFrom" class="settings__input" type="number">\n                                  <b class="settings__option">valueFrom</b>\n                                </label>\n                                <label class="settings__label"><input name="valueTo" class="settings__input" type="number">\n                                  <b class="settings__option">valueTo</b>\n                                </label>\n                                <div class="settings__separation"></div>\n                                <label class="settings__label">\n                                  <select name="skin">\n                                    <option>green</option>\n                                    <option>red</option>\n                                  </select>\n                                  <b class="settings__option">skin</b>\n                                </label>\n                                <label class="settings__label">\n                                  <select name="direction">\n                                    <option>horizontal</option>\n                                    <option>vertical</option>\n                                  </select>\n                                  <b class="settings__option">direction</b>\n                                </label>\n                                <label class="settings__label">\n                                  <select name="type">\n                                    <option>single</option>\n                                    <option>interval</option>\n                                  </select>\n                                  <b class="settings__option">type</b>\n                                </label>\n                                <label class="settings__label">\n                                  <select name="scale">\n                                    <option>true</option>\n                                    <option>false</option>\n                                  </select>\n                                  <b class="settings__option">scale</b>\n                                </label>\n                                <label class="settings__label">\n                                  <select name="bar">\n                                    <option>true</option>\n                                    <option>false</option>\n                                  </select>\n                                  <b class="settings__option">bar</b>\n                                </label>\n                                <label class="settings__label">\n                                  <select name="tip">\n                                    <option>true</option>\n                                    <option>false</option>\n                                  </select>\n                                  <b class="settings__option">tip</b>\n                                </label>\n                              </form>\n                            '),this.settingsHTML=t.querySelector(".settings"),this.settingsHTML.addEventListener("change",this.handleChangeSettings)},e.prototype.paint=function(t){this.state=t;var e=this.settingsHTML.elements,n=t.values,i=n[0],r=n[1];Object.assign(t,{valueFrom:i,valueTo:r});for(var s=0,o=e;s<o.length;s++){var l=o[s];l.value=t[l.name],"valueFrom"===l.name&&(l.step=t.step,l.min=t.min,l.max=t.max),"valueTo"===l.name&&(l.step=t.step,l.min=t.min,l.max=t.max)}for(var u=0,c=this.settingsHTML.querySelectorAll("select");u<c.length;u++){var p=c[u];p.value=t[p.name]}if(t.type===a.constants.TYPE_SINGLE){var f=this.settingsHTML.valueTo;if(f&&"true"===f.getAttribute("disabled"))return;f&&f.setAttribute("disabled","true")}},e.prototype.handleChangeSettings=function(t){var e,n,i=t.target;if("INPUT"===i.tagName){var r=this.anchor.querySelectorAll(".slider__handle");if("valueFrom"===i.name||"valueTo"===i.name){var s=Number(this.settingsHTML.valueFrom.value),o=Number(this.settingsHTML.valueTo.value);this.emit("newSettings",{handles:r,edge:this.state.edge,values:[s,o]})}else this.emit("newSettings",((e={handles:r,edge:this.state.edge})[i.name]=Number(i.value),e))}else if("SELECT"===i.tagName){var a=i,l=void 0;l="true"===a.value||"false"===a.value?JSON.parse(a.value):a.value,this.emit("reCreateApp",((n={})[i.name]=l,n))}},e}(o.default);e.default=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(){}return t.prototype.init=function(t){t.insertAdjacentHTML("beforeend",'<div class="slider__tip"><div class="slider__tongue"></div></div>')},t}();e.Tip=s;var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.paint=function(t){var e=t.target,n=t.value;void 0!==e&&e.querySelector(".slider__tip").setAttribute("data-value",""+n)},e}(s);e.SingleTip=o;var a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.paint=function(t){var e=t.target,n=t.value,i=t.pxValues,r=t.values;if(void 0!==e&&void 0!==i){var s=e.querySelector(".slider__tip");s.setAttribute("data-value",""+n);var o=e.parentElement&&e.parentElement.querySelectorAll(".slider__tip"),a=o&&Array.from(o).find((function(t){return t!==s}));if(a){var l=i[1]-i[0];l<=a.offsetWidth&&l<=s.offsetWidth?(s.classList.contains("slider__tip--extended")&&(s.classList.remove("slider__tip--extended"),a.classList.remove("slider__tip--extended"),a.style.visibility="visible"),s.style.visibility="hidden",a.classList.add("slider__tip--extended"),a.setAttribute("data-extendedValue",""+(r&&r.join(" - ")))):(s.style.visibility="visible",a.classList.remove("slider__tip--extended"))}}},e}(s);e.IntervalTip=a},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),o=function(){function t(t){this.direction=t}return t.prototype.init=function(t){t.querySelector(".slider").insertAdjacentHTML("beforeend",'<div class="slider__bar"></div>')},t}();e.Bar=o;var a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.paint=function(t){var e=t.pxValue,n=t.target;if(void 0!==e&&void 0!==n){var i=n.parentElement&&n.parentElement.querySelector(".slider__bar");this.direction===s.constants.DIRECTION_HORIZONTAL?i&&(i.style.width=e+10+"px"):this.direction===s.constants.DIRECTION_VERTICAL&&i&&(i.style.height=e+10+"px")}},e}(o);e.SingleBar=a;var l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.paint=function(t){var e=t.pxValues,n=t.target;if(void 0!==e&&void 0!==n){var i=n.parentElement&&n.parentElement.querySelector(".slider__bar");this.direction===s.constants.DIRECTION_HORIZONTAL?(i&&(i.style.left=e[0]+"px"),i&&(i.style.width=e[1]-e[0]+10+"px")):this.direction===s.constants.DIRECTION_VERTICAL&&(i&&(i.style.bottom=e[0]+"px"),i&&(i.style.height=e[1]-e[0]+10+"px"))}},e}(o);e.IntervalBar=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),o=function(){function t(t){this.direction=t}return t.prototype.init=function(t){this.anchor=t;t.querySelector(".slider").insertAdjacentHTML("beforeend",'<div class="slider__handle"></div>')},t.prototype.append=function(t){for(var e=this.anchor.querySelectorAll(".slider__handle"),n=0,i=Array.from(e);n<i.length;n++){var r=i[n];t.init(r)}},t}();e.Handle=o;var a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.paint=function(t){var e=t.target,n=t.pxValue;e&&(this.direction===s.constants.DIRECTION_HORIZONTAL?e.style.left=n+"px":this.direction===s.constants.DIRECTION_VERTICAL&&(e.style.bottom=n+"px"))},e}(o);e.SingleHandle=a;var l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.init=function(t){this.anchor=t;var e=t.querySelector(".slider");e.insertAdjacentHTML("beforeend",'<div class="slider__handle"></div>'),e.insertAdjacentHTML("beforeend",'<div class="slider__handle"></div>')},e.prototype.paint=function(t){var e=t.target,n=t.pxValue;e&&(this.direction===s.constants.DIRECTION_HORIZONTAL?e.style.left=n+"px":this.direction===s.constants.DIRECTION_VERTICAL&&(e.style.bottom=n+"px"))},e}(o);e.IntervalHandle=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=s(n(0)),a=n(1),l=function(t){function e(e){var n=t.call(this)||this;return n.direction=e,n.handleScaleValue=n.handleScaleValue.bind(n),n}return r(e,t),e.prototype.init=function(t){this.anchor=t,this.slider=t.querySelector(".slider");this.slider.insertAdjacentHTML("afterbegin",'<div class="slider__scale"><div class="scale"></div></div>'),this.scaleHTML=this.anchor.querySelector(".scale"),this.scaleHTML.addEventListener("click",this.handleScaleValue)},e.prototype.paint=function(t){var e=t.ratio,n=t.steps;this.steps=n;var i=n,r=0;if(this.scaleHTML.childElementCount!==i.length||e!==this.ratio){this.scaleHTML.innerHTML="",void 0!==e&&(this.ratio=e);for(var s=0;s<i.length;s+=1){var o='<div class="scale__value">'+i[s]+"</div>";this.scaleHTML.insertAdjacentHTML("beforeend",o);var l=this.scaleHTML.children[s];if(0===s)switch(this.direction){case a.constants.DIRECTION_HORIZONTAL:l.style.left="0px";break;case a.constants.DIRECTION_VERTICAL:l.style.bottom="0px"}else{r+=e;var u=l.clientWidth/8;switch(this.direction){case a.constants.DIRECTION_HORIZONTAL:l.style.left=r-u+"px";break;case a.constants.DIRECTION_VERTICAL:l.style.bottom=r-u+"px"}}}var c=this.slider.querySelector(".slider__handle");switch(this.direction){case a.constants.DIRECTION_HORIZONTAL:this.scaleHTML.style.marginLeft=c.offsetWidth/4-1+"px";break;case a.constants.DIRECTION_VERTICAL:this.scaleHTML.style.marginBottom=c.offsetWidth/4-1+"px"}}},e.prototype.findClosestHandle=function(t,e){var n=t.querySelectorAll(".slider__handle"),i=t.querySelectorAll(".slider__tip"),r=Array.from(i).map((function(t){return t.dataset.value}));2===n.length?r[[Math.abs(r[0]-e),Math.abs(r[1]-e)].map((function(t,e,n){return t<=n[e+1]?e:e+1}))[0]]=e:(r[0]=e,r[1]=this.steps[this.steps.length-1]);return{handles:n,values:r}},e.prototype.handleScaleValue=function(t){var e=t.target;if("scale__value"===e.className){var n=Number(e&&e.textContent),i=this.findClosestHandle(this.anchor,n),r=i.handles,s=i.values;this.emit("newValueFromScale",{handles:r,values:s})}},e}(o.default);e.Scale=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.defaultVisualModel={direction:"horizontal",skin:"green",bar:!0,tip:!0,type:"single",scale:!1,settings:!1}},function(t,e,n){var i=n(19);"string"==typeof i&&(i=[[t.i,i,""]]);var r={insert:"head",singleton:!1};n(20)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){},function(t,e,n){"use strict";var i,r={},s=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}();function a(t,e){for(var n=[],i={},r=0;r<t.length;r++){var s=t[r],o=e.base?s[0]+e.base:s[0],a={css:s[1],media:s[2],sourceMap:s[3]};i[o]?i[o].parts.push(a):n.push(i[o]={id:o,parts:[a]})}return n}function l(t,e){for(var n=0;n<t.length;n++){var i=t[n],s=r[i.id],o=0;if(s){for(s.refs++;o<s.parts.length;o++)s.parts[o](i.parts[o]);for(;o<i.parts.length;o++)s.parts.push(_(i.parts[o],e))}else{for(var a=[];o<i.parts.length;o++)a.push(_(i.parts[o],e));r[i.id]={id:i.id,refs:1,parts:a}}}}function u(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var i=n.nc;i&&(t.attributes.nonce=i)}if(Object.keys(t.attributes).forEach((function(n){e.setAttribute(n,t.attributes[n])})),"function"==typeof t.insert)t.insert(e);else{var r=o(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var c,p=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function f(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=p(e,r);else{var s=document.createTextNode(r),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(s,o[e]):t.appendChild(s)}}function d(t,e,n){var i=n.css,r=n.media,s=n.sourceMap;if(r&&t.setAttribute("media",r),s&&btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var h=null,v=0;function _(t,e){var n,i,r;if(e.singleton){var s=v++;n=h||(h=u(e)),i=f.bind(null,n,s,!1),r=f.bind(null,n,s,!0)}else n=u(e),i=d.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s());var n=a(t,e);return l(n,e),function(t){for(var i=[],s=0;s<n.length;s++){var o=n[s],u=r[o.id];u&&(u.refs--,i.push(u))}t&&l(a(t,e),e);for(var c=0;c<i.length;c++){var p=i[c];if(0===p.refs){for(var f=0;f<p.parts.length;f++)p.parts[f]();delete r[p.id]}}}}}]);