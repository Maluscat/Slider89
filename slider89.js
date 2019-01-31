function Slider89(target, values = {}) {
  //Define the attributes of the object instance
  this.absWidth = values.absWidth != null ? values.absWidth : slider89.absWidth;
  this.min = values.min != null ? values.min : slider89.min;
  this.max = values.max != null ? values.max : slider89.max;
  this.comma = values.comma != null && values.comma >= 0 ? values.comma : slider89.comma;
  this.value = values.value != null ? Number(values.value.toFixed(this.comma)) : Number(slider89.value.toFixed(this.comma));
  this.width = values.width != null ? this.computeWidth(values.width) : this.computeWidth(slider89.width);
  this.caption = values.caption || slider89.caption;
  this.trimComma = values.trimComma != null ? values.trimComma : slider89.trimComma;
  this.tipDuration = values.tipDuration != null && (values.tipDuration > 0 || values.tipDuration == false) ? values.tipDuration : slider89.tipDuration;
  this.classList = values.classList || slider89.classList;
  this.structure = values.structure || slider89.structure;
  if (values.task && this.checkTask(values.task)) {
    this.task = values.task;
  } else if (slider89.task) {
    this.task = slider89.task;
  }
  if (values.taskMouseUp && this.checkTask(values.taskMouseUp)) {
    this.taskMouseUp = values.taskMouseUp;
  } else if (slider89.taskMouseUp) {
    this.taskMouseUp = slider89.taskMouseUp;
  }

  this.taskLock = false;
  this.tipTimer;

  //Call buildElement parsing the target (element for the slider to be created in / to be replaced with) to build the slider
  this.element = this.buildElement(target, values.replaceNode != null ? values.replaceNode : slider89.replaceNode);
  if (this.tipDuration == false) this.element.wrapper.children[1].classList.remove('hidden');

  //Write 'this' into a carrier-variable and attach the needed event listeners
  const obj = this;
  this.element.wrapper.addEventListener('mousedown', function(e) {
    document.body.classList.add('noselect');
    obj.executeSlider(e.x);
    window.addEventListener('mousemove', obj.mouseMove);
    window.addEventListener('mouseup', obj.mouseUp);
  });
  //The function executed by the mousemove listener. Needs to be here in order to reach 'obj'
  this.mouseMove = function(e) {
    obj.executeSlider(e.x);
  }
  //The function executed by the mouseup listener
  //On mouse up, remove the mouse move listener which was added on mouse down and remove itself until added again by mousedown
  this.mouseUp = function() {
    document.body.classList.remove('noselect');
    window.removeEventListener('mousemove', obj.mouseMove);
    if (obj.taskMouseUp != null) {
      (obj.taskMouseUp)();
    }
    window.removeEventListener('mouseup', obj.mouseUp);
  }
}

Slider89.prototype.parseHTML = function(structure) {
  const html = {};
  const attribs = {
    wrapper: {
      class: 'slider slider89_wrapper',
      style: 'width: ' + this.width + 'px'
    },
    knob: {
      class: 'slider_knob slider89_knob',
      style: 'transform: translateX(' + (this.width - 14) * (this.value - this.min) / (this.max - this.min) + 'px)'
    },
    tooltip: {
      class: 'slider_tooltip slider89_tooltip right hidden noselect'
    },
    caption: {
      class: 'slider_header slider89_header'
    }
  };
  const wrappers = structure.match(/<\/(\w+)/g);
  const wrapStops = [];
  wrapStops[0] = ['container'];
  let hasClosed = 0;
  const tags = structure.split(/>\s*</);
  tags[0] = tags[0].replace(/\s*</, '');
  tags[tags.length-1] = tags[tags.length-1].replace(/>\s*/, '');
  const tagNames = new Array(tags.length);
  for (var i = 0; i < tags.length; i++) {
    tagNames[i] = tags[i].indexOf(' ') != -1 ? tags[i].slice(0, tags[i].indexOf(' ')) : tags[i];
    if (tags[i][0] != '/') {
      if (attribs[tagNames[i]] != null) {
        var thisNode = document.createElement('div');
        var defAttribs = attribs[tagNames[i]];
        var attribNames = Object.keys(defAttribs);
      } else {
        var thisNode = document.createElement(tags[i].match(/\s(\w+)\s/) ? tags[i].match(/\s(\w+)\s/)[1] : 'div');
        var defAttribs = null;
      }
      html[tagNames[i]] = thisNode;
      const inner = tags[i].match(/\s"(.*)"/);
      const attributes = tags[i].match(/\s!?(\w+)\((\w+.?\s*\d*\w*(,\s*\w+.?\s*\d*\w*)*)\)/g);
      if (attributes != null) {
        for (var n = 0; n < attributes.length; n++) {
          const thisName = attributes[n].slice((attributes[n].indexOf('!') != -1) + 1, attributes[n].indexOf('('));
          let thisValue = thisName != 'style' ? attributes[n].slice(attributes[n].indexOf('(') + 1, -1).replace(/,\s*/g, ' ') : attributes[n].slice(attributes[n].indexOf('(') + 1, -1).replace(/,\s*/g, '; ');
          if (thisName == 'style' && thisValue[thisValue.length - 1] != ';') thisValue += ';';
          thisNode.setAttribute(thisName, thisValue);
        }
        if (defAttribs) {
          for (var n = 0; n < attribNames.length; n++) {
            if (new RegExp('^[^!]?' + attribNames[n]).test(attributes.join('').slice(1)) && defAttribs[attribNames[n]]) {
              thisNode.setAttribute(attribNames[n], thisNode.getAttribute(attribNames[n]) + ' ' + defAttribs[attribNames[n]]);
            } else if (attributes.join('').slice(1).indexOf(attribNames[n]) == -1 && defAttribs[attribNames[n]]) {
              thisNode.setAttribute(attribNames[n], defAttribs[attribNames[n]]);
            }
          }
        }
      } else if (defAttribs) {
        for (var n = 0; n < attribNames.length; n++) {
          thisNode.setAttribute(attribNames[n], defAttribs[attribNames[n]]);
        }
      }
      if (inner) thisNode.innerHTML = inner[1];
      if (wrappers && wrappers.indexOf('</' + tagNames[i]) != -1) {
        wrapStops[wrapStops.length - 1].push(wrapStops[wrapStops.length-2] && wrapStops[wrapStops.length-2][2] ? wrapStops[wrapStops.length-2][2] + hasClosed : 0, i + 1);
        wrapStops.push([tagNames[i]]);
        hasClosed = 0;
      }
    } else {
      if (wrappers && wrappers.indexOf('<' + tagNames[i]) != -1) {
        if (!hasClosed) {
          wrapStops[wrapStops.length - 1].push(wrapStops[wrapStops.length-2][2] + hasClosed, i + hasClosed);
          if (i != tags.length - 1) wrapStops.push(['container']);
        }
        let thisIndex;
        hasClosed++;
      }
    }
  }

  html.container = document.createElement('div');
  html.container.classList.add('slider89');

  for (var i = 0; i < wrapStops.length; i++) {
    for (var n = wrapStops[i][1]; n < wrapStops[i][2]; n++) {
      html[wrapStops[i][0]].appendChild(html[tagNames[n]]);
    }
  }

  html.caption.innerHTML = this.caption;
  html.tooltip.innerHTML = this.value;
  return html;
};

Slider89.prototype.computeWidth = function(methodWidth) {
  return methodWidth == 'auto' ? this.max - this.min + 14 : methodWidth + 14 * !this.absWidth;
}

Slider89.prototype.checkTask = function(task) {
  if (typeof task == 'function') {
    return task;
  } else if (typeof task != 'function') {
    console.error('Slider89 error: specified task \'' + task + '\' is not a function.\nContinuing without a task.');
    return false;
  }
}

Slider89.prototype.newValues = function(newValues = {}) {
  const prevAbsWidth = this.absWidth;
  this.absWidth = newValues.absWidth != null ? newValues.absWidth : this.absWidth;
  this.value = newValues.value != null ? newValues.value : Number((((newValues.max || this.max) - (newValues.min || this.min)) * this.value / (this.max - this.min)).toFixed(newValues.comma || this.comma));
  this.min = newValues.min != null ? newValues.min : this.min;
  this.max = newValues.max != null ? newValues.max : this.max;
  this.comma = newValues.comma != null ? newValues.comma : this.comma;
  this.width = newValues.width ? this.computeWidth(newValues.width) : (!prevAbsWidth ? this.computeWidth(this.width - 14) : this.computeWidth(this.width));
  if (newValues.caption) {
    this.caption = newValues.caption;
    this.element.caption.innerHTML = this.caption;
  }
  this.trimComma = newValues.trimComma != null ? newValues.trimComma : this.trimComma;
  this.tipDuration = newValues.tipDuration != null && (values.tipDuration > 0 || values.tipDuration == false) ? newValues.tipDuration : this.tipDuration;
  if (newValues.classList) {
    this.classList = newValues.classList;
    for (var i = 0; i < this.classList.length; i++) {
      this.element.container.classList.add(this.classList[i]);
    }
  }
  if (newValues.task && this.checkTask(newValues.task)) {
    this.task = newValues.task;
  }
  if (newValues.taskMouseUp && this.checkTask(newValues.taskMouseUp)) {
    this.taskMouseUp = newValues.taskMouseUp;
  }

  if (this.value > this.max) {
    this.value = this.max;
  } else if (this.value < this.min) {
    this.value = this.min;
  }

  this.element.wrapper.style.width = this.width + 'px';

  this.element.wrapper.children[0].style.transform = 'translateX(' + (this.width - 14 * !this.absWidth) * (this.value - this.min) / (this.max - this.min) + 'px)';
}

//Build the slider inside the specified target element and return it as element
Slider89.prototype.buildElement = function(target, replace) {
  const nodes = this.parseHTML(this.structure);
  for (var i = 0; i < this.classList.length; i++) {
    nodes.container.classList.add(this.classList[i]);
  }
  if (replace) {
    target.parentNode.replaceChild(nodes.container, target);
  } else {
    target.appendChild(nodes.container);
  }
  return nodes;
}

Slider89.prototype.executeSlider = function(clickedX) {
  const rect = this.element.wrapper.getBoundingClientRect();
  const tip = this.element.tooltip;
  const knob = this.element.knob;
  let finalValue;
  let distance = clickedX - rect.left - 7;
  if (distance < 0) {
    distance = 0;
  } else if (distance > rect.width - 14) {
    distance = rect.width - 14;
  }
  distance = Math.round(distance);
  //set the value tooltip; if nothing has happened for the time the user has defined (default 250ms), hide it
  if (this.tipDuration != false) {
    clearTimeout(this.tipTimer);
    tip.classList.remove('hidden');
    this.tipTimer = setTimeout(function() {
      tip.classList.add('hidden');
    }, this.tipDuration);
  }
  //translate the slider knob
  knob.style.transform = 'translateX(' + distance + 'px)';
  //compute the final value
  finalValue = (this.max - this.min) * distance / (rect.width - 14) + this.min;
  //limit the amount of figures after comma accordingly to the value
  if (this.trimComma) {
    finalValue = Number(finalValue.toFixed(this.comma));
    tip.innerHTML = finalValue;
  } else {
    finalValue = finalValue.toFixed(this.comma);
    tip.innerHTML = finalValue;
    finalValue = Number(finalValue);
  }
  //If nothing has changed, stop
  if (this.value == finalValue) {
    if (!this.taskLock && this.task != null) {
      (this.task)();
      this.taskLock = true;
    }
    return;
  }
  this.taskLock = false;
  if (this.task != null) {
    (this.task)();
  }
  //Update value
  this.value = finalValue;
  //Change the positioning of the tooltip accordingly to the position of the slider knob
  if (distance >= rect.width - tip.clientWidth - 14 && tip.classList.contains('right') || distance <= tip.clientWidth && tip.classList.contains('left')) {
    tip.classList.toggle('right');
    tip.classList.toggle('left');
  }
}

var slider89 = {
  absWidth: false,
  min: 0,
  max: 100,
  value: 0,
  comma: 0,
  width: 'auto',
  caption: '',
  trimComma: true,
  tipDuration: 250,
  classList: [],
  structure: '<wrapper><knob><tooltip></wrapper><caption>',
  replaceNode: false,
  defaultValues: function(defValues) {
    if (defValues.absWidth != null) this.absWidth = defValues.absWidth;
    if (defValues.min != null) this.min = defValues.min;
    if (defValues.max != null) this.max = defValues.max;
    if (defValues.value != null) this.value = defValues.value;
    if (defValues.comma != null && defValues.comma >= 0) this.comma = defValues.comma;
    if (defValues.width != null) this.width = defValues.width;
    if (defValues.caption) this.caption = defValues.caption;
    if (defValues.trimComma != null) this.trimComma = defValues.trimComma;
    if (defValues.tipDuration != null && (defValues.tipDuration > 0 || defValues.tipDuration == false)) this.tipDuration = defValues.tipDuration;
    if (defValues.classList) this.classList = defValues.classList;
    if (defValues.structure) this.structure = defValues.structure;
    if (defValues.replaceNode != null) this.replaceNode = defValues.replaceNode;
    if (defValues.task && Slider89.prototype.checkTask(defValues.task)) this.task = defValues.task;
    if (defValues.taskMouseUp && Slider89.prototype.checkTask(defValues.taskMouseUp)) this.taskMouseUp = defValues.taskMouseUp;
  }
}
