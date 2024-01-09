(function(b,u){typeof exports=="object"&&typeof module=="object"?module.exports=u():typeof define=="function"&&define.amd?define([],u):typeof exports=="object"?exports.Slider89=u():b.Slider89=u()})(this,()=>(()=>{var O={626:c=>{c.exports=".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);}.slider89.vertical .sl89-track{height:200px;width:25px;}.sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;}.slider89.vertical .sl89-thumb{height:16px;width:100%;}.sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;}"}},b={};function u(c){var d=b[c];if(d!==void 0)return d.exports;var p=b[c]={exports:{}};return O[c](p,p.exports,u),p.exports}u.n=c=>{var d=c&&c.__esModule?()=>c.default:()=>c;return u.d(d,{a:d}),d},u.d=(c,d)=>{for(var p in d)u.o(d,p)&&!u.o(c,p)&&Object.defineProperty(c,p,{enumerable:!0,get:d[p]})},u.o=(c,d)=>Object.prototype.hasOwnProperty.call(c,d);var w={};return(()=>{"use strict";u.d(w,{default:()=>o});var c=u(626),d=u.n(c);class p extends Error{constructor(e,t){super(`Expected ${t}, got ${e}`),this.gotMessage=e,this.expectedMessage=t,this.name=this.constructor.name}}class f{static getType(e){return Array.isArray(e)?"Array":Number.isNaN(e)?"NaN":e===null?"null":typeof e}static checkType(e,t){const s=this.#e(e,t);if(s)throw new p(s,f.buildDescriptorTypeMessage(t))}static#e(e,t){let s;for(const i of t){const r=i.type;if(r==="boolean"&&typeof e=="boolean"||r==="true"&&e===!0||r==="false"&&e===!1||r==="array"&&Array.isArray(e)||r==="object"&&Object.prototype.toString.call(e)==="[object Object]"||r==="number"&&typeof e=="number"&&!Number.isNaN(e)||r==="function"&&typeof e=="function"||r==="string"&&typeof e=="string"){if("descriptor"in i&&(r==="array"||r==="object")){let n=r==="array"?e:Object.values(e);for(const a of n)if(s=f.#e(a,i.descriptor))break}if(s)return f.toTitleCase(r)+"<"+s+">";if(s=f.buildConditionTypeMessage(i.conditions,e))break;return!1}}return s||f.getType(e)}static buildConditionTypeMessage(e,t){if(e){if(e.nonnegative&&t<0)return"a negative number";if(e.positive&&t<=0)return"a negative number or 0";if(e.integer&&t%1!==0)return"a floating point number";if(e.filled&&t.trim()==="")return"an empty string";if(e.keywords&&e.keywords.indexOf(t)===-1)return"a different string";if(e.wordChar&&!Number.isNaN(Number(t)))return"a number string";if(e.length&&t.length!==e.length)return"an array of length "+t.length;if(e.nonempty&&t.length===0)return"an empty array"}}static buildDescriptorTypeMessage(e){let t="";for(const s of e){const i=s.type;if(t&&(t+=" OR "),i==="number"){const r=s.conditions?.nonnegative,n=s.conditions?.positive,a=s.conditions?.integer;r?t+="non-negative ":n&&(t+="positive "),t+=a?"integer":"number"}else if(i==="array"){if(s.conditions?.nonempty&&(t+="non-empty "),s.descriptor){const r=f.buildDescriptorTypeMessage(s.descriptor);t+="Array<"+r+">"}else t+="array";s.conditions?.length&&(t+=" of length "+s.conditions.length)}else if(i==="object")if(s.descriptor){const r=f.buildDescriptorTypeMessage(s.descriptor);t+="Object<"+s.keyName+", "+r+">"}else t+="object";else i==="string"?s.conditions?.keywords?(s.conditions.keywords.length>1?t+="one of the keywords":t+="the keyword",s.conditions.keywords.forEach(function(r,n,a){n!==0&&n===a.length-1?t+=" or":n!==0&&(t+=","),t+=' "'+r+'"'})):(s.conditions?.filled&&(t+="non-empty "),s.conditions?.wordChar&&(t+="non-number "),t+="string"):t+=i;s.shape&&(t+=" ("+s.shape+")")}return t}static toTitleCase(e){return e.slice(0,1).toUpperCase()+e.slice(1)}}class v{static{this.COUNTS=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth"]}static{this.Error=class extends Error{constructor(e,t,s=!1){t&&(e="@ "+t+": "+e),e[e.length-1]!==`
`&&e[e.length-1]!=="."&&(e+="."),s&&(e+=`
Aborting the slider construction.`),super(e),this.name="Slider89"+this.constructor.name}}}static{this.InitializationError=class extends v.Error{constructor(e){super(e,"constructor",!0)}}}static{this.PropertyError=class extends v.Error{constructor(e,t,s){let i=e[t];i!==void 0&&(Array.isArray(i)&&(i="["+i.join(", ")+"]"),s+=`.
Continuing with the previous value (`+i+")."),super(s,t,i===void 0)}}}static{this.PropertyTypeError=class extends v.PropertyError{constructor(e,t,s){super(e,t,"Type mismatch. "+s)}}}static{this.MethodArgTypeError=class extends v.Error{constructor(e,t,s){const i=o.getMethodArgInfo(e,t),r=`Type mismatch on the ${v.getMethodArgMessage(i,t)}. ${s}`;super(r,e)}}}static{this.MethodArgOmitError=class extends v.Error{constructor(e,t){const s=o.getMethodArgInfo(e,t),i="The "+v.getMethodArgMessage(s,t)+" has been omitted but it is required (It must be of type "+f.buildDescriptorTypeMessage(s.descriptor)+").";super(i,e)}}}static{this.StructureError=class extends v.Error{constructor(e){super(e,"structure",!0)}}}static{this.StructureParseError=class extends v.StructureError{constructor(e,t){const s="Something has been declared wrongly and couldn't be parsed. Point of failure (before "+e+`):

`+t+`
`;super(s)}}}static getMethodArgMessage(e,t){let s="";return e.optional&&(s+="optional "),s+=o.COUNTS[t]+" argument ("+e.name+")",s}static getMethodArgInfo(e,t){return o.methodData[e].args[t]}static arrayToListString(e){return`
 - "`+e.join(`"
 - "`)+`"
`}}var k;k||(k={});class T extends v{constructor(){super(),this.vals={},this.initial=!1,Object.defineProperties(this.vals,{$:{value:{}},$intermediateThis:{value:{}},$intermediateVals:{value:{}}})}static{this.methodData={addEvent:{args:[{name:"event type",descriptor:[{type:"string"}]},{name:"event function",descriptor:[{type:"function"}]},{name:"event namespace",optional:!0,descriptor:[{type:"string",conditions:{filled:!0,wordChar:!0}}]}]},removeEvent:{args:[{name:"event identifier/namespace",descriptor:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"string",conditions:{filled:!0,wordChar:!0}}]}]}}}static{this.propertyData={range:{isDeepDefinedArray:!0,descriptor:[{type:"array",shape:"[startValue, endValue]",conditions:{length:2},descriptor:[{type:"number"}]},{type:"boolean"}]},values:{isDeepDefinedArray:!0,descriptor:[{type:"array",descriptor:[{type:"number"}]}]},value:{descriptor:[{type:"number"}]},precision:{descriptor:[{type:"number",conditions:{nonnegative:!0,integer:!0}},{type:"false"}]},step:{descriptor:[{type:"number",conditions:{positive:!0}},{type:"array",conditions:{nonempty:!0},descriptor:[{type:"number"}]},{type:"false"}]},structure:{constructorOnly:!0,descriptor:[{type:"string"},{type:"false"}]},node:{readOnly:!0},nodes:{readOnly:!0},orientation:{descriptor:[{type:"string",conditions:{keywords:["horizontal","vertical"]}}]},classList:{constructorOnly:!0,descriptor:[{type:"object",shape:"{nodeName: [...classes]}",keyName:"nodeName",descriptor:[{type:"array",descriptor:[{type:"string"}]}]},{type:"false"}]},events:{constructorOnly:!0,descriptor:[{type:"object",shape:"{eventName: [...functions]}",keyName:"eventName",descriptor:[{type:"array",descriptor:[{type:"function"}]}]},{type:"false"}]},plugins:{constructorOnly:!0,descriptor:[{type:"array",descriptor:[{type:"function"}]},{type:"false"}]},extend:{constructorOnly:!0,descriptor:[{type:"array",descriptor:[{type:"object"}]},{type:"false"}]},data:{constructorOnly:!0,descriptor:[{type:"object"},{type:"false"}]}}}static selfCheckMethod(e,t){const s=this.methodData[e],i=Array.prototype.slice.call(t,0,s.args.length);if(i.forEach((r,n)=>{const a=s.args[n].descriptor;try{f.checkType(r,a)}catch(l){throw l instanceof p?new this.MethodArgTypeError(e,n,l.message):l}}),s.args[i.length]&&!("optional"in s.args[i.length]))throw new this.MethodArgOmitError(e,i.length)}}class m extends T{static{this.eventTypes=["update","start","move","end"]}static{this.eventTypesSpecial={"change:$property":{prefix:"change:",fn:(e,t,s)=>{if(!Object.prototype.hasOwnProperty.call(e.vals,t)){const i="‘"+s+"’ refers to ‘"+t+"’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized";throw new o.Error(i,"addEvent")}}}}}static{this.availableEventTypes=this.eventTypes.concat(Object.keys(this.eventTypesSpecial))}#e={};#t=0;addEvent(e,t,s){if(T.selfCheckMethod("addEvent",arguments),!this.checkEventType(e)){const n="The specified event type ‘"+e+"’ is not valid. Available types are:"+o.arrayToListString(m.availableEventTypes);throw new o.Error(n,"addEvent")}Array.isArray(this.vals.events[e])||(this.vals.events[e]=[]),this.vals.events[e].push(t);const i=s||this.#t,r={type:e,fn:t};return s?(Array.isArray(this.#e[i])||(this.#e[i]=[]),this.#e[i].push(r)):this.#e[i]=r,s||this.#t++}removeEvent(e){if(T.selfCheckMethod("removeEvent",arguments),!(e in this.#e))return!1;const t=this.#e[e];return delete this.#e[e],Array.isArray(t)?t.reduce(this.#s.bind(this),[]):this.#s([],t)}#s(e,t){const s=t.type,i=this.vals.events[s],r=i.splice(i.indexOf(t.fn),1)[0];return i.length===0&&delete this.vals.events[s],e.push(r),e}invokeEvent(e,...t){if(t.unshift(this),this.vals.events!==!1&&e in this.vals.events)for(const s of this.vals.events[e])s(...t)}checkEventType(e){for(const t of Object.values(m.eventTypesSpecial))if(e.startsWith(t.prefix)){const s=e.slice(t.prefix.length);return t.fn(this,s,e),!0}return m.eventTypes.includes(e)}}class C extends m{defineDeepProperty(e,t,s,i,r){Object.defineProperty(e,t,{set:n=>{if(!this.initial)var a=r?Array.from(this[t]):this[t];if(s[t]=n,r){const l=this.properties[t];this.#t(t,n),this.#e(t,n,l.keySetter,l.keyGetter),this.handleInternalDeepArrayChange(t,a,n)}else this.handleInternalPropertyChange(t,a);i&&i(n,a)},get:()=>(r?this.vals.$intermediateVals:s)[t],enumerable:!0})}#e(e,t,s,i){const r=this.vals;this.vals.$intermediateThis[e]=[];for(let n=0;n<t.length;n++){const a=t[n];Object.defineProperty(this.vals.$intermediateThis[e],n,{set:l=>{(!s||!s(l,n))&&(r[e][n]=l)},get:()=>i?i(r[e][n],n):r[e][n],enumerable:!0}),this.vals.$intermediateThis[e][n]=t[n]}}#t(e,t){const s=this.vals.$;this.vals.$intermediateVals[e]=[];for(let i=0;i<t.length;i++){const r=t[i];Object.defineProperty(this.vals.$intermediateVals[e],i,{set:n=>{if(!this.initial)var a=Array.from(this[e]);s[e][i]=n,this.handleInternalDeepArrayChange(e,a,null,i)},get:()=>s[e][i],enumerable:!0})}}handleInternalPropertyChange(e,t,s=!1){!this.initial&&(typeof this[e]=="object"||t!==this[e])&&(this.domHandler.updatePotentialVariable(e),s||(t??=this[e],this.invokeEvent("change:"+e,this[e],t)))}handleInternalDeepArrayChange(e,t,s,i){if(!this.initial)if(this.domHandler.updatePotentialVariable(e),i!=null)this.invokeDeepArrayChangeEvent(e,t,i);else for(let r=0;r<s.length;r++)this.invokeDeepArrayChangeEvent(e,t,r)}invokeDeepArrayChangeEvent(e,t,s){t[s]!==this[e][s]&&this.invokeEvent("change:"+e,this[e],t,s)}}class h{constructor(e){this.structureVars={},this.thumbChildren=[],this.vals=e}static{this.specialVariables={tag_node:{getter:e=>e},thumb_index:{thumbOnly:!0,getter:(e,t,s)=>t.nodes[s].indexOf(e)},thumb_value:{thumbOnly:!0,getter:(e,t,s)=>t.values[t.nodes[s].indexOf(e)]}}}static{this.specialVariableProxy={values:["thumb_index","thumb_value"]}}static{this.regex=function(){const e={attr:{name:"[\\w-]+"},all:"[\\d\\D]",capName:"([\\w-]+)"};e.attr.value="(?:(?!<)"+e.all+")*?",e.tagType="(?:\\s+"+e.capName+")?",e.content='(?:\\s+"('+e.all+'+?)")?',e.attribs="(?:\\s+"+e.attr.name+"=\\["+e.attr.value+"\\])*",e.varContent="\\$((?:\\w+(?:\\.(?=\\w))?)+)";const t={variable:"\\{"+e.varContent+"\\}|"+e.varContent,attributes:"("+e.attr.name+")=\\[("+e.attr.value+")\\](?:\\s+|$)",tag:"<([/:])?"+e.capName+e.tagType+e.content+"("+e.attribs+")\\s*?>\\s*"},s={};for(let i in t)s[i]=new RegExp(t[i],"g");return s.variableNoFlag=new RegExp(t.variable),s}()}parseStructure(e,t){const s={slider:t};e=e.trim();for(const a in h.regex)h.regex[a].global&&(h.regex[a].lastIndex=0);const i=[];let r=0,n;for(;n=h.regex.tag.exec(e);){if(n.index!==r){const a="tag ‘<"+(n[1]||"")+n[2]+">’",l=e.slice(r,n.index).trim();throw new o.StructureParseError(a,l)}if(r=h.regex.tag.lastIndex,n[1]!=="/"){const a=i[i.length-1]||"slider",l=this.assembleElement(s,n[2],i,n[3],n[4],n[5]);s[n[2]]=l,s[a].appendChild(l),i.includes("thumb")&&this.thumbChildren.push(n[2]),n[1]==null&&i.push(n[2])}else{const a=i.pop();if(a!==n[2])if(i.indexOf(n[2])!==-1)this.#s(a);else throw new o.StructureError("The closing tag ‘</"+n[2]+">’ couldn't find a matching opening tag")}}if(r!==e.length)throw new o.StructureParseError("end of string",e.slice(r));if(i.length>1)throw new o.StructureError("Couldn't find a matching closing tag for following elements:"+o.arrayToListString(i));return i.length===1&&this.#s(i[0]),s}assembleElement(e,t,s,i,r,n){if(Object.prototype.hasOwnProperty.call(e,t))throw new o.StructureError("Every element must have a unique name but there are mutiple elements called ‘"+t+"’");const a=document.createElement(i||"div");if(r!=null){const l=document.createTextNode(r);l.textContent=r,a.appendChild(l),h.stringHasVariable(r)&&this.#e(r,l,t,s)}if(n){let l;for(;l=h.regex.attributes.exec(n);){const N=l[1],E=l[2],x=document.createAttribute(N);x.textContent=E,a.setAttributeNode(x),h.stringHasVariable(E)&&this.#e(E,x,t,s)}}return a}#e(e,t,s,i){const r=[];let n;for(;n=h.regex.variable.exec(e);){const a=n[1]||n[2],l=a.indexOf(".")!==-1?a.slice(0,a.indexOf(".")):a;if(!r.hasOwnProperty(l)){if(!Object.prototype.hasOwnProperty.call(this.vals,l)&&!h.checkForSpecialVariables(l,s,i))throw new o.StructureError("‘"+l+"’ is not a recognized property and cannot be used as variable.Please check its spelling or initialize it in the constructor");this.#t(l,e,t),r.push(l)}}}#t(e,t,s){this.structureVars[e]==null&&(this.structureVars[e]={}),this.structureVars[e][t]==null&&(this.structureVars[e][t]=new Array),this.structureVars[e][t].push(s)}#s(e){throw new o.StructureError("Couldn't find a closing tag for the element ‘<"+e+">’ (Should it be a self-closing tag marked with ‘:’?)")}static stringHasVariable(e){return h.regex.variableNoFlag.test(e)}static checkForSpecialVariables(e,t,s){if(Object.prototype.hasOwnProperty.call(h.specialVariables,e)){if(h.specialVariables[e].thumbOnly&&t!=="thumb"&&!s.includes("thumb"))throw new o.StructureError("The variable ‘$"+e+"’ may only be used inside the ‘<thumb>’ tag and its children (It was found in ‘<"+s[s.length-1]+">’)");return!0}return!1}}class g extends h{constructor(e,t){super(e),this.baseElements={},this.structureVarThumbStrings={},this.thumbEvents={},this.thumbEvents=t}createSliderNode(e,t,s){return t?this.createSliderFromStructure(e,t,s):this.createSliderManually(e,s)}createSliderManually(e,t){const s=document.createElement("div"),i={slider:[t],track:[s],thumb:new Array(e)};this.thumbBase=document.createElement("div"),this.thumbParent=s;for(let r=0;r<e;r++)i.thumb[r]=this.createNewThumb();return s.classList.add("sl89-track"),t.appendChild(s),i}createSliderFromStructure(e,t,s){const i=this.parseStructure(t,s);return this.#t(i),this.#e(i,e)}#e(e,t){const s={thumb:[]};for(const[i,r]of Object.entries(e))this.thumbChildren.includes(i)?(this.baseElements[i]=e[i],s[i]=[]):i!=="thumb"&&(s[i]=[r]);this.#s(this.thumbBase);for(let i=0;i<t;i++)this.addThumbToNode(s);return s}#t(e){e.thumb?(this.thumbBase=e.thumb,e.track&&(this.thumbParent=e.thumb.parentElement),this.baseElements.thumb=this.thumbBase):this.thumbBase=this.assembleElement(e,"thumb",[],"div"),e.track||(e.track=this.assembleElement(e,"track",[],"div"),e.thumb?e.thumb.parentNode.appendChild(e.track):e.slider.appendChild(e.track)),e.thumb&&e.thumb.parentNode.removeChild(e.thumb),this.thumbParent||(this.thumbParent=e.track),e.track.classList.add("sl89-track")}#s(e){for(const[t,s]of Object.entries(this.structureVars)){let i=[];for(const[r,n]of Object.entries(s))for(const a of n)if(this.nodeHasBaseElementOwner(a)){i.push(r);break}i.length>0&&(this.structureVarThumbStrings[t]=i)}}addThumbToNode(e){const t=this.createNewThumb();e.thumb.push(t),g.findNodeChildren(t).forEach((s,i)=>{const r=this.thumbChildren[i];e[r].push(s)})}removeThumbFromNode(e){for(const t of this.thumbChildren)e[t].pop();return e.thumb.pop()}addClasses(e,t,s,i){e.classList.add("slider89"),i&&e.classList.add("vertical"),s&&this.addClassesFromClassList(t,s)}addClassesFromClassList(e,t){const s=[];for(const[i,r]of Object.entries(t))if(!Object.prototype.hasOwnProperty.call(e,i))s.push(i);else if(s.length===0){const n=e[i];for(const a of r)for(const l of Object.values(n))l.classList.add(a)}if(s.length>0){const i="The given object contains items which aren't nodes of this slider:"+o.arrayToListString(s)+"Following nodes are part of this slider's node pool:"+o.arrayToListString(Object.keys(e));throw new o.Error(i,"classList",!0)}}createNewThumb(){const e=this.thumbBase.cloneNode(!0);e.classList.add("sl89-thumb"),e.tabIndex===-1&&(e.tabIndex=0);for(const[t,s]of Object.entries(this.thumbEvents))e.addEventListener(t,s,{passive:!(t.startsWith("touch")||t.startsWith("key"))});return this.thumbParent.appendChild(e),e}nodeHasBaseElementOwner(e){for(const[t,s]of Object.entries(this.baseElements))if(g.getNodeOwner(e)===s)return t;return!1}static getNodeOwner(e){return e.ownerElement||e.parentElement}static findNodeChildren(e,t=[]){if(e.childElementCount===0)return t;for(const s of e.children)t.push(s),g.findNodeChildren(s,t);return t}}class A extends g{constructor(e,t,s){super(t,s),this.slider=e}updatePotentialVariable(e){if(Object.prototype.hasOwnProperty.call(this.structureVars,e)){for(const[t,s]of Object.entries(this.structureVars[e]))this.#e(t,s);if(Object.prototype.hasOwnProperty.call(h.specialVariableProxy,e))for(const t of h.specialVariableProxy[e])this.updatePotentialVariable(t)}}updateAllVariables(){if(this.vals.structure!==!1)for(const e in this.structureVars)this.updatePotentialVariable(e)}expandAllBaseElementVariables(){for(const[e,t]of Object.entries(this.structureVarThumbStrings))for(const s of t){const i=this.structureVars[e][s];this.#e(s,i)}}#e(e,t){for(const[s,i,r]of this.#s(t))i.textContent=e.replace(h.regex.variable,(n,a,l)=>this.#t(a||l,s,r))}#t(e,t,s){const i=e.split(".").values(),r=i.next().value;let n;r in h.specialVariables?n=h.specialVariables[r].getter(t,this.slider,s):n=this.slider[r];for(const a of i)try{n=n[a]}catch{throw new o.StructureError("Variable ‘"+e+"’ cannot access property ‘"+a+"’ on "+n)}return n}*#s(e){for(const t of e){const s=this.nodeHasBaseElementOwner(t);if(s){const i=this.vals.nodes[s];if(t.nodeType===Node.ATTRIBUTE_NODE)for(const r of i)yield[r,r.getAttributeNode(t.name),s];else for(const r of i)yield[r,r.childNodes[0],s]}else yield[g.getNodeOwner(t),t,s]}}}class D extends C{constructor(){super(),this.activeTouchIDs=new Map,this.mouseStart=this.mouseStart.bind(this),this.mouseMove=this.mouseMove.bind(this),this.mouseEnd=this.mouseEnd.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchEnd=this.touchEnd.bind(this),this.keyDown=this.keyDown.bind(this),this.domHandler=new A(this,this.vals,{touchstart:this.touchStart,mousedown:this.mouseStart,keydown:this.keyDown})}getTrackPadding(e){return parseFloat(this.trackStyle.getPropertyValue("padding-"+e))}getTrackOffset(e){return parseFloat(this.trackStyle.getPropertyValue("border-"+e+"-width"))+this.getTrackPadding(e)}getDistance(e){return this.vals.orientation==="vertical"?e.getBoundingClientRect().top-this.vals.node.track.getBoundingClientRect().top-this.getTrackOffset("top"):e.getBoundingClientRect().left-this.vals.node.track.getBoundingClientRect().left-this.getTrackOffset("left")}getAbsoluteTrackSize(e){return this.vals.orientation==="vertical"?this.vals.node.track.getBoundingClientRect().height-this.getTrackOffset("top")-this.getTrackOffset("bottom")-e.getBoundingClientRect().height:this.vals.node.track.getBoundingClientRect().width-this.getTrackOffset("left")-this.getTrackOffset("right")-e.getBoundingClientRect().width}moveElementTranslate(e,t){const s=this.vals.orientation==="vertical"?"Y":"X";e.style.transform="translate"+s+"("+t+"px)"}moveElementRelative(e,t,s=e){if(this.vals.orientation==="vertical")var i="top",r=this.getTrackPadding("top"),n=this.getTrackPadding("bottom"),a=s.clientHeight;else var i="left",r=this.getTrackPadding("left"),n=this.getTrackPadding("right"),a=s.clientWidth;let l=a*t+"px";n&&(l+=" - "+n*t+"px"),r&&(l+=" + "+r*(1-t)+"px"),e.style[i]="calc("+t*100+"% - "+l+")"}applyAllRatioDistances(e){for(let t=0;t<this.vals.values.length;t++)this.applyOneRatioDistance(t,e)}applyOneRatioDistance(e,t){const{value:s,prevRatio:i,ratio:r}=this.computeRatioDistance(e,t);this.setValuesWithValueChange(e,s),o.floatIsEqual(r,i)||this.moveElementRelative(this.vals.nodes.thumb[e],r)}computeDistanceValue(e,t,s){return s==null&&(s=this.getAbsoluteTrackSize(e)),t/s*(this.vals.range[1]-this.vals.range[0])+this.vals.range[0]}computeRatioDistance(e,t){let s,i;if(!t)t=this.vals,s=this.vals.values[e];else{for(let n of["range","step"])t[n]==null&&(t[n]=this.vals[n]);t.value!=null?s=t.value:(i=(this.vals.values[e]-this.vals.range[0])/(this.vals.range[1]-this.vals.range[0]),s=(t.range[1]-t.range[0])*i+t.range[0])}t.step!==!1&&(typeof t.step=="number"?Math.abs(t.range[1]-t.range[0])<t.step?s=t.range[0]:s=t.range[0]+Math.round((s-t.range[0])/t.step)*t.step:s=o.getClosestNumber(s,t.step));const r=this.getValueRatio(s,t.range);return{value:s,prevRatio:i,ratio:r}}getValueRatio(e=this.vals.value,t=this.vals.range){return(e-t[0])/(t[1]-t[0])}removeLastThumbNode(){const e=this.domHandler.removeThumbFromNode(this.vals.nodes);this.domHandler.thumbParent.removeChild(e)}appendNewThumbNode(){this.domHandler.addThumbToNode(this.vals.nodes),this.applyOneRatioDistance(this.vals.nodes.thumb.length-1)}changeOrientationDOM(e){e==="vertical"?(this.#e("left"),this.vals.node.slider.classList.add("vertical")):(this.#e("top"),this.vals.node.slider.classList.remove("vertical"))}#e(e){for(const t of this.vals.nodes.thumb)t.style.removeProperty(e)}setValuesWithValueChange(e,t,...s){const i=this.vals.values[e],r=this.values[e];if(!o.floatIsEqual(t,i)){this.vals.values[e]=t,e===0&&this.handleInternalPropertyChange("value",i);const n=this.values[e];return o.floatIsEqual(n,r)||this.invokeEvent("update",n,r,e,...s),!0}return!1}touchStart(e){e.preventDefault();const t=e.changedTouches[0];if(!this.activeTouchIDs.has(t.identifier)){const s=e.currentTarget;this.activeTouchIDs.set(t.identifier,s),this.slideStart(s,t,e),s.addEventListener("touchmove",this.touchMove,{passive:!1}),s.addEventListener("touchend",this.touchEnd),s.addEventListener("touchcancel",this.touchEnd)}}touchMove(e){e.preventDefault();for(const t of e.changedTouches)if(this.activeTouchIDs.has(t.identifier)){const s=this.activeTouchIDs.get(t.identifier);this.slideMove(s,t,e)}}touchEnd(e){e.preventDefault();for(const t of e.changedTouches)if(this.activeTouchIDs.has(t.identifier)){const s=this.activeTouchIDs.get(t.identifier);this.activeTouchIDs.delete(t.identifier),this.slideEnd(s,t,e),s.removeEventListener("touchmove",this.touchMove,{passive:!1}),s.removeEventListener("touchend",this.touchEnd),s.removeEventListener("touchcancel",this.touchEnd)}}mouseStart(e){const t=e.currentTarget;document.body.classList.add("sl89-noselect"),this.slideStart(t,e,e),this.activeThumb||(this.activeThumb=t,window.addEventListener("mousemove",this.mouseMove),window.addEventListener("mouseup",this.mouseEnd))}mouseMove(e){this.slideMove(this.activeThumb,e,e)}mouseEnd(e){this.slideEnd(this.activeThumb,e,e),window.removeEventListener("mousemove",this.mouseMove),window.removeEventListener("mouseup",this.mouseEnd),this.activeThumb=null}slideStart(e,t,s){const i=this.vals.nodes.thumb.indexOf(e),r=this.getDistance(e);if(e.classList.add("active"),this.vals.orientation==="vertical")var n="top",a=t.clientY;else var n="left",a=t.clientX;this.mouseDownPos=a-r,this.moveElementTranslate(e,r),this.invokeEvent("start",i,s),e.style.removeProperty(n)}slideMove(e,t,s){const i=this.vals.nodes.thumb.indexOf(e),r=this.getAbsoluteTrackSize(e);let n=(this.vals.orientation==="vertical"?t.clientY:t.clientX)-this.mouseDownPos;n>r?n=r:n<0&&(n=0);let a=this.computeDistanceValue(e,n,r);if(this.vals.step!==!1){const l=this.computeRatioDistance(i,{value:a});a=l.value,n=l.ratio*r}this.setValuesWithValueChange(i,a,s)&&(this.moveElementTranslate(e,n),this.invokeEvent("move",i,s))}slideEnd(e,t,s){const i=this.vals.nodes.thumb.indexOf(e);this.applyOneRatioDistance(i),e.style.removeProperty("transform"),this.invokeEvent("end",i,s),e.classList.remove("active"),document.body.classList.remove("sl89-noselect"),this.mouseDownPos=null}keyDown(e){if(!e.key.startsWith("Arrow"))return;const t=this.vals.nodes.thumb.indexOf(e.currentTarget);let s=Math.round((this.vals.range[1]-this.vals.range[0])/100);e.shiftKey&&e.ctrlKey?s*=.1:e.shiftKey&&(s*=10),e.key==="ArrowLeft"||e.key==="ArrowUp"?(e.preventDefault(),this.values[t]-=s):(e.key==="ArrowRight"||e.key==="ArrowDown")&&(e.preventDefault(),this.values[t]+=s)}}class o extends D{constructor(e,t,s=!1){super(),this.properties={range:{default:[0,100],setter:i=>{if(i[0]===i[1])throw new o.PropertyError(this,"range","The given range of ["+i.join(", ")+"] defines the same value for both range start and end");this.initial||this.applyAllRatioDistances({range:i})},keySetter:(i,r)=>{if(i===this.vals.range[Math.abs(r-1)])throw new o.PropertyError(this,"range","The new range of ["+i+", "+i+"] defines the same value for both range start and end");if(!this.initial){const n=Array.from(this.vals.range);n[r]=i,this.applyAllRatioDistances({range:n})}}},values:{default:()=>[this.vals.range[0]],setter:i=>{if(!this.initial){if(i.length>this.vals.values.length)for(let r=this.vals.values.length;r<i.length;r++)this.appendNewThumbNode();else if(i.length<this.vals.values.length)for(let r=i.length;r<this.vals.values.length;r++)this.removeLastThumbNode()}},postSetter:(i,r)=>{if(!this.initial){const n=r.length!==i.length;this.handleInternalPropertyChange("value",r[0]),this.handleInternalPropertyChange("node",null,!n),this.handleInternalPropertyChange("nodes",null,!n),this.domHandler.expandAllBaseElementVariables()}},keySetter:(i,r)=>(i=this.adaptValueToRange(i),this.initial?this.vals.values[r]=i:this.applyOneRatioDistance(r,{value:i}),!0),keyGetter:(i,r)=>this.vals.precision!==!1?Number(i.toFixed(this.vals.precision)):i},value:{setter:i=>(this.values[0]=i,!0),getter:i=>this.values[0]},precision:{default:!1,setter:i=>{this.initial||this.applyAllRatioDistances()}},step:{default:!1,setter:i=>{if(this.vals.precision!==!1&&typeof i=="number"&&Number(i.toFixed(this.vals.precision))!==i)throw new o.PropertyError(this,"step","The given value of "+i+" exceeds the currently set precision of "+this.vals.precision);this.initial||this.applyAllRatioDistances({step:i})}},structure:{default:!1},node:{default:{}},nodes:{default:{}},orientation:{default:"horizontal",setter:i=>{if(!this.initial)return this.changeOrientationDOM(i),this.vals.orientation=i,this.applyAllRatioDistances(),!0}},classList:{default:!1,extendAssigner:o.#e.bind(o,"classList")},events:{default:{},setter:i=>{if(i===!1)return this.vals.events={},!0;{const r=[];for(let n in i)this.checkEventType(n)||r.push(n);if(r.length>0)throw new o.PropertyError(this,"events","The given object contains items which are no valid event types:"+o.arrayToListString(r)+"Available event types are:"+o.arrayToListString(o.availableEventTypes))}},extendAssigner:o.#e.bind(o,"events")},plugins:{default:!1,extendAssigner:(i,r)=>{i.plugins||=[],i.plugins.unshift(...r.filter(n=>!i.plugins.includes(n)))}},extend:{default:!1,extendAssigner:(i,r,n)=>{i.extend.splice(n,0,...r)}},data:{default:!1,extendAssigner:(i,r)=>{i.data=Object.assign(r,i.data||{})}}},this.initial=!0,(t==null||t===!1)&&(t={}),this.testInitialTarget(e),this.testInitialConfig(t),this.testAndExtendConfig(t),this.initializeProperties(t),this.buildSlider(e,s),this.applyAllRatioDistances(),this.domHandler.updateAllVariables(),this.initial=!1,this.callPlugins(this.vals.plugins)}static{this.injectCSS=!0}testInitialTarget(e){if(e){if(!e.nodeType||e.nodeType!==1)throw new o.InitializationError("The first argument must be a valid DOM node (got "+f.getType(e)+")")}else throw new o.InitializationError("No first argument has been supplied. It needs to be the DOM target node for the slider")}testInitialConfig(e){if(typeof e!="object"||Array.isArray(e))throw new o.InitializationError("The optional second argument needs to be a configuration object (got "+f.getType(e)+")");if("value"in e&&"values"in e)throw new o.InitializationError("Only one of ‘value’ and ‘values’ may be defined at once")}testConfig(e){for(const[t,s]of Object.entries(e))if(t in this.properties)this.checkProp(t,s);else if(t[0]!=="_")throw new o.InitializationError("‘"+t+"’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_"+t+"’)")}testAndExtendConfig(e,t=e){if(this.testConfig(e),e.extend)for(let s=e.extend.length-1;s>=0;s--){const i=e.extend[s];for(const[r,n]of Object.entries(i))this.properties[r]?.extendAssigner?n!==!1&&e[r]!==!1&&this.properties[r].extendAssigner(t,n,s):r in t||(t[r]=n);this.testAndExtendConfig(i,t)}}initializeProperties(e){for(const[t,s]of Object.entries(this.properties))if(this.initializeProperty(t,s),t in e)this[t]=e[t],delete e[t];else if("default"in s){const i=s.default;(s.getter||s.keyGetter?this:this.vals)[t]=typeof i=="function"?i():i}for(const t in e)this.defineDeepProperty(this,t,this.vals),this.vals[t]=e[t]}buildSlider(e,t){const s=t?e:document.createElement("div");this.vals.nodes=this.domHandler.createSliderNode(this.vals.values.length,this.vals.structure,s),this.defineNodeGetters(this.vals.nodes),t||e.appendChild(this.vals.node.slider),this.domHandler.addClasses(this.vals.node.slider,this.vals.nodes,this.vals.classList,this.vals.orientation==="vertical"),o.injectStyleSheetIfNeeded(),this.trackStyle=getComputedStyle(this.vals.node.track)}callPlugins(e){if(e!==!1)for(const t of e)t(this)}initializeProperty(e,t){const s=o.propertyData[e],i="isDeepDefinedArray"in s;Object.defineProperty(this,e,{set:r=>{if("constructorOnly"in s&&!this.initial)throw new o.Error("Property ‘"+e+"’ may only be defined in the constructor (It was just set with the value ‘"+r+"’)");this.checkProp(e,r),(!t.setter||!t.setter(r))&&(this.vals[e]=r)},get:()=>{const r=i?this.vals.$intermediateThis:this.vals;return t.getter?t.getter(r[e]):r[e]},enumerable:!0}),this.defineDeepProperty(this.vals,e,this.vals.$,t.postSetter,i)}defineNodeGetters(e){for(const t in e)Object.defineProperty(this.vals.node,t,{get:()=>e[t][0],enumerable:!0})}checkProp(e,t){const s=o.propertyData[e];if("readOnly"in s)throw new o.Error("Property ‘"+e+"’ is read-only (It was just set with the value ‘"+t+"’)");try{f.checkType(t,s.descriptor)}catch(i){throw i instanceof p?new o.PropertyTypeError(this,e,i.message):i}}adaptValueToRange(e){if(this.vals.range[0]<this.vals.range[1]){if(e<this.vals.range[0])return this.vals.range[0];if(e>this.vals.range[1])return this.vals.range[1]}else{if(e>this.vals.range[0])return this.vals.range[0];if(e<this.vals.range[1])return this.vals.range[1]}return e}static floatIsEqual(e,t){return Math.abs(e-t)<1e-11}static getClosestNumber(e,t){return t.reduce((s,i)=>Math.abs(s-e)<Math.abs(i-e)?s:i)}static injectStyleSheetIfNeeded(){if(this.injectCSS&&this.injectedStyleSheet==null){const e=document.createElement("style"),t=document.head.firstElementChild;e.textContent=d(),t?document.head.insertBefore(e,t):document.head.appendChild(e),this.injectedStyleSheet=e}}static removeInjectedStyleSheet(){this.injectedStyleSheet!=null&&(document.head.removeChild(this.injectedStyleSheet),this.injectedStyleSheet=null)}static#e(e,t,s){t[e]||={},this.#t(t[e],s)}static#t(e,t){for(const[s,i]of Object.entries(t))e[s]||=[],e[s].push(...i.filter(r=>!e[s].includes(r)))}}})(),w=w.default,w})());
