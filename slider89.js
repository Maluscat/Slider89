function Slider89(target, values = {}) {
  //Define the attributes of the object instance
  this.absWidth = values.absWidth != null ? values.absWidth : slider89.absWidth;
  this.min = values.min != null ? values.min : slider89.min;
  this.max = values.max != null ? values.max : slider89.max;
  this.comma = values.comma != null && values.comma >= 0 ? values.comma : slider89.comma;
  this.thumbCount = values.thumbCount >= 1 ? values.thumbCount : slider89.thumbCount;
  this.value = this.checkValue(values.value, this.comma, this.thumbCount) || slider89.value;
  this.width = values.width != null ? this.computeWidth(values.width) : this.computeWidth(slider89.width);
  this.caption = values.caption || slider89.caption;
  this.extensible = this.checkExtensible(values.extensible) || slider89.extensible;
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
  this.lockedThumb;
  this.thumb;

  this.element = this.buildElement(target, values.replaceNode != null ? values.replaceNode : slider89.replaceNode);
  if (this.tipDuration == false) this.element.wrapper.children[1].classList.remove('hidden');

  const that = this;
  this.doubleClick = function(e) {
    if (!e.target.classList.contains('slider89_knob')) that.addThumb(e.clientX);
  }
  if (this.extensible && !this.extensible.singleClick) {
    this.element.wrapper.addEventListener('dblclick', this.doubleClick);
  }
  this.element.wrapper.addEventListener('mousedown', function(e) {
    document.body.classList.add('noselect');
    if (that.extensible && !e.target.classList.contains('slider89_knob')) {
      if (that.extensible.singleClick) {
        that.addThumb(e.clientX);
      }
    } else {
      that.executeSlider(e.clientX);
    }
    window.addEventListener('mousemove', that.mouseMove);
    window.addEventListener('mouseup', that.mouseUp);
  });
  this.mouseMove = function(e) {
    that.executeSlider(e.clientX);
  }
  //The function executed by the mouseup listener
  //On mouse up, remove the mouse move listener which was added on mouse down and remove itself until added again by mousedown
  this.mouseUp = function() {
    document.body.classList.remove('noselect');
    window.removeEventListener('mousemove', that.mouseMove);
    if (that.taskMouseUp != null) (that.taskMouseUp)();
    that.lockedThumb = null;
    window.removeEventListener('mouseup', that.mouseUp);
  }
}

Slider89.prototype.parseHTML = function(structure) {
  const that = this;
  const html = {};
  const attribs = {
    wrapper: {
      class: 'slider slider89_wrapper',
      style: 'width: ' + this.width + 'px;'
    },
    knob: {
      class: 'slider_knob slider89_knob'
    },
    tooltip: {
      class: 'slider_tooltip slider89_tooltip right hidden noselect'
    },
    caption: {
      class: 'slider_header slider89_header'
    }
  };
  if (this.thumbCount > 1) {
    attribs.knob.style = new Array(this.thumbCount);
    for (let i = 0; i < this.thumbCount; i++) attribs.knob.style[i] = 'transform: translateX(' + (this.width - 14) * (this.value[i] - this.min) / (this.max - this.min) + 'px);';
  } else {
    attribs.knob.style = 'transform: translateX(' + (this.width - 14) * (this.value - this.min) / (this.max - this.min) + 'px);';
  }

  const re = {
    attr: {
      name: '!?[\\w-]+',
      value: '[^()]*?'
    },
    name: '[\\w-]+'
  };
  re.content = '(?:\\s+"(.+?)")*';
  re.tag = '(?:\\s+(' + re.name + '))*';
  re.attribs = '(?:\\s+' + re.attr.name + '\\(' + re.attr.value + '\\))*';
  re.general = '<[:/]?(' + re.name + ').*?>';
  const rgx = {
    general: new RegExp('<([:/]?)(' + re.name + ').*?>|<(' + re.name + ').*?', 'g'),
    thumbAttrVars: /(~)?{(i)}/g,
    attributes: new RegExp('\\s+(' + re.attr.name + ')\\((' + re.attr.value + ')\\)\\s*?', 'g'),
    singleTag: new RegExp('<(' + re.name + ')' + re.tag + re.content + '(' + re.attribs + ')\\s*?>', 'g'),
    multiTag: new RegExp('<:(' + re.name + ')' + re.tag + re.content + '(' + re.attribs + ')\\s*?>((?:[\\s\\S](?!<:' + re.name + '(?:\\s+' + re.name + ')*(?:\\s+".+?")*' + re.attribs + '\\s*?>[\\d\\D]*?<\\/[\\w-]+\\s*>))*?)<\\/\\1\\s*>', 'g')
  };

  let lastWrapper = new Array();
  let parentLock = false;
  while(rgx.multiTag.test(structure)) {
    structure = structure.replace(rgx.multiTag, function(match, name, tag, inner, attributes, content) {
      const elem = assembleElement(name, tag, attributes, null);
      content = parseSingleTags(content, elem);
      if (inner) elem.textContent = inner;
      if (parentLock) {
        lastWrapper.forEach(function(el) {
          elem.appendChild(el);
        });
        lastWrapper = new Array();
        parentLock = false;
      }
      lastWrapper.push(elem);
      html[name] = elem;
      return content;
    });
    parentLock = true;
  }

  html.container = document.createElement('div');
  html.container.classList.add('slider89');
  structure = parseSingleTags(structure, html.container);
  lastWrapper.forEach(function(el) {
    html.container.appendChild(el);
  });
  if (this.caption) html.caption.textContent = this.caption;
  if (this.value) html.tooltip.textContent = this.value;

  if (/\S+/g.test(structure)) {
    structure = structure.trim();
    const names = new Array();
    let leftover = false;
    if (rgx.general.test(structure)) {
      structure.replace(rgx.general, function(match, amplifier, name, name2) {
        let nameObj = {};
        nameObj.name = name || name2;
        if (amplifier == ':') nameObj.isWrapper = true;
        if (amplifier == '/') nameObj.isClosing = true;
        if (name2) nameObj.noEnd = true;
        names.push(nameObj);
      });
    } else leftover = true;
    console.error(
      'Slider89 error: %s been declared wrongly and could not be parsed. %s\nSee the documentation at https://hallo89.net/slider89#structure for more info.\nSlider creation process stopped.',
      names.length > 1 ? 'several ‘structure’ elements have' : 'a ‘structure’ element has',
      (function() {
        let info = '';
        if (leftover) {
          info += 'Leftover structure:\n> "' + structure + '"';
        } else {
          info = 'Found errors:\n';
          for (let i = 0; i < names.length; i++) {
            info += '- "' + names[i].name + '"';
            if (names[i].isClosing) info += ' => Closing tag finding no beginning';
            if (names[i].isWrapper) info += ' => Opening tag finding no end';
            if (names[i].noEnd) info += ' => Missing ending character (‘>’)';
            info += i != names.length - 1 ? ',\n' : '.';
          }
        }
        return info;
      })()
    );
    return;
  }

  return html;

  function parseSingleTags(str, parent) {
    return str.replace(rgx.singleTag, function(match, name, tag, inner, attributes) {
      const elem = assembleElement(name, tag, attributes, inner);
      if (name == 'knob' && !Array.isArray(elem)) {
        that.thumb = elem.cloneNode(true);
      }
      if (Array.isArray(elem)) {
        const thumbWrapper = document.createElement('div');
        thumbWrapper.classList.add('slider89_thumbs');
        for (let i = 0; i < elem.length; i++) {
          thumbWrapper.appendChild(elem[i]);
        }
        parent.appendChild(thumbWrapper);
        html.thumbWrapper = thumbWrapper;
      } else parent.appendChild(elem);
      html[name] = elem;
      return '';
    });
  }
  function assembleElement(name, tag, attributes, content) {
    let elem = document.createElement(tag || 'div');
    if (content) elem.textContent = content;
    const hasAttribs = !!attribs[name];
    const multiThumbs = name == 'knob' && (that.thumbCount > 1 || that.extensible);
    if (multiThumbs) {
      var thumbArr = {
        attr: new Array(),
        var: new Array()
      }
    }
    if (attributes) {
      attributes.replace(rgx.attributes, function(attrib, attribName, value) {
        if (hasAttribs && attribs[name][attribName] && attribName[0] != '!') {
          if (Array.isArray(attribs[name][attribName])) {
            thumbArr.attr.push(attribName);
          } else value += ' ' + attribs[name][attribName];
        } else if (attribName[0] == '!') {
          attribName = attribName.slice(1);
        }
        if (name == 'knob' && rgx.thumbAttrVars.test(value)) {
          thumbArr.var.push([attribName, value]);
        } else elem.setAttribute(attribName, value || '');
      });
    }
    if (hasAttribs) {
      const keys = Object.keys(attribs[name]);
      for (let i = 0; i < keys.length; i++) {
        if (!elem.getAttribute(keys[i])) {
          if (Array.isArray(attribs[name][keys[i]])) {
            thumbArr.attr.push(keys[i]);
          } else elem.setAttribute(keys[i], attribs[name][keys[i]]);
        }
      }
    }
    if (multiThumbs) {
      that.thumb = elem.cloneNode(true);
      const thumbs = new Array(that.thumbCount);
      for (let i = 0; i < that.thumbCount; i++) {
        thumbs[i] = elem.cloneNode(true);
        for (let n = 0; n < thumbArr.attr.length; n++) {
          const domAttr = elem.getAttribute(thumbArr.attr[n]);
          thumbs[i].setAttribute(thumbArr.attr[n], (domAttr ? domAttr + ' ' : '') + attribs[name][thumbArr.attr[n]][i]);
        }
        for (let n = 0; n < thumbArr.var.length; n++) {
          //thumbArr.var = Array<Array<name, value>>
          const value = thumbArr.var[n][1].replace(rgx.thumbAttrVars, function(match, escaped, identifier) {
            if (!escaped) {
              if (identifier == 'i') return i;
            } else return match.slice(1);
          });
          thumbs[i].setAttribute(thumbArr.var[n][0], value);
        }
      }
      return thumbs;
    }
    return elem;
  }
}

Slider89.prototype.computeWidth = function(methodWidth) {
  return methodWidth == 'auto' ? this.max - this.min + 14 : methodWidth + 14 * !this.absWidth;
}

Slider89.prototype.checkValue = function(value, comma, thumbCount) {
  if (value != null) {
    if (typeof value == 'object') {
      if (thumbCount == 1) {
        const keys = Object.keys(value);
        if (keys.length > 1) console.warn("Slider89 warning: Property ‘value’ is an object with multiple (" + keys.length + ") attributes although the slider uses only one thumb. Consider allocating a single number to ‘value’.\nSetting value to the " + (value['default'] != null ? "‘default’ attribute, '" + value['default'] : "first attribute, '" + value[keys[0]]) + "'.");
        value = Number((value['default'] != null ? value['default'] : value[keys[0]]).toFixed(comma));
      } else {
        const thisDefault = value['default'] != null ? Number(value['default'].toFixed(comma)) : 0;
        const static = value;
        value = new Array(thumbCount);
        for (let i = 0; i < thumbCount; i++) {
          value[i] = static[i] != null ? Number(static[i].toFixed(comma)) : thisDefault;
        }
      }
      return value;
    } else if (typeof value == 'number' || typeof value == 'boolean') { //if value is not an object
      if (thumbCount != 1) {
        const static = Number(Number(value).toFixed(comma)); //extra Number check to convert a potential boolean
        value = new Array(thumbCount);
        for (let i = 0; i < thumbCount; i++) {
          value[i] = static;
        }
        return value;
      } else return Number(Number(value).toFixed(comma));
    } else { //if value is neither an object nor a number or boolean
      console.error("Slider89 error: Property ‘value’ has been declared wrongly. It must either be an object, an array or a number (currently " + typeof value + ").\nUsing the default of '0' instead");
      return 0;
    }
  } else return 0; //if value is not given
}

Slider89.prototype.checkExtensible = function(extensible) {
  if ((typeof extensible != 'object' || Array.isArray(extensible)) && typeof extensible != 'boolean') {
    console.warn("Slider89 warning: Property ‘extensible’ has been declared wrongly. It must either be a boolean or an object (currently " + typeof extensible + ").\nUsing the default of 'false' instead");
    return false;
  } else if (typeof extensible == 'object') {
    if ((typeof extensible.singleClick != 'boolean') {
      console.warn("Slider89 warning: Property ‘singleClick’ inside ‘extensible’ has been declared wrongly. It must either be a boolean or an object (currently " + typeof extensible.singleClick + ").\nUsing the default of 'false' instead");
      return false;
    } else if (extensible.singleClick == false) return true;
  }
  return extensible;
}

Slider89.prototype.checkTask = function(task) {
  if (typeof task == 'function') {
    return task;
  } else {
    console.error("Slider89 error: specified ‘task’ '" + task + "' is not a function (currently " + typeof task + ").\nContinuing without a task.");
    return false;
  }
}

Slider89.prototype.newValues = function(newValues = {}) {
  const prevAbsWidth = this.absWidth;
  const prevThumbCount = this.thumbCount;
  this.absWidth = newValues.absWidth != null ? newValues.absWidth : this.absWidth;
  this.min = newValues.min != null ? newValues.min : this.min;
  this.max = newValues.max != null ? newValues.max : this.max;
  this.comma = newValues.comma != null ? newValues.comma : this.comma;
  this.thumbCount = newValues.thumbCount >= 1 ? newValues.thumbCount : this.thumbCount;
  if (newValues.value != null) {
    this.value = this.checkValue(newValues.value, this.comma, this.thumbCount);
  } else if (newValues.min != null || newValues.max != null || newValues.comma != null || newValues.thumbCount >= 1) {
    const newMin = newValues.min != null ? newValues.min : this.min;
    const newMax = newValues.max != null ? newValues.max : this.max;
    if (this.thumbCount != 1) {
      //Value can't contain anything unexpected as we are working with a pre-existing and processed value
      if (this.thumbCount == prevThumbCount || this.thumbCount < prevThumbCount) {
        for (let i = 0; i < this.thumbCount; i++) {
          this.value[i] = Number(((newMax - newMin) * this.value[i] / (this.max - this.min)).toFixed(this.comma));
        }
      } else { //if thumbCount is greater than previously
        for (let i = 0; i < this.thumbCount; i++) {
          this.value[i] = Number(((newMax - newMin) * (i < prevThumbCount ? this.value[i] : this.value[prevThumbCount - 1]) / (this.max - this.min)).toFixed(this.comma));
        }
      }
    } else { //if thumbCount is 1
      if (this.thumbCount == prevThumbCount) {
        this.value = Number(((newMax - newMin) * this.value / (this.max - this.min)).toFixed(this.comma));
      } else { //if previous thumbCount was greater than 1
        this.value = Number(((newMax - newMin) * this.value[0] / (this.max - this.min)).toFixed(this.comma));
      }
    }
    if (this.thumbCount != prevThumbCount) {
      const thumb = this.element.knob[0].cloneNode(true);
      this.element.knob = new Array(this.thumbCount);
      for (let i = 0; i < this.thumbCount; i++) {
        this.element.knob[i] = thumb.cloneNode(true);
        this.element.knob[i].setAttribute('style', 'transform: translateX(' + (this.width - 14) * (this.value[i] - this.min) / (this.max - this.min) + 'px);');
      }
    }
  }
  this.width = newValues.width ? this.computeWidth(newValues.width) : (!prevAbsWidth ? this.computeWidth(this.width - 14) : this.computeWidth(this.width));
  if (newValues.caption) {
    this.caption = newValues.caption;
    this.element.caption.innerHTML = this.caption;
  }
  if (newValues.extensible != null) {
    const behavior = this.extensible.singleClick;
    this.extensible = this.checkExtensible(newValues.extensible);
    if (behavior != this.extensible.singleClick)
      this.element.wrapper[this.extensible.singleClick ? 'removeEventListener' : 'addEventListener']('dblclick', this.doubleClick);
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

Slider89.prototype.addThumb = function(clickedX) {
  const newThumb = this.thumb.cloneNode(true);
  this.element.thumbWrapper.appendChild(newThumb);
  this.lockedThumb = {
    node: newThumb,
    index: this.thumbCount++
  };
  this.element.knob.push(newThumb);
  this.executeSlider(clickedX);
  this.lockedThumb = null;
};

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
  if (!this.lockedThumb && this.thumbCount > 1) {
    this.lockedThumb = {};
    let smallestDistance;
    for (var i = 0; i < knob.length; i++) {
      const style = knob[i].getAttribute('style');
      let translate = style.slice(style.indexOf('translateX(') + 'translateX('.length);
      translate = parseInt(translate.slice(0, -3));
      if (i == 0 || Math.abs(distance - translate) < smallestDistance) {
        smallestDistance = Math.abs(distance - translate);
        this.lockedThumb.node = knob[i];
        this.lockedThumb.index = i;
      }
    }
    //translate the slider knob
    this.lockedThumb.node.style.transform = 'translateX(' + distance + 'px)';
  } else if (this.lockedThumb) {
    this.lockedThumb.node.style.transform = 'translateX(' + distance + 'px)';
  } else {
    knob.style.transform = 'translateX(' + distance + 'px)';
  }
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
  if ((this.thumbCount > 1 ? this.value[this.lockedThumb.index] : this.value) == finalValue) {
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
  if (this.thumbCount > 1) {
    this.value[this.lockedThumb.index] = finalValue;
  } else this.value = finalValue;
  //Change the positioning of the tooltip accordingly to the position of the slider knob
  if (distance >= rect.width - tip.clientWidth - 14 && tip.classList.contains('right') || distance <= tip.clientWidth && tip.classList.contains('left')) {
    tip.classList.toggle('right');
    tip.classList.toggle('left');
  }
}

const slider89 = {
  absWidth: false,
  min: 0,
  max: 100,
  comma: 0,
  thumbCount: 1,
  value: 0,
  width: 'auto',
  caption: '',
  extensible: false,
  trimComma: true,
  tipDuration: 250,
  classList: [],
  structure: '<:wrapper><knob><tooltip></wrapper><caption>',
  replaceNode: false,
  defaultValues: function(defValues) {
    if (defValues.absWidth != null) this.absWidth = defValues.absWidth;
    if (defValues.min != null) this.min = defValues.min;
    if (defValues.max != null) this.max = defValues.max;
    if (defValues.comma != null && defValues.comma >= 0) this.comma = defValues.comma;
    if (defValues.thumbCount >= 1) this.thumbCount = defValues.thumbCount;
    if (defValues.value != null) this.value = Slider89.prototype.checkValue(defValues.value, this.comma, this.thumbCount);
    if (defValues.width != null) this.width = defValues.width;
    if (defValues.caption) this.caption = defValues.caption;
    if (defValues.extensible != null) this.extensible = Slider89.prototype.checkExtensible(defValues.extensible);
    if (defValues.trimComma != null) this.trimComma = defValues.trimComma;
    if (defValues.tipDuration != null && (defValues.tipDuration > 0 || defValues.tipDuration == false)) this.tipDuration = defValues.tipDuration;
    if (defValues.classList) this.classList = defValues.classList;
    if (defValues.structure) this.structure = defValues.structure;
    if (defValues.replaceNode != null) this.replaceNode = defValues.replaceNode;
    if (defValues.task && Slider89.prototype.checkTask(defValues.task)) this.task = defValues.task;
    if (defValues.taskMouseUp && Slider89.prototype.checkTask(defValues.taskMouseUp)) this.taskMouseUp = defValues.taskMouseUp;
  }
}
