!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Slider89=t():e.Slider89=t()}(this,(function(){return function(){var e={977:function(e){e.exports=[".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);",".slider89.vertical .sl89-track{height:200px;width:25px;",".sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;",".slider89.vertical .sl89-thumb{height:16px;width:100%;",".sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;"]}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}var r={};return function(){"use strict";r.default=function(){const e=n(977),t=["start","move","end","change:$property"],r={};function i(e){return Number.isNaN&&Number.isNaN(e)||!Number.isNaN&&"number"==typeof e&&e!=e}function o(e){return Array.from&&Array.from(e)||Array.prototype.slice.call(e)}function a(e){return'\n - "'+e.join('"\n - "')+'"\n'}function s(e,t){let n=t?"":"but it is ";return Array.isArray(e)?n+="an array":i(e)?n+="NaN":n+=null===e?"null":"boolean"==typeof e?e:"of type "+typeof e,n}function l(e,t,n){let r;for(let n=0;n<t.length;n++){const a=t[n],s=a.type;if("boolean"===s&&"boolean"==typeof e||"true"===s&&!0===e||"false"===s&&!1===e||"array"===s&&Array.isArray(e)||"object"===s&&"[object Object]"===Object.prototype.toString.call(e)||"number"===s&&"number"==typeof e&&!i(e)||"function"===s&&"function"==typeof e||"string"===s&&"string"==typeof e){if("array"==s)for(let t=0;t<e.length&&!(r=l(e[t],a.structure,!0));t++);else if("object"===s)for(let t in e)if(r=l(e[t],a.structure,!0))break;if(r)return r;if(r=o(a.conditions,e))break;return!1}}return r?" is "+r:(n?"s values are ":" is ")+s(e,!0);function o(e,t){if(e){if(e.nonnegative&&t<0)return"a negative number";if(e.positive&&t<=0)return"a negative number or 0";if(e.integer&&t%1!=0)return"a floating point number";if(e.filled&&""===t.trim())return"an empty string";if(e.keywords&&-1===e.keywords.indexOf(t))return"a different string";if(e.wordChar&&!i(Number(t)))return"a pure number string";if(e.length&&t.length!==e.length)return("array"===type?"an ":"a ")+type+" of length "+t.length}}}function u(e,t,n,r){let i="";for(let o=0;o<e.length;o++){const a=e[o].type,s=e[o].conditions;if(i&&(i+=" or "),"number"===a){const e=s&&s.positive,t=s&&s.nonnegative,r=s&&s.integer;t||e?(n||(i+="a "),i+=t?"non-negative":"positive"):i+=r&&!n?"an":"any",i+=" "+(r?"integer":"number"),n&&(i+="s")}else if("array"===a){const t=s&&s.length,a=u(e[o].structure,!1,1!==t,!0);n||(i+="a"),r?i+=a:n||(i+="n"),i+=" array",n&&(i+="s"),t&&(i+=" of length "+t),r||(i+=" with "+a+" as values")}else"object"===a?i+="an object with "+u(e[o].structure,!1,!0,!0)+" as values":"function"===a?(r||(i+="a "),i+="function reference",!r&&n&&(i+="s")):"string"===a?s&&s.keywords?(s.keywords.length>1?i+="one of the keywords":i+="the keyword",s.keywords.forEach((function(e,t,n){0!==t&&t===n.length-1?i+=" or":0!==t&&(i+=","),i+=' "'+e+'"'}))):(r||(i+="a "),s&&s.filled&&(i+="non-empty "),s&&s.wordChar&&(i+="non-number "),i+="string",!r&&n&&(i+="s")):"boolean"===a?(r||(i+="a "),i+="boolean",!r&&n&&(i+="s")):"true"!==a&&"false"!==a||(i+=a);t&&(i+=" ("+t+")",t=!1)}return i}return function(){const e={attr:{name:"[\\w-]+"},all:"[\\d\\D]",capName:"([\\w-]+)"};e.attr.value="(?:(?!<)"+e.all+")*?",e.tagType="(?:\\s+"+e.capName+")?",e.content='(?:\\s+"('+e.all+'+?)")?',e.attribs="(?:\\s+"+e.attr.name+"=\\["+e.attr.value+"\\])*",e.varContent="\\$((?:\\w+(?:\\.(?=\\w))?)+)";const t={variable:"\\{"+e.varContent+"\\}|"+e.varContent,attributes:"("+e.attr.name+")=\\[("+e.attr.value+")\\](?:\\s+|$)",tag:"<([/:])?"+e.capName+e.tagType+e.content+"("+e.attribs+")\\s*?>\\s*"};for(let e in t)r[e]=new RegExp(t[e],"g");r.variableNoFlag=new RegExp(t.variable)}(),function(n,i,c){n?n.nodeType&&1===n.nodeType||L("the first argument must be a valid DOM node the slider will be placed into "+s(n),"constructor",!0):L("no first argument has been supplied. It needs to be the DOM target node for the slider","constructor",!0),null==i||!1===i?i={}:("object"!=typeof i||Array.isArray(i))&&L("the optional second argument needs to be an object for configuration "+s(i),"constructor",!0);const d=this;let f,h,p,g,m=!1,y=0;const v="values"in i,b={},w={},k={};Object.defineProperties(k,{$:{value:{}},$intermediateThis:{value:{}},$intermediateVals:{value:{}}});const x={addEvent:{function:function(e,n,r){j(e)||L("the specified type ‘"+e+"’ is not a valid event type. Available types are:"+a(t),"addEvent"),Array.isArray(k.events[e])||(k.events[e]=new Array),k.events[e].push(n);const i=r||y,o={type:e,fn:n};return r?(Array.isArray(w[i])||(w[i]=new Array),w[i].push(o)):w[i]=o,r||y++},args:[{name:"event type",structure:[{type:"string"}]},{name:"event function",structure:[{type:"function"}]},{name:"event namespace",optional:!0,structure:[{type:"string",conditions:{filled:!0,wordChar:!0}}]}]},removeEvent:{function:function(e){const t=w[e];return!!t&&(delete w[e],Array.isArray(t)?t.reduce(n,new Array):n(new Array,t));function n(e,t){const n=k.events[t.type],r=n.splice(n.indexOf(t.fn),1)[0];return 0===n.length&&delete k.events[t.type],e.push(r),e}},args:[{name:"event identifier/namespace",structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"string",conditions:{filled:!0,wordChar:!0}}]}]}},A={range:{default:[0,100],structure:[{type:"array",conditions:{length:2},structure:[{type:"number"}]},{type:"boolean"}],shape:"[startValue, endValue]",setter:function(e){e[0]===e[1]&&X("range","the given range of ["+e.join(", ")+"] defines the same value for both range start and end"),m||B({range:e})}},values:{isDeepDefinedArray:!0,default:function(){return[k.range[0]]},structure:[{type:"array",structure:[{type:"number"}]}],setter:function(e){m||e.length>k.values.length||(e.length,k.values.length)},keySetter:function(e,t){return e=function(e){if(k.range[0]<k.range[1]){if(e<k.range[0])return k.range[0];if(e>k.range[1])return k.range[1]}else{if(e>k.range[0])return k.range[0];if(e<k.range[1])return k.range[1]}return e}(e),m?k.values[t]=e:B(t,{value:e}),!0},keyGetter:function(e,t){return!1!==k.precision?Number(e.toFixed(k.precision)):e}},value:{structure:[{type:"number"}],setter:function(e){m&&v&&X("value","only one of ‘value’ and ‘values’ may be set in the constructor")},getter:function(e){return d.values[0]}},precision:{default:!1,structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"false"}],setter:function(e){m||B({precision:e})}},step:{default:!1,structure:[{type:"number",conditions:{positive:!0}},{type:"false"}],setter:function(e){!1!==k.precision&&!1!==e&&Number(e.toFixed(k.precision))!==e&&X("step","the given value of "+e+" exceeds the currently set precision of "+k.precision),m||B({step:e})}},structure:{default:!1,structure:[{type:"string",conditions:{filled:!0}},{type:"false"}],initial:!0},node:{default:{},static:!0},orientation:{default:"horizontal",structure:[{type:"string",conditions:{keywords:["horizontal","vertical"]}}],setter:function(e){if(!m)return"vertical"===e?(k.node.thumb.style.removeProperty("left"),k.node.slider.classList.add("vertical")):(k.node.thumb.style.removeProperty("top"),k.node.slider.classList.remove("vertical")),k.orientation=e,B(),!0}},classList:{default:!1,structure:[{type:"object",structure:[{type:"array",structure:[{type:"string"}]}]},{type:"false"}],initial:!0,shape:"{nodeName: [...classes]}"},events:{default:{},structure:[{type:"object",structure:[{type:"array",structure:[{type:"function"}]}]},{type:"false"}],initial:!0,setter:function(e){const n=new Array;for(let t in e)j(t)||n.push(t);n.length>0&&X("events","the given object contains items which are no valid event types:"+a(n)+"Available event types are:"+a(t))}}};function L(e,t,n){throw"\n"!==(e="Slider89"+(t?" @ "+t:"")+": "+e)[e.length-1]&&"."!==e[e.length-1]&&(e+=".\n"),(m||n)&&(e+="Aborting the slider construction."),new Error(e)}function j(e){if(0===e.indexOf("change:")){const t=e.slice("change:".length);Object.prototype.hasOwnProperty.call(k,t)||L("‘"+e+"’ refers to ‘"+t+"’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized","addEvent")}else if(-1===t.indexOf(e))return!1;return!0}function C(e,t,n,r){Object.defineProperty(e,t,{set:function(e){if(r&&function(e,t){const n=k.$;k.$intermediateVals[e]=[];for(let r=0;r<t.length;r++)t[r],Object.defineProperty(k.$intermediateVals[e],r,{set:function(t){if(!m)var i=o(d[e]);n[e][r]=t,O(e,i,r)},get:function(){return n[e][r]},enumerable:!0})}(t,e),!m)var i=r?o(d[t]):d[t];if(n[t]=e,r)for(let n=0;n<e.length;n++)O(t,i,n);else O(t,i)},get:function(){return(r?k.$intermediateVals:n)[t]},enumerable:!0})}function E(e,t,n,r){const i=k;k.$intermediateThis[e]=[];for(let o=0;o<t.length;o++)t[o],Object.defineProperty(k.$intermediateThis[e],o,{set:function(r){n&&n(r,o)||(i[e][o]=t)},get:function(){return r?r(i[e][o]):i[e][o]},enumerable:!0}),k.$intermediateThis[e][o]=t[o]}function O(e,t,n){m||("object"==typeof d[e]||t===d[e])&&null!=n&&t[n]===d[e][n]||(Object.prototype.hasOwnProperty.call(b,e)&&N(e),null!=n?S(["change:"+e],t,n):S(["change:"+e],t))}function N(e){for(let n in b[e]){const i=b[e][n],o=i.str.replace(r.variable,(function(e,n,r){return t(n||r)}));i.attr?i.elem.setAttribute(i.attr,o):i.elem.textContent=o}function t(e){const t=e.split(".");let n=d[t[0]];if(t.length>1)for(let r=1;r<t.length;r++)try{n=n[t[r]]}catch(i){L("Variable ‘"+e+"’ cannot access property ‘"+t[r]+"’ on "+n,"structure")}return n}}function T(e){return parseFloat(g["padding"+e])}function D(e){return"vertical"===k.orientation?e.getBoundingClientRect().top-k.node.track.getBoundingClientRect().top-T("Top"):e.getBoundingClientRect().left-k.node.track.getBoundingClientRect().left-T("Left")}function P(e){return"vertical"===k.orientation?k.node.track.getBoundingClientRect().height-T("Top")-T("Bottom")-e.getBoundingClientRect().height:k.node.track.getBoundingClientRect().width-T("Left")-T("Right")-e.getBoundingClientRect().width}function $(e,t,n){return null==n&&(n=P(e)),t/n*(k.range[1]-k.range[0])+k.range[0]}function R(e,t,n){if(n)e.style.transform="translate"+("vertical"===k.orientation?"Y":"X")+"("+t+"px)";else{if("vertical"===k.orientation)var r=T("Top"),i=T("Bottom"),o=e.clientHeight,a="top";else r=T("Left"),i=T("Right"),o=e.clientWidth,a="left";let n=o*t+"px";i&&(n+=" - "+i*t+"px"),r&&(n+=" + "+r*(1-t)+"px"),e.style[a]="calc("+100*t+"% - "+n+")"}}function B(e,t,n){let r,i;if(t){const n=["range","step"];for(let e in n)null==t[n[e]]&&(t[n[e]]=k[n[e]]);null!=t.value?r=t.value:(i=(k.values[e]-k.range[0])/(k.range[1]-k.range[0]),r=(t.range[1]-t.range[0])*i+t.range[0])}else t=k,r=k.values[e];!1!==t.step&&(r=Math.abs(t.range[1]-t.range[0])<t.step?t.range[0]:t.range[0]+Math.round((r-t.range[0])/t.step)*t.step);const o=(r-t.range[0])/(t.range[1]-t.range[0]);if(n)return{value:r,ratio:o};r!==k.values[e]&&(k.values[e]=r),o!==i&&R(k.node.thumb[e],o)}function S(e){const t=Array.from(arguments);t[0]=d;for(let n=0;n<e.length;n++){const r=k.events[e[n]];if(r)for(let e=0;e<r.length;e++)r[e].apply(d,t)}}function z(e){if(document.activeElement===k.node.thumb){let t=Math.round((k.range[1]-k.range[0])/100);e.shiftKey&&e.ctrlKey?t*=.1:e.shiftKey&&(t*=10),"ArrowLeft"===e.key||"ArrowUp"===e.key?(e.preventDefault(),d.value-=t):"ArrowRight"!==e.key&&"ArrowDown"!==e.key||(e.preventDefault(),d.value+=t)}}function V(e){e.preventDefault(),null==h&&(h=e.changedTouches[0].identifier,G.call(this,e.changedTouches[0],e),k.node.thumb.addEventListener("touchmove",F),k.node.thumb.addEventListener("touchend",M),k.node.thumb.addEventListener("touchcancel",M))}function F(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===h){I.call(this,e.changedTouches[t],e);break}}function M(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===h){k.node.thumb.removeEventListener("touchmove",F),k.node.thumb.removeEventListener("touchend",M),k.node.thumb.removeEventListener("touchcancel",M),K.call(this,e.changedTouches[t],e),h=null;break}}function G(e,t){if(f=this,document.body.classList.add("sl89-noselect"),f.classList.add("active"),S(["start"],t||e),"vertical"===k.orientation)var n="top",r=e.clientY;else n="left",r=e.clientX;const i=D(f);p=r-i,R(f,i,!0),f.style.removeProperty(n),t||(window.addEventListener("mouseup",K),window.addEventListener("mousemove",I))}function I(e,t){const n=k.node.thumb.indexOf(f),r=P(f);let i=("vertical"===k.orientation?e.clientY:e.clientX)-p;i>r?i=r:i<0&&(i=0);let o=$(f,i,r);if(!1!==k.step){const e=B(n,{value:o},!0);o=e.value,i=e.ratio*r}k.values[n]!==o&&(k.values[n]=o,R(f,i,!0),S(["move"],t||e))}function K(e,t){t||(window.removeEventListener("mouseup",K),window.removeEventListener("mousemove",I));const n=$(f,D(f));B(k.node.thumb.indexOf(f),{value:n}),f.style.removeProperty("transform"),S(["end"],t||e),f.classList.remove("active"),document.body.classList.remove("sl89-noselect"),p=null,f=null}function X(e,t,n){if(!m){let n=k[e];Array.isArray(n)&&(n="["+n.join(", ")+"]"),t+=".\nContinuing with the previous value ("+n+")."}L(t,!n&&e)}function Y(e,t,n,r){const i=x[e].args[t];let o="the "+(i.optional?"optional ":"")+["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth"][t]+" argument ("+i.name+") ";r&&(o+="has been omitted but it is required. It "),o+="must be "+u(i.structure),r||(o+=" but it"+n),L(o,e)}function q(e,t){const n=x[e];for(let r in t){const i=l(t[r],n.args[r].structure,!1);i&&Y(e,r,i)}n.args[t.length]&&!n.args[t.length].optional&&Y(e,t.length,null,!0)}function _(e,t){const n=A[e],r=l(t,n.structure,!1);r&&X(e,"property ‘"+e+"’ must be "+u(n.structure,n.shape)+" but it"+r,!0)}m=!0,function(){for(let e in A){const t=e,n=A[t];if(Object.defineProperty(d,t,{set:function(e){n.static&&L("property ‘"+t+"’ may only be read from but it was just set with the value ‘"+e+"’"),n.initial&&!m&&L("property ‘"+t+"’ may only be set at init time but it was just set with the value ‘"+e+"’"),_(t,e),n.setter&&n.setter(e)||(k[t]=e),n.isDeepDefinedArray&&E(t,e,n.keySetter,n.keyGetter)},get:function(){const e=n.isDeepDefinedArray?k.$intermediateThis:k;return n.getter?n.getter(e[t]):e[t]},enumerable:!0}),C(k,t,k.$,n.isDeepDefinedArray),t in i)d[t]=i[t],delete i[t];else if("default"in n){const e=n.default;(n.getter||n.keyGetter?d:k)[t]="function"==typeof e?e():e}}for(let e in i){const t=e;"_"===t[0]?(C(d,t,k),k[t]=i[t]):L("‘"+t+"’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_"+t+"’)")}for(let e in x){const t=e,n=x[t];d[t]=function(){const e=Array.prototype.slice.call(arguments,0,n.args.length);return q(t,e),n.function.apply(this,e)}}}(),function(){if(!1===k.structure){k.node.slider=document.createElement("div"),k.node.track=document.createElement("div"),k.node.thumb=new Array(k.values.length);for(let e=0;e<k.values.length;e++)k.node.thumb[e]=document.createElement("div"),k.node.track.appendChild(k.node.thumb[e]);k.node.slider.appendChild(k.node.track);for(let e in k.node)if("slider"!==e)if("thumb"===e)for(let t=0;t<k.node[e].length;t++)k.node[e][t].classList.add("sl89-"+e);else k.node[e].classList.add("sl89-"+e)}else k.node=function(e){const t={slider:document.createElement("div")};e=e.trim();const n=new Array;let i,o=0;for(;i=r.tag.exec(e);)if(i.index!==o&&s("tag ‘<"+(i[1]||"")+i[2]+">’",e.slice(o,i.index).trim()),o=r.tag.lastIndex,"/"!==i[1]){const e=u(i[2],i[3],i[4],i[5]);t[i[2]]=e,t[n[n.length-1]||"slider"].appendChild(e),null==i[1]&&n.push(i[2])}else{const e=n.pop();e!==i[2]&&(-1!==n.indexOf(i[2])?l(e):X("structure","the closing tag ‘</"+i[2]+">’ couldn't find a matching opening tag"))}return o!==e.length&&s("end of string",e.slice(o)),n.length>1?X("structure","couldn't find a matching closing tag for following elements:"+a(n)):1===n.length&&l(n[0]),function(){let e=t.thumb;t.thumb||(e=u("thumb","div")),t.track||(t.track=u("track","div"),t.thumb?e.parentNode.appendChild(t.track):t.slider.appendChild(t.track)),t.thumb=new Array(k.values.length),t.thumb[0]=e;for(let n=0;n<k.values.length;n++)n>0&&(t.thumb[n]=e.cloneNode(!0)),t.thumb[n].classList.add("sl89-thumb"),t.track.appendChild(t.thumb[n]),null==t.thumb[n].tabindex&&(t.thumb[n].tabindex="0");t.track.classList.add("sl89-track")}(),t;function s(e,t){X("structure","something has been declared wrongly and couldn't be parsed. Point of failure before "+e+":\n  "+t+"\n")}function l(e){X("structure","couldn't find a matching closing tag for the element ‘<"+e+">’ (Should it be a self-closing tag marked with ‘:’?)")}function u(e,n,i,o){e in t&&X("structure","Every element must have a unique name but there are mutiple elements called ‘"+e+"’");const a=document.createElement(n||"div");if(c(i,a,!1)||(a.textContent=i),o){let e;for(;e=r.attributes.exec(o);){const t=e[1];let n=e[2];c(n,a,t)||a.setAttribute(t,n)}}return a}function c(e,t,n){if(r.variableNoFlag.test(e)){const i={};let o;for(;o=r.variable.exec(e);){const r=o[1]||o[2],a=-1!==r.indexOf(".")?r.slice(0,r.indexOf(".")):r;if(!i.hasOwnProperty(a)){Object.prototype.hasOwnProperty.call(k,a)||X("structure","‘"+a+"’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor"),null==b[a]&&(b[a]=new Array);const r={str:e,elem:t};n&&(r.attr=n),b[a].push(r),i[a]=r}}return!0}return!1}}(k.structure);if(c){const e=n.attributes;for(let t=0;t<e.length;t++)k.node.slider.setAttribute(e[t].name,e[t].value)}if(k.node.slider.classList.add("slider89"),"vertical"===k.orientation&&k.node.slider.classList.add("vertical"),k.classList){const e=new Array;for(let t in k.classList){const n=k.classList[t];if(Object.prototype.hasOwnProperty.call(k.node,t)){if(0===e.length)for(let e=0;e<n.length;e++)if("thumb"===t)for(let r=0;r<k.node[t].length;r++)k.node[t][r].classList.add(n[e]);else k.node[t].classList.add(n[e])}else e.push(t)}e.length>0&&X("classList","the given object contains items which aren't nodes of this slider:"+a(e)+"Following nodes are part of this slider's node pool:"+a(Object.keys(k.node)))}!function(){const t=function(){const e=document.head.firstElementChild;return e?document.head.insertBefore(document.createElement("style"),e).sheet:document.head.appendChild(document.createElement("style")).sheet}();for(let n=0;n<e.length;n++)t.insertRule(e[n],0)}(),c?n.parentNode.replaceChild(k.node.slider,n):n.appendChild(k.node.slider),g=getComputedStyle(k.node.track);for(let e=0;e<k.node.thumb.length;e++)B(e),k.node.thumb[e].addEventListener("touchstart",V),k.node.thumb[e].addEventListener("mousedown",G);if(!1!==k.structure)for(let e in b)Object.prototype.hasOwnProperty.call(b,e)&&N(e);window.addEventListener("keydown",z)}(),m=!1}}()}(),r.default}()}));