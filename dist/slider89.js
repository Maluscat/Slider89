!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Slider89=t():e.Slider89=t()}(this,(function(){return(()=>{var e={977:e=>{e.exports=[".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);",".slider89.vertical .sl89-track{height:200px;width:25px;",".sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;",".slider89.vertical .sl89-thumb{height:16px;width:100%;",".sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;"]}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";n.d(r,{default:()=>e});const e=function(){const e=n(977),t=["start","move","end","change:$property"],r=function(){const e={attr:{name:"[\\w-]+"},all:"[\\d\\D]",capName:"([\\w-]+)"};e.attr.value="(?:(?!<)"+e.all+")*?",e.tagType="(?:\\s+"+e.capName+")?",e.content='(?:\\s+"('+e.all+'+?)")?',e.attribs="(?:\\s+"+e.attr.name+"=\\["+e.attr.value+"\\])*",e.varContent="\\$((?:\\w+(?:\\.(?=\\w))?)+)";const t={variable:"\\{"+e.varContent+"\\}|"+e.varContent,attributes:"("+e.attr.name+")=\\[("+e.attr.value+")\\](?:\\s+|$)",tag:"<([/:])?"+e.capName+e.tagType+e.content+"("+e.attribs+")\\s*?>\\s*"};for(let e in t)t[e]=new RegExp(t[e],"g");return t.variableNoFlag=new RegExp(t.variable,""),t}();function o(e){return Number.isNaN&&Number.isNaN(e)||!Number.isNaN&&"number"==typeof e&&e!=e}function i(e){return'\n - "'+e.join('"\n - "')+'"\n'}function a(e,t){let n=t?"":"but it is ";return Array.isArray(e)?n+="an array":o(e)?n+="NaN":n+=null===e?"null":"boolean"==typeof e?e:"of type "+typeof e,n}function s(e,t,n){let r;for(let n=0;n<t.length;n++){const a=t[n],l=a.type;if("boolean"===l&&"boolean"==typeof e||"true"===l&&!0===e||"false"===l&&!1===e||"array"===l&&Array.isArray(e)||"object"===l&&"[object Object]"===Object.prototype.toString.call(e)||"number"===l&&"number"==typeof e&&!o(e)||"function"===l&&"function"==typeof e||"string"===l&&"string"==typeof e){if("array"==l)for(let t=0;t<e.length&&!(r=s(e[t],a.structure,!0));t++);else if("object"===l)for(let t in e)if(r=s(e[t],a.structure,!0))break;if(r)return r;if(r=i(a.conditions,e))break;return!1}}return r?" is "+r:(n?"s values are ":" is ")+a(e,!0);function i(e,t){if(e){if(e.nonnegative&&t<0)return"a negative number";if(e.positive&&t<=0)return"a negative number or 0";if(e.integer&&t%1!=0)return"a floating point number";if(e.filled&&""===t.trim())return"an empty string";if(e.keywords&&-1===e.keywords.indexOf(t))return"a different string";if(e.wordChar&&!o(Number(t)))return"a pure number string";if(e.length&&t.length!==e.length)return("array"===type?"an ":"a ")+type+" of length "+t.length}}}function l(e,t,n,r){let o="";for(let i=0;i<e.length;i++){const a=e[i].type,s=e[i].conditions;if(o&&(o+=" or "),"number"===a){const e=s&&s.positive,t=s&&s.nonnegative,r=s&&s.integer;t||e?(n||(o+="a "),o+=t?"non-negative":"positive"):o+=r&&!n?"an":"any",o+=" "+(r?"integer":"number"),n&&(o+="s")}else if("array"===a){const t=s&&s.length,a=l(e[i].structure,!1,1!==t,!0);n||(o+="a"),r?o+=a:n||(o+="n"),o+=" array",n&&(o+="s"),t&&(o+=" of length "+t),r||(o+=" with "+a+" as values")}else"object"===a?o+="an object with "+l(e[i].structure,!1,!0,!0)+" as values":"function"===a?(r||(o+="a "),o+="function reference",!r&&n&&(o+="s")):"string"===a?s&&s.keywords?(s.keywords.length>1?o+="one of the keywords":o+="the keyword",s.keywords.forEach((function(e,t,n){0!==t&&t===n.length-1?o+=" or":0!==t&&(o+=","),o+=' "'+e+'"'}))):(r||(o+="a "),s&&s.filled&&(o+="non-empty "),s&&s.wordChar&&(o+="non-number "),o+="string",!r&&n&&(o+="s")):"boolean"===a?(r||(o+="a "),o+="boolean",!r&&n&&(o+="s")):"true"!==a&&"false"!==a||(o+=a);t&&(o+=" ("+t+")",t=!1)}return o}return function(n,o,u){n?n.nodeType&&1===n.nodeType||A("the first argument must be a valid DOM node the slider will be placed into "+a(n),"constructor",!0):A("no first argument has been supplied. It needs to be the DOM target node for the slider","constructor",!0),null==o||!1===o?o={}:("object"!=typeof o||Array.isArray(o))&&A("the optional second argument needs to be an object for configuration "+a(o),"constructor",!0);const c=this;let d,f,h,p,g=!1,m=0;const v="values"in o,y={},b={},w={};Object.defineProperty(w,"$",{value:{}});const x={addEvent:{function:function(e,n,r){L(e)||A("the specified type ‘"+e+"’ is not a valid event type. Available types are:"+i(t),"addEvent"),Array.isArray(w.events[e])||(w.events[e]=new Array),w.events[e].push(n);const o=r||m,a={type:e,fn:n};return r?(Array.isArray(b[o])||(b[o]=new Array),b[o].push(a)):b[o]=a,r||m++},args:[{name:"event type",structure:[{type:"string"}]},{name:"event function",structure:[{type:"function"}]},{name:"event namespace",optional:!0,structure:[{type:"string",conditions:{filled:!0,wordChar:!0}}]}]},removeEvent:{function:function(e){const t=b[e];return!!t&&(delete b[e],Array.isArray(t)?t.reduce(n,new Array):n(new Array,t));function n(e,t){const n=w.events[t.type],r=n.splice(n.indexOf(t.fn),1)[0];return 0===n.length&&delete w.events[t.type],e.push(r),e}},args:[{name:"event identifier/namespace",structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"string",conditions:{filled:!0,wordChar:!0}}]}]}},k={range:{default:[0,100],structure:[{type:"array",conditions:{length:2},structure:[{type:"number"}]},{type:"boolean"}],shape:"[startValue, endValue]",setter:function(e){e[0]===e[1]&&V("range","the given range of ["+e.join(", ")+"] defines the same value for both range start and end"),g||B({range:e})}},values:{default:function(){return[w.range[0]]},structure:[{type:"array",structure:[{type:"number"}]}],setter:function(e){return w.values=e.map((function(e){return j(e)})),!0},getter:function(e){return e.map((function(e){return k.value.getter(e)}))}},value:{default:function(){return w.values[0]},structure:[{type:"number"}],setter:function(e){return g&&v&&V("value","only one of ‘value’ and ‘values’ may be set in the constructor"),e=j(e),g?w.value=e:B({value:e}),!0},getter:function(e){return!1!==w.precision?Number(e.toFixed(w.precision)):e}},precision:{default:!1,structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"false"}],setter:function(e){if(!1!==e)for(let t=0;t<w.range.length;t++)Number(w.range[t].toFixed(e))!==w.range[t]&&V("range","the given range "+["start","end"][t]+" of `"+w.range[t]+"` exceeds the currently set precision of "+e);g||B({precision:e})}},step:{default:!1,structure:[{type:"number",conditions:{positive:!0}},{type:"false"}],setter:function(e){!1!==w.precision&&!1!==e&&Number(e.toFixed(w.precision))!==e&&V("step","the given value of "+e+" exceeds the currently set precision of "+w.precision),g||B({step:e})}},structure:{default:!1,structure:[{type:"string",conditions:{filled:!0}},{type:"false"}],initial:!0},node:{default:{},static:!0},orientation:{default:"horizontal",structure:[{type:"string",conditions:{keywords:["horizontal","vertical"]}}],setter:function(e){if(!g)return"vertical"===e?(w.node.thumb.style.removeProperty("left"),w.node.slider.classList.add("vertical")):(w.node.thumb.style.removeProperty("top"),w.node.slider.classList.remove("vertical")),w.orientation=e,B(),!0}},classList:{default:!1,structure:[{type:"object",structure:[{type:"array",structure:[{type:"string"}]}]},{type:"false"}],initial:!0,shape:"{nodeName: [...classes]}"},events:{default:{},structure:[{type:"object",structure:[{type:"array",structure:[{type:"function"}]}]},{type:"false"}],initial:!0,setter:function(e){const n=new Array;for(let t in e)L(t)||n.push(t);n.length>0&&V("events","the given object contains items which are no valid event types:"+i(n)+"Available event types are:"+i(t))}}};function A(e,t,n){throw"\n"!==(e="Slider89"+(t?" @ "+t:"")+": "+e)[e.length-1]&&"."!==e[e.length-1]&&(e+=".\n"),(g||n)&&(e+="Aborting the slider construction."),new Error(e)}function L(e){if(0===e.indexOf("change:")){const t=e.slice("change:".length);Object.prototype.hasOwnProperty.call(w,t)||A("‘"+e+"’ refers to ‘"+t+"’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized","addEvent")}else if(-1===t.indexOf(e))return!1;return!0}function j(e){if(w.range[0]<w.range[1]){if(e<w.range[0])return w.range[0];if(e>w.range[1])return w.range[1]}else{if(e>w.range[0])return w.range[0];if(e<w.range[1])return w.range[1]}return e}function C(e,t,n){Object.defineProperty(e,t,{set:function(e){if(!g)var r=c[t];n[t]=e,g||r===c[t]||(Object.prototype.hasOwnProperty.call(y,t)&&E(t),D(["change:"+t],r))},get:function(){return n[t]},enumerable:!0})}function E(e){for(let n in y[e]){const o=y[e][n],i=o.str.replace(r.variable,(function(e,n,r){return t(n||r)}));o.attr?o.elem.setAttribute(o.attr,i):o.elem.textContent=i}function t(e){const t=e.split(".");let n=c[t[0]];if(t.length>1)for(let r=1;r<t.length;r++)try{n=n[t[r]]}catch(o){A("Variable ‘"+e+"’ cannot access property ‘"+t[r]+"’ on "+n,"structure")}return n}}function O(e){return parseFloat(p["padding"+e])}function N(e){return"vertical"===w.orientation?e.getBoundingClientRect().top-w.node.track.getBoundingClientRect().top-O("Top"):e.getBoundingClientRect().left-w.node.track.getBoundingClientRect().left-O("Left")}function P(e){return"vertical"===w.orientation?w.node.track.getBoundingClientRect().height-O("Top")-O("Bottom")-e.getBoundingClientRect().height:w.node.track.getBoundingClientRect().width-O("Left")-O("Right")-e.getBoundingClientRect().width}function T(e,t,n){return null==n&&(n=P(e)),t/n*(w.range[1]-w.range[0])+w.range[0]}function R(e,t,n){if(n)e.style.transform="translate"+("vertical"===w.orientation?"Y":"X")+"("+t+"px)";else{if("vertical"===w.orientation)var r=O("Top"),o=O("Bottom"),i=e.clientHeight,a="top";else r=O("Left"),o=O("Right"),i=e.clientWidth,a="left";let n=i*t+"px";o&&(n+=" - "+o*t+"px"),r&&(n+=" + "+r*(1-t)+"px"),e.style[a]="calc("+100*t+"% - "+n+")"}}function B(e,t,n){let r,o;if(t){const n=["range","step"];for(let e in n)null==t[n[e]]&&(t[n[e]]=w[n[e]]);null!=t.value?r=t.value:(o=(w.values[e]-w.range[0])/(w.range[1]-w.range[0]),r=(t.range[1]-t.range[0])*o+t.range[0])}else t=w,r=w.values[e];!1!==t.step&&(r=Math.abs(t.range[1]-t.range[0])<t.step?t.range[0]:t.range[0]+Math.round((r-t.range[0])/t.step)*t.step);const i=(r-t.range[0])/(t.range[1]-t.range[0]);if(n)return{value:r,ratio:i};r!==w.values[e]&&(w.values[e]=r),i!==o&&R(w.node.thumb[e],i)}function D(e){const t=Array.from(arguments);t[0]=c;for(let n=0;n<e.length;n++){const r=w.events[e[n]];if(r)for(let e=0;e<r.length;e++)r[e].apply(c,t)}}function z(e){if(document.activeElement===w.node.thumb){let t=Math.round((w.range[1]-w.range[0])/100);e.shiftKey&&e.ctrlKey?t*=.1:e.shiftKey&&(t*=10),"ArrowLeft"===e.key||"ArrowUp"===e.key?(e.preventDefault(),c.value-=t):"ArrowRight"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),c.value+=t)}}function F(e){e.preventDefault(),null==f&&(f=e.changedTouches[0].identifier,$.call(this,e.changedTouches[0],e),w.node.thumb.addEventListener("touchmove",S),w.node.thumb.addEventListener("touchend",M),w.node.thumb.addEventListener("touchcancel",M))}function S(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===f){I.call(this,e.changedTouches[t],e);break}}function M(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===f){w.node.thumb.removeEventListener("touchmove",S),w.node.thumb.removeEventListener("touchend",M),w.node.thumb.removeEventListener("touchcancel",M),K.call(this,e.changedTouches[t],e),f=null;break}}function $(e,t){if(d=this,document.body.classList.add("sl89-noselect"),d.classList.add("active"),D(["start"],t||e),"vertical"===w.orientation)var n="top",r=e.clientY;else n="left",r=e.clientX;const o=N(d);h=r-o,R(d,o,!0),d.style.removeProperty(n),t||(window.addEventListener("mouseup",K),window.addEventListener("mousemove",I))}function I(e,t){const n=w.node.thumb.indexOf(d),r=P(d);let o=("vertical"===w.orientation?e.clientY:e.clientX)-h;o>r?o=r:o<0&&(o=0);let i=T(d,o,r);if(!1!==w.step){const e=B(n,{value:i},!0);i=e.value,o=e.ratio*r}w.values[n]!==i&&(w.values[n]=i,R(d,o,!0),D(["move"],t||e))}function K(e,t){t||(window.removeEventListener("mouseup",K),window.removeEventListener("mousemove",I));const n=T(d,N(d));B(w.node.thumb.indexOf(d),{value:n}),d.style.removeProperty("transform"),D(["end"],t||e),d.classList.remove("active"),document.body.classList.remove("sl89-noselect"),h=null,d=null}function V(e,t,n){if(!g){let n=w[e];Array.isArray(n)&&(n="["+n.join(", ")+"]"),t+=".\nContinuing with the previous value ("+n+")."}A(t,!n&&e)}function X(e,t,n,r){const o=x[e].args[t];let i="the "+(o.optional?"optional ":"")+["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth"][t]+" argument ("+o.name+") ";r&&(i+="has been omitted but it is required. It "),i+="must be "+l(o.structure),r||(i+=" but it"+n),A(i,e)}function Y(e,t){const n=x[e];for(let r in t){const o=s(t[r],n.args[r].structure,!1);o&&X(e,r,o)}n.args[t.length]&&!n.args[t.length].optional&&X(e,t.length,null,!0)}function q(e,t){const n=k[e],r=s(t,n.structure,!1);r&&V(e,"property ‘"+e+"’ must be "+l(n.structure,n.shape)+" but it"+r,!0)}g=!0,function(){for(let e in k){const t=e,n=k[t];if(Object.defineProperty(c,t,{set:function(e){if(n.static)A("property ‘"+t+"’ may only be read from but it was just set with the value ‘"+e+"’");else if(!n.initial||g){let r;q(t,e),n.setter&&(r=n.setter(e)),void 0===r&&(w[t]=e)}else A("property ‘"+t+"’ may only be set at init time but it was just set with the value ‘"+e+"’")},get:function(){return n.getter?n.getter(w[t]):w[t]},enumerable:!0}),C(w,t,w.$),t in o)c[t]=o[t],delete o[t];else{const e=n.default;w[t]="function"==typeof e?e():e}}for(let e in o){const t=e;"_"===t[0]?(C(c,t,w),w[t]=o[t]):A("‘"+t+"’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_"+t+"’)")}for(let e in x){const t=e,n=x[t];c[t]=function(){const e=Array.prototype.slice.call(arguments,0,n.args.length);return Y(t,e),n.function.apply(this,e)}}}(),function(){if(!1===w.structure){w.node.slider=document.createElement("div"),w.node.track=document.createElement("div"),w.node.thumb=new Array(w.values.length);for(let e=0;e<w.values.length;e++)w.node.thumb[e]=document.createElement("div"),w.node.track.appendChild(w.node.thumb[e]);w.node.slider.appendChild(w.node.track);for(let e in w.node)"slider"!==e&&w.node[e].classList.add("sl89-"+e)}else w.node=function(e){const t={slider:document.createElement("div")};e=e.trim();const n=new Array;let o,a=0;for(;o=r.tag.exec(e);)if(o.index!==a&&s("tag ‘<"+(o[1]||"")+o[2]+">’",e.slice(a,o.index).trim()),a=r.tag.lastIndex,"/"!==o[1]){const e=u(o[2],o[3],o[4],o[5]);t[o[2]]=e,t[n[n.length-1]||"slider"].appendChild(e),null==o[1]&&n.push(o[2])}else{const e=n.pop();e!==o[2]&&(-1!==n.indexOf(o[2])?l(e):V("structure","the closing tag ‘</"+o[2]+">’ couldn't find a matching opening tag"))}return a!==e.length&&s("end of string",e.slice(a)),n.length>1?V("structure","couldn't find a matching closing tag for following elements:"+i(n)):1===n.length&&l(n[0]),function(){let e=t.thumb;t.thumb||(e=u("thumb","div")),t.track||(t.track=u("track","div"),t.thumb?e.parentNode.appendChild(t.track):t.slider.appendChild(t.track)),t.thumb=new Array(w.values.length),t.thumb[0]=e;for(let n=0;n<w.values.length;n++)n>0&&(t.thumb[n]=e.cloneNode(!0)),t.thumb[n].classList.add("sl89-thumb"),t.track.appendChild(t.thumb[n]),null==t.thumb[n].tabindex&&(t.thumb[n].tabindex="0");t.track.classList.add("sl89-track")}(),t;function s(e,t){V("structure","something has been declared wrongly and couldn't be parsed. Point of failure before "+e+":\n  "+t+"\n")}function l(e){V("structure","couldn't find a matching closing tag for the element ‘<"+e+">’ (Should it be a self-closing tag marked with ‘:’?)")}function u(e,n,o,i){e in t&&V("structure","Every element must have a unique name but there are mutiple elements called ‘"+e+"’");const a=document.createElement(n||"div");if(c(o,a,!1)||(a.textContent=o),i){let e;for(;e=r.attributes.exec(i);){const t=e[1];let n=e[2];c(n,a,t)||a.setAttribute(t,n)}}return a}function c(e,t,n){if(r.variableNoFlag.test(e)){const o={};let i;for(;i=r.variable.exec(e);){const r=i[1]||i[2],a=-1!==r.indexOf(".")?r.slice(0,r.indexOf(".")):r;if(!o.hasOwnProperty(a)){Object.prototype.hasOwnProperty.call(w,a)||V("structure","‘"+a+"’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor"),null==y[a]&&(y[a]=new Array);const r={str:e,elem:t};n&&(r.attr=n),y[a].push(r),o[a]=r}}return!0}return!1}}(w.structure);if(u){const e=n.attributes;for(let t=0;t<e.length;t++)w.node.slider.setAttribute(e[t].name,e[t].value)}if(w.node.slider.classList.add("slider89"),"vertical"===w.orientation&&w.node.slider.classList.add("vertical"),w.classList){const e=new Array;for(let t in w.classList){const n=w.classList[t];if(Object.prototype.hasOwnProperty.call(w.node,t)){if(0===e.length)for(let e=0;e<n.length;e++)w.node[t].classList.add(n[e])}else e.push(t)}e.length>0&&V("classList","the given object contains items which aren't nodes of this slider:"+i(e)+"Following nodes are part of this slider's node pool:"+i(Object.keys(w.node)))}!function(){const t=function(){const e=document.head.firstElementChild;return e?document.head.insertBefore(document.createElement("style"),e).sheet:document.head.appendChild(document.createElement("style")).sheet}();for(let n=0;n<e.length;n++)t.insertRule(e[n],0)}(),u?n.parentNode.replaceChild(w.node.slider,n):n.appendChild(w.node.slider),p=getComputedStyle(w.node.track);for(let e=0;e<w.node.thumb.length;e++)B(e),w.node.thumb[e].addEventListener("touchstart",F),w.node.thumb[e].addEventListener("mousedown",$);if(!1!==w.structure)for(let e in y)Object.prototype.hasOwnProperty.call(y,e)&&E(e);window.addEventListener("keydown",z)}(),g=!1}}()})(),r.default})()}));