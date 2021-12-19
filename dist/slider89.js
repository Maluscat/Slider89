!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Slider89=t():e.Slider89=t()}(this,(function(){return(()=>{var e={977:e=>{e.exports=[".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);",".slider89.vertical .sl89-track{height:200px;width:25px;",".sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;",".slider89.vertical .sl89-thumb{height:16px;width:100%;",".sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;"]}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";n.d(r,{default:()=>e});const e=function(){const e=n(977),t=["start","move","end","change:$property"],r=function(){const e={attr:{name:"[\\w-]+"},all:"[\\d\\D]",capName:"([\\w-]+)"};e.attr.value="(?:(?!<)"+e.all+")*?",e.tagType="(?:\\s+"+e.capName+")?",e.content='(?:\\s+"('+e.all+'+?)")?',e.attribs="(?:\\s+"+e.attr.name+"=\\["+e.attr.value+"\\])*",e.varContent="\\$((?:\\w+(?:\\.(?=\\w))?)+)";const t={variable:"\\{"+e.varContent+"\\}|"+e.varContent,attributes:"("+e.attr.name+")=\\[("+e.attr.value+")\\](?:\\s+|$)",tag:"<([/:])?"+e.capName+e.tagType+e.content+"("+e.attribs+")\\s*?>\\s*"};for(let e in t)t[e]=new RegExp(t[e],"g");return t.variableNoFlag=new RegExp(t.variable,""),t}();function o(e){return Number.isNaN&&Number.isNaN(e)||!Number.isNaN&&"number"==typeof e&&e!=e}function i(e){return'\n - "'+e.join('"\n - "')+'"\n'}function a(e,t){let n=t?"":"but it is ";return Array.isArray(e)?n+="an array":o(e)?n+="NaN":n+=null===e?"null":"boolean"==typeof e?e:"of type "+typeof e,n}function s(e,t,n){let r;for(let n=0;n<t.length;n++){const a=t[n],l=a.type;if("boolean"===l&&"boolean"==typeof e||"true"===l&&!0===e||"false"===l&&!1===e||"array"===l&&Array.isArray(e)||"object"===l&&"[object Object]"===Object.prototype.toString.call(e)||"number"===l&&"number"==typeof e&&!o(e)||"function"===l&&"function"==typeof e||"string"===l&&"string"==typeof e){if("array"==l)for(let t=0;t<e.length&&!(r=s(e[t],a.structure,!0));t++);else if("object"===l)for(let t in e)if(r=s(e[t],a.structure,!0))break;if(r)return r;if(r=i(a.conditions,e))break;return!1}}return r?" is "+r:(n?"s values are ":" is ")+a(e,!0);function i(e,t){if(e){if(e.nonnegative&&t<0)return"a negative number";if(e.positive&&t<=0)return"a negative number or 0";if(e.integer&&t%1!=0)return"a floating point number";if(e.filled&&""===t.trim())return"an empty string";if(e.keywords&&-1===e.keywords.indexOf(t))return"a different string";if(e.wordChar&&!o(Number(t)))return"a pure number string";if(e.length&&t.length!==e.length)return("array"===type?"an ":"a ")+type+" of length "+t.length}}}function l(e,t,n,r){let o="";for(let i=0;i<e.length;i++){const a=e[i].type,s=e[i].conditions;if(o&&(o+=" or "),"number"===a){const e=s&&s.positive,t=s&&s.nonnegative,r=s&&s.integer;t||e?(n||(o+="a "),o+=t?"non-negative":"positive"):o+=r&&!n?"an":"any",o+=" "+(r?"integer":"number"),n&&(o+="s")}else if("array"===a){const t=s&&s.length,a=l(e[i].structure,!1,1!==t,!0);n||(o+="a"),r?o+=a:n||(o+="n"),o+=" array",n&&(o+="s"),t&&(o+=" of length "+t),r||(o+=" with "+a+" as values")}else"object"===a?o+="an object with "+l(e[i].structure,!1,!0,!0)+" as values":"function"===a?(r||(o+="a "),o+="function reference",!r&&n&&(o+="s")):"string"===a?s&&s.keywords?(s.keywords.length>1?o+="one of the keywords":o+="the keyword",s.keywords.forEach((function(e,t,n){0!==t&&t===n.length-1?o+=" or":0!==t&&(o+=","),o+=' "'+e+'"'}))):(r||(o+="a "),s&&s.filled&&(o+="non-empty "),s&&s.wordChar&&(o+="non-number "),o+="string",!r&&n&&(o+="s")):"boolean"===a?(r||(o+="a "),o+="boolean",!r&&n&&(o+="s")):"true"!==a&&"false"!==a||(o+=a);t&&(o+=" ("+t+")",t=!1)}return o}return function(n,o,c){n?n.nodeType&&1===n.nodeType||k("the first argument must be a valid DOM node the slider will be placed into "+a(n),"constructor",!0):k("no first argument has been supplied. It needs to be the DOM target node for the slider","constructor",!0),null==o||!1===o?o={}:("object"!=typeof o||Array.isArray(o))&&k("the optional second argument needs to be an object for configuration "+a(o),"constructor",!0);const u=this;let d,f,p,h,g=!1,m=0;const y={},v={},b={};Object.defineProperty(b,"$",{value:{}});const w={addEvent:{function:function(e,n,r){j(e)||k("the specified type ‘"+e+"’ is not a valid event type. Available types are:"+i(t),"addEvent"),Array.isArray(b.events[e])||(b.events[e]=new Array),b.events[e].push(n);const o=r||m,a={type:e,fn:n};return r?(Array.isArray(v[o])||(v[o]=new Array),v[o].push(a)):v[o]=a,r||m++},args:[{name:"event type",structure:[{type:"string"}]},{name:"event function",structure:[{type:"function"}]},{name:"event namespace",optional:!0,structure:[{type:"string",conditions:{filled:!0,wordChar:!0}}]}]},removeEvent:{function:function(e){const t=v[e];return!!t&&(delete v[e],Array.isArray(t)?t.reduce(n,new Array):n(new Array,t));function n(e,t){const n=b.events[t.type],r=n.splice(n.indexOf(t.fn),1)[0];return 0===n.length&&delete b.events[t.type],e.push(r),e}},args:[{name:"event identifier/namespace",structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"string",conditions:{filled:!0,wordChar:!0}}]}]}},x={range:{default:[0,100],structure:[{type:"array",conditions:{length:2},structure:[{type:"number"}]},{type:"boolean"}],shape:"[startValue, endValue]",setter:function(e){e[0]===e[1]&&$("range","the given range of ["+e.join(", ")+"] defines the same value for both range start and end"),g||P({range:e})}},value:{default:function(){return b.range[0]},structure:[{type:"number"}],setter:function(e){return b.range[0]<b.range[1]?e<b.range[0]?e=b.range[0]:e>b.range[1]&&(e=b.range[1]):e>b.range[0]?e=b.range[0]:e<b.range[1]&&(e=b.range[1]),g?(b.value=e,!0):(P({value:e}),!0)},getter:function(e){return!1!==b.precision?Number(e.toFixed(b.precision)):e}},precision:{default:!1,structure:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"false"}],setter:function(e){if(!1!==e)for(let t=0;t<b.range.length;t++)Number(b.range[t].toFixed(e))!==b.range[t]&&$("range","the given range "+["start","end"][t]+" of `"+b.range[t]+"` exceeds the currently set precision of "+e);g||P({precision:e})}},step:{default:!1,structure:[{type:"number",conditions:{positive:!0}},{type:"false"}],setter:function(e){!1!==b.precision&&!1!==e&&Number(e.toFixed(b.precision))!==e&&$("step","the given value of "+e+" exceeds the currently set precision of "+b.precision),g||P({step:e})}},structure:{default:!1,structure:[{type:"string",conditions:{filled:!0}},{type:"false"}],initial:!0},node:{default:{},static:!0},orientation:{default:"horizontal",structure:[{type:"string",conditions:{keywords:["horizontal","vertical"]}}]},classList:{default:!1,structure:[{type:"object",structure:[{type:"array",structure:[{type:"string"}]}]},{type:"false"}],initial:!0,shape:"{nodeName: [...classes]}"},events:{default:{},structure:[{type:"object",structure:[{type:"array",structure:[{type:"function"}]}]},{type:"false"}],initial:!0,setter:function(e){const n=new Array;for(let t in e)j(t)||n.push(t);n.length>0&&$("events","the given object contains items which are no valid event types:"+i(n)+"Available event types are:"+i(t))}}};function k(e,t,n){throw"\n"!==(e="Slider89"+(t?" @ "+t:"")+": "+e)[e.length-1]&&"."!==e[e.length-1]&&(e+=".\n"),(g||n)&&(e+="Aborting the slider construction."),new Error(e)}function j(e){if(0===e.indexOf("change:")){const t=e.slice("change:".length);Object.prototype.hasOwnProperty.call(b,t)||k("‘"+e+"’ refers to ‘"+t+"’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized","addEvent")}else if(-1===t.indexOf(e))return!1;return!0}function O(e,t,n){Object.defineProperty(e,t,{set:function(e){if(!g)var r=u[t];n[t]=e,g||r===u[t]||(Object.prototype.hasOwnProperty.call(y,t)&&A(t),T(["change:"+t],r))},get:function(){return n[t]},enumerable:!0})}function A(e){for(let n in y[e]){const o=y[e][n],i=o.str.replace(r.variable,(function(e,n,r){return t(n||r)}));o.attr?o.elem.setAttribute(o.attr,i):o.elem.textContent=i}function t(e){const t=e.split(".");let n=u[t[0]];if(t.length>1)for(let r=1;r<t.length;r++)try{n=n[t[r]]}catch(o){k("Variable ‘"+e+"’ cannot access property ‘"+t[r]+"’ on "+n,"structure")}return n}}function L(e){return parseFloat(h["padding"+e])}function E(){return"vertical"===b.orientation?b.node.track.clientHeight-L("Top")-L("Bottom")-b.node.thumb.clientHeight:b.node.track.clientWidth-L("Left")-L("Right")-b.node.thumb.clientWidth}function C(e,t){return null==t&&(t=E()),e/t*(b.range[1]-b.range[0])+b.range[0]}function N(e,t){if(t)b.node.thumb.style.transform="translate"+("vertical"===b.orientation?"Y":"X")+"("+e+"px)";else{if("vertical"===b.orientation)var n=L("Top"),r=L("Bottom"),o=b.node.thumb.clientHeight,i="top";else n=L("Left"),r=L("Right"),o=b.node.thumb.clientWidth,i="left";let t=o*e+"px";r&&(t+=" - "+r*e+"px"),n&&(t+=" + "+n*(1-e)+"px"),b.node.thumb.style[i]="calc("+100*e+"% - "+t+")"}}function P(e,t){let n,r;if(e){const t=["range","step"];for(let n in t)null==e[t[n]]&&(e[t[n]]=b[t[n]]);null!=e.value?n=e.value:(r=(b.value-b.range[0])/(b.range[1]-b.range[0]),n=(e.range[1]-e.range[0])*r+e.range[0])}else e=b,n=b.value;!1!==e.step&&(n=Math.abs(e.range[1]-e.range[0])<e.step?e.range[0]:e.range[0]+Math.round((n-e.range[0])/e.step)*e.step);const o=(n-e.range[0])/(e.range[1]-e.range[0]);if(t)return{value:n,ratio:o};n!==b.value&&(b.value=n),o!==r&&N(o)}function T(e){const t=Array.from(arguments);t[0]=u;for(let n=0;n<e.length;n++){const r=b.events[e[n]];if(r)for(let e=0;e<r.length;e++)r[e].apply(u,t)}}function F(e){e.preventDefault(),null==f&&(f=e.changedTouches[0].identifier,D.call(this,e.changedTouches[0],e),b.node.thumb.addEventListener("touchmove",z),b.node.thumb.addEventListener("touchend",R),b.node.thumb.addEventListener("touchcancel",R))}function z(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===f){S.call(this,e.changedTouches[t],e);break}}function R(e){e.preventDefault();for(let t=0;t<e.changedTouches.length;t++)if(e.changedTouches[t].identifier===f){b.node.thumb.removeEventListener("touchmove",z),b.node.thumb.removeEventListener("touchend",R),b.node.thumb.removeEventListener("touchcancel",R),B.call(this,e.changedTouches[t],e),f=null;break}}function D(e,t){if(document.body.classList.add("sl89-noselect"),b.node.thumb.classList.add("active"),T(["start"],t||e),d=this,"vertical"===b.orientation)var n="Top",r="top",o=e.clientY;else n="Left",r="left",o=e.clientX;const i=d.getBoundingClientRect()[r]-b.node.track.getBoundingClientRect()[r]-L(n);p=o-i,N(i,!0),d.style.removeProperty(r),t||(window.addEventListener("mouseup",B),window.addEventListener("mousemove",S))}function S(e,t){const n=E();let r=("vertical"===b.orientation?e.clientY:e.clientX)-p;r>n?r=n:r<0&&(r=0);let o=C(r,n);if(!1!==b.step){const e=P({value:o},!0);o=e.value,r=e.ratio*n}b.value!==o&&(b.value=o,N(r,!0),T(["move"],t||e))}function B(e,t){t||(window.removeEventListener("mouseup",B),window.removeEventListener("mousemove",S)),P({value:C(function(){const e=b.node.thumb.style.transform,t="vertical"===b.orientation?"translateY(":"translateX(",n=e.slice(e.indexOf(t)+t.length);return parseFloat(n.slice(0,n.indexOf(")")))}())}),d.style.removeProperty("transform"),p=null,d=null,T(["end"],t||e),b.node.thumb.classList.remove("active"),document.body.classList.remove("sl89-noselect")}function $(e,t,n){if(!g){let n=b[e];Array.isArray(n)&&(n="["+n.join(", ")+"]"),t+=".\nContinuing with the previous value ("+n+")."}k(t,!n&&e)}function M(e,t,n,r){const o=w[e].args[t];let i="the "+(o.optional?"optional ":"")+["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth"][t]+" argument ("+o.name+") ";r&&(i+="has been omitted but it is required. It "),i+="must be "+l(o.structure),r||(i+=" but it"+n),k(i,e)}function X(e,t){const n=w[e];for(let r in t){const o=s(t[r],n.args[r].structure,!1);o&&M(e,r,o)}n.args[t.length]&&!n.args[t.length].optional&&M(e,t.length,null,!0)}function Y(e,t){const n=x[e],r=s(t,n.structure,!1);r&&$(e,"property ‘"+e+"’ must be "+l(n.structure,n.shape)+" but it"+r,!0)}g=!0,function(){for(let e in x){const t=e,n=x[t];if(Object.defineProperty(u,t,{set:function(e){if(n.static)k("property ‘"+t+"’ may only be read from but it was just set with the value ‘"+e+"’");else if(!n.initial||g){let r;Y(t,e),n.setter&&(r=n.setter(e)),void 0===r&&(b[t]=e)}else k("property ‘"+t+"’ may only be set at init time but it was just set with the value ‘"+e+"’")},get:function(){return n.getter?n.getter(b[t]):b[t]},enumerable:!0}),O(b,t,b.$),t in o)u[t]=o[t],delete o[t];else{const e=n.default;b[t]="function"==typeof e?e():e}}for(let e in o){const t=e;"_"===t[0]?(O(u,t,b),b[t]=o[t]):k("‘"+t+"’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_"+t+"’)")}for(let e in w){const t=e,n=w[t];u[t]=function(){const e=Array.prototype.slice.call(arguments,0,n.args.length);return X(t,e),n.function.apply(this,e)}}}(),function(){if(!1===b.structure){b.node.slider=document.createElement("div"),b.node.track=document.createElement("div"),b.node.thumb=document.createElement("div"),b.node.track.appendChild(b.node.thumb),b.node.slider.appendChild(b.node.track);for(let e in b.node)"slider"!==e&&b.node[e].classList.add("sl89-"+e)}else{b.node=function(e){const t={slider:document.createElement("div")};e=e.trim();const n=new Array;let o,a=0;for(;o=r.tag.exec(e);)if(o.index!==a&&s("tag ‘<"+(o[1]||"")+o[2]+">’",e.slice(a,o.index).trim()),a=r.tag.lastIndex,"/"!==o[1]){const e=c(o[2],o[3],o[4],o[5]);t[o[2]]=e,t[n[n.length-1]||"slider"].appendChild(e),null==o[1]&&n.push(o[2])}else{const e=n.pop();e!==o[2]&&(-1!==n.indexOf(o[2])?l(e):$("structure","the closing tag ‘</"+o[2]+">’ couldn't find a matching opening tag"))}return a!==e.length&&s("end of string",e.slice(a)),n.length>1?$("structure","couldn't find a matching closing tag for following elements:"+i(n)):1===n.length&&l(n[0]),function(){const e=t.track,n=t.thumb;e||(t.track=c("track","div")),n||(t.thumb=c("thumb","div")),e||n?!e&&n?(t.thumb.parentNode.appendChild(t.track),t.track.appendChild(t.thumb)):e&&!n&&t.track.appendChild(t.thumb):(t.track.appendChild(t.thumb),t.slider.appendChild(t.track)),e.classList.add("sl89-track"),n.classList.add("sl89-thumb")}(),t;function s(e,t){$("structure","something has been declared wrongly and couldn't be parsed. Point of failure before "+e+":\n  "+t+"\n")}function l(e){$("structure","couldn't find a matching closing tag for the element ‘<"+e+">’ (Should it be a self-closing tag marked with ‘:’?)")}function c(e,n,o,i){e in t&&$("structure","Every element must have a unique name but there are mutiple elements called ‘"+e+"’");const a=document.createElement(n||"div");if(u(o,a,!1)||(a.textContent=o),i){let e;for(;e=r.attributes.exec(i);){const t=e[1];let n=e[2];u(n,a,t)||a.setAttribute(t,n)}}return a}function u(e,t,n){if(r.variableNoFlag.test(e)){const o={};let i;for(;i=r.variable.exec(e);){const r=i[1]||i[2],a=-1!==r.indexOf(".")?r.slice(0,r.indexOf(".")):r;if(!o.hasOwnProperty(a)){Object.prototype.hasOwnProperty.call(b,a)||$("structure","‘"+a+"’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor"),null==y[a]&&(y[a]=new Array);const r={str:e,elem:t};n&&(r.attr=n),y[a].push(r),o[a]=r}}return!0}return!1}}(b.structure);for(let e in y)Object.prototype.hasOwnProperty.call(y,e)&&A(e)}if(c){const e=n.attributes;for(let t=0;t<e.length;t++)b.node.slider.setAttribute(e[t].name,e[t].value)}if(b.node.slider.classList.add("slider89"),"vertical"===b.orientation&&b.node.slider.classList.add("vertical"),b.classList){const e=new Array;for(let t in b.classList){const n=b.classList[t];if(Object.prototype.hasOwnProperty.call(b.node,t)){if(0===e.length)for(let e=0;e<n.length;e++)b.node[t].classList.add(n[e])}else e.push(t)}e.length>0&&$("classList","the given object contains items which aren't nodes of this slider:"+i(e)+"Following nodes are part of this slider's node pool:"+i(Object.keys(b.node)))}!function(){const t=function(){const e=document.head.firstElementChild;return e?document.head.insertBefore(document.createElement("style"),e).sheet:document.head.appendChild(document.createElement("style")).sheet}();for(let n=0;n<e.length;n++)t.insertRule(e[n],0)}(),c?n.parentNode.replaceChild(b.node.slider,n):n.appendChild(b.node.slider),h=getComputedStyle(b.node.track),P(),b.node.thumb.addEventListener("touchstart",F),b.node.thumb.addEventListener("mousedown",D)}(),g=!1}}()})(),r.default})()}));